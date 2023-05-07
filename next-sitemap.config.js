/** @type {import('next-sitemap').IConfig} */
const siteUrl = "https://www.viandascook.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: ["/admin/*", "/cocina/*", "/onlera/*", "/auth/*", "/cart/*", "/checkout/*", "/mi-cuenta/*", "/pedidos/*"] },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-0.xml`,
      `${siteUrl}/server-sitemap.xml`
    ]
  },
  exclude: [
    "/admin/*", "/cocina/*", "/onlera/*", "/auth/*", "/cart/*", "/checkout/*", "/mi-cuenta/*", "/pedidos/*",
    "/admin", "/cocina", "/onlera", "/auth", "/cart", "/checkout", "/mi-cuenta", "/pedidos"
  ]
}