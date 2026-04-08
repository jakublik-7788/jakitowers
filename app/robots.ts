import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // jeśli masz API
    },
    sitemap: 'https://jakitowers.pl/sitemap.xml',
  }
}