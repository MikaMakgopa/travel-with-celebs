export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin', // Keep search engines out of your private admin page!
    },
    sitemap: 'http://localhost:3000/sitemap.xml',
  };
}