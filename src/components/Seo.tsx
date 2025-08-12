import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMeta = {
  title: 'Text to Diagram Tools Comparison 2025 | D2 vs Mermaid vs PlantUML vs Graphviz',
  siteName: 'Text to Diagram',
  description: 'Compare top text-to-diagram tools: D2, Mermaid, PlantUML & Graphviz. Side-by-side syntax examples, features & renders. Find the best diagramming tool for developers.',
  url: 'https://text-to-diagram.com',
  type: 'website',
  robots: 'follow, index',
  image: 'https://text-to-diagram.com/images/og.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // ? Uncomment code below if you want to use default open graph
  // meta['image'] = openGraph({
  //   description: meta.description,
  //   siteName: props.templateTitle ? meta.siteName : meta.title,
  //   templateTitle: props.templateTitle,
  // });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@terrastruct' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name='author' content='Terrastruct' />
      <meta name='keywords' content='text to diagram, D2, Mermaid, PlantUML, Graphviz, diagram as code, infrastructure as code, developer tools, diagramming tools comparison' />
      <meta name='language' content='EN' />
      <meta name='revisit-after' content='7 days' />
      <meta name='distribution' content='global' />
      <meta name='rating' content='general' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='dns-prefetch' href='https://github.com' />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta name='publish_date' property='og:publish_date' content={meta.date} />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/favicon/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
      <script defer data-domain='text-to-diagram.com' src='/js/script.js'></script>
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://text-to-diagram.com/#website",
                "url": "https://text-to-diagram.com/",
                "name": "Text to Diagram",
                "description": "Compare top text-to-diagram tools: D2, Mermaid, PlantUML & Graphviz. Side-by-side syntax examples, features & renders.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://text-to-diagram.com/?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                "inLanguage": "en-US"
              },
              {
                "@type": "Organization",
                "@id": "https://text-to-diagram.com/#organization",
                "name": "Terrastruct",
                "url": "https://terrastruct.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://text-to-diagram.com/svg/terrastruct.svg"
                },
                "sameAs": [
                  "https://github.com/terrastruct"
                ]
              },
              {
                "@type": "WebPage",
                "@id": `https://text-to-diagram.com${router.asPath}#webpage`,
                "url": `https://text-to-diagram.com${router.asPath}`,
                "name": meta.title,
                "description": meta.description,
                "isPartOf": {
                  "@id": "https://text-to-diagram.com/#website"
                },
                "about": {
                  "@id": "https://text-to-diagram.com/#organization"
                },
                "datePublished": "2024-01-01",
                "dateModified": "2025-02-11",
                "inLanguage": "en-US"
              }
            ]
          })
        }}
      />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
];
