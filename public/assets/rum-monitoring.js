(function () {
  'use strict';

  const CONFIG = {
    serviceName: 'text-to-diagram-com',
    serverUrl: 'https://t2d-rum-proxy-289593236386.us-central1.run.app',
    serviceVersion: '1.0.0',
    environment: 'production',
    // Noise reduction settings
    slowResourceThreshold: 5000, // Only track resources slower than 5s
    ignoredDomains: [
      'googletagmanager.com',
      'google-analytics.com',
      'doubleclick.net',
      'facebook.com',
      'twitter.com',
      'linkedin.com',
      'cloudflare.com',
      'unpkg.com',
      'jsdelivr.net',
      'cdnjs.cloudflare.com',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ],
    // Only track these critical first-party resource types
    trackedResourceTypes: ['script', 'document', 'fetch', 'xmlhttprequest'],
  };

  function loadScript(src, callback) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = callback;
    s.onerror = function () {
      console.warn('Script load failed (adblock?):', src);
    };
    document.head.appendChild(s);
  }

  function initAPM() {
    if (typeof elasticApm === 'undefined') return;

    try {
      window.elasticApm = elasticApm.init({
        serviceName: CONFIG.serviceName,
        serverUrl: CONFIG.serverUrl,
        serviceVersion: CONFIG.serviceVersion,
        environment: CONFIG.environment,
        logLevel: 'error',
        centralConfig: false,
        session: true,
        instrument: true,
        disableInstrumentations: ['eventtarget', 'fetch', 'xmlhttprequest'],
        transactionSampleRate: 1.0,
        pageLoadTransactionName: function () {
          const path = window.location.pathname;
          if (path === '/') return 'home';
          return path.split('/').filter(Boolean).slice(0, 2).join('/');
        },
      });

      // Set user context with session ID
      window.elasticApm.setUserContext({
        id: getSessionId(),
      });

      // Get real client IP for Kibana geo enrichment
      fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
          window.elasticApm.addLabels({
            real_client_ip: data.ip,
          });
        })
        .catch(() => {
          // Fallback - geo enrichment will use internal IP
        });

      // Geolocation is handled server-side via IP address - no browser permission needed

      // Filter out all resource spans (images, fonts, CSS, etc.)
      window.elasticApm.observe('transaction:end', function (transaction) {
        if (Array.isArray(transaction.spans)) {
          transaction.spans = transaction.spans.filter(function (span) {
            // Remove all resource spans (images, fonts, CSS, etc.)
            // Keep only external (API) and other non-resource spans
            return span.type !== 'resource';
          });
        }
      });

      // Track JavaScript errors with context
      trackErrors();
    } catch (e) {
      console.warn('APM init failed:', e.message);
    }
  }

  function trackErrors() {
    // Common noise patterns to ignore
    const noisePatterns = [
      /ResizeObserver loop limit exceeded/,
      /ResizeObserver loop completed/,
      /Non-Error promise rejection captured/,
      /Network request failed/,
      /Load failed/,
      /Extension context invalidated/,
      /chrome-extension:/,
      /moz-extension:/,
      /safari-extension:/,
    ];

    window.addEventListener('error', function (e) {
      if (!window.elasticApm) return;

      // Skip cross-origin script errors without details
      if (e.message === 'Script error.' && !e.filename) return;

      // Skip extension and browser noise
      if (
        e.filename &&
        (e.filename.includes('extension://') || e.filename.includes('extensions:'))
      )
        return;

      // Skip common noise patterns
      if (noisePatterns.some((pattern) => pattern.test(e.message))) return;

      // Skip third-party errors
      if (
        e.filename &&
        CONFIG.ignoredDomains.some((domain) => e.filename.includes(domain))
      )
        return;

      // Add context about the error
      window.elasticApm.setCustomContext({
        errorUrl: e.filename,
        errorLine: e.lineno,
        errorColumn: e.colno,
        pageUrl: window.location.href,
      });
    });

    // Track unhandled promise rejections with filtering
    window.addEventListener('unhandledrejection', function (e) {
      if (!window.elasticApm) return;

      // Skip non-error rejections and noise
      const reason = String(e.reason);
      if (noisePatterns.some((pattern) => pattern.test(reason))) return;
      if (reason.includes('Non-Error') || reason === 'undefined' || reason === 'null')
        return;

      window.elasticApm.captureError(
        new Error(e.reason || 'Unhandled Promise Rejection'),
        {
          custom: {
            promiseReason: reason.substring(0, 500), // Limit length
            pageUrl: window.location.href,
          },
        }
      );
    });
  }

  function getSessionId() {
    try {
      let id = sessionStorage.getItem('apm_session_id');
      if (!id) {
        id = 's_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
        sessionStorage.setItem('apm_session_id', id);
      }
      return id;
    } catch (e) {
      return 'session_' + Date.now();
    }
  }

  function trackResourceErrors() {
    // Monitor slow resources with smart filtering
    if (
      window.PerformanceObserver &&
      PerformanceObserver.supportedEntryTypes?.includes('resource')
    ) {
      try {
        const observer = new PerformanceObserver(function (list) {
          if (!window.elasticApm) return;

          for (const entry of list.getEntries()) {
            // Skip if below threshold
            if (entry.duration < CONFIG.slowResourceThreshold) continue;

            // Skip non-critical resource types
            if (!CONFIG.trackedResourceTypes.includes(entry.initiatorType)) continue;

            // Skip third-party domains
            const isThirdParty = CONFIG.ignoredDomains.some((domain) =>
              entry.name.includes(domain)
            );
            if (isThirdParty) continue;

            // Skip data URLs and blob URLs
            if (entry.name.startsWith('data:') || entry.name.startsWith('blob:'))
              continue;

            // Only track same-origin or critical resources
            try {
              const resourceUrl = new URL(entry.name);
              const pageUrl = new URL(window.location.href);

              // Skip cross-origin unless it's a critical API
              if (
                resourceUrl.origin !== pageUrl.origin &&
                !entry.name.includes('/api/')
              ) {
                continue;
              }
            } catch (e) {
              continue; // Skip invalid URLs
            }

            // Track the slow resource
            const span = window.elasticApm.startSpan('slow-resource', 'resource');
            if (span) {
              span.addLabels({
                resourcePath: new URL(entry.name).pathname.substring(0, 100),
                resourceDuration: Math.round(entry.duration),
                resourceType: entry.initiatorType,
                resourceSize: entry.transferSize || 0,
              });
              span.end();
            }
          }
        });
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {}
    }

    // Track page visibility for session tracking
    document.addEventListener(
      'visibilitychange',
      function () {
        if (document.visibilityState === 'hidden' && window.elasticApm) {
          const transaction = window.elasticApm.getCurrentTransaction();
          if (transaction) {
            transaction.addLabels({
              sessionDuration: Math.round((Date.now() - performance.timeOrigin) / 1000),
            });
          }
        }
      },
      { passive: true }
    );
  }

  loadScript(
    'https://unpkg.com/@elastic/apm-rum@5.17.0/dist/bundles/elastic-apm-rum.umd.min.js',
    initAPM
  );

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackResourceErrors);
  } else {
    trackResourceErrors();
  }
})();
