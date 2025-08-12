const path = require('path');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      include: [path.resolve(__dirname, 'public')],
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg$/i,
      include: [path.resolve(__dirname, 'src')],
      type: 'asset',
    });
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset',
    });
    config.module.rules.push({
      test: new RegExp(`syntaxes/.*\.json$`),
      type: 'asset',
    });
    config.module.rules.push({
      test: new RegExp(`shiki/.*\.json$`),
      type: 'asset',
    });
    config.module.rules.push({
      test: new RegExp(`.*\.tmLanguage$`),
      type: 'asset/resource',
    });

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};
