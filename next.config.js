/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: ['res.cloudinary.com'],
   },
   experimental: {
      nextScriptWorkers: true,
   },

   webpack(config, { isServer }) {
      if (process.env.ANALYZE) {
         config.plugins.push(
            new BundleAnalyzerPlugin({
               analyzerMode: 'server',
               analyzerPort: isServer ? 8888 : 8889,
               openAnalyzer: true,
            }),
         );
      }

      return config;
   },
};

module.exports = nextConfig;
