import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site-url'

const PRIVATE_PATHS = ['/admin/', '/api/', '/login', '/signup', '/mypage/']

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
