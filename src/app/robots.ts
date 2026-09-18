import type { MetadataRoute } from 'next'

import { absoluteUrl, getSiteOrigin } from '@/lib/site-url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    host: getSiteOrigin(),
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
