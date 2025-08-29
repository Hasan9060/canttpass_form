/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vectonix.com', // apna domain yahan daalo
  generateRobotsTxt: true,          // robots.txt bhi generate hoga
  sitemapSize: 5000,                 // agar zyada pages hain to break kare
  changefreq: 'daily',               // pages kitni frequently update hote hain
  priority: 0.7,                     // search engines ko priority signal
};
