/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://www.viandascook.com';

module.exports = {
   siteUrl,
   generateIndexSitemap: false,
   generateRobotsTxt: true,
   robotsTxtOptions: {
      policies: [
         {
            userAgent: '*',
            disallow: [
               '/admin/*',
               '/cocina/*',
               '/onlera/*',
               '/auth/*',
               '/cart/*',
               '/checkout/*',
               '/mi-cuenta/*',
               '/pedidos/*',
            ],
         },
         { userAgent: '*', allow: '/' },
      ],
      // additionalSitemaps: [`${siteUrl}/sitemap.xml`],
   },
   exclude: [
      '/admin/*',
      '/cocina/*',
      '/onlera/*',
      '/auth/*',
      '/cart/*',
      '/checkout/*',
      '/mi-cuenta/*',
      '/pedidos/*',
      '/admin',
      '/cocina',
      '/onlera',
      '/auth',
      '/cart',
      '/checkout',
      '/mi-cuenta',
      '/pedidos',
   ],
};
