const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,

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
