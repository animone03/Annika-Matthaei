import { cacheLife, cacheTag } from 'next/cache'

import { escapeXml } from '@/lib/xml'
import { absoluteUrl } from '@/lib/site-url'
import { SANITY_CONTENT_TAG } from '@/sanity/lib/fetch'
import { getPosts, getSiteSettings } from '@/sanity/lib/repository'

function rssDate(value: string | null) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? null : date.toUTCString()
}

async function buildFeed() {
  'use cache'

  cacheLife('max')
  cacheTag(SANITY_CONTENT_TAG)

  const [posts, settings] = await Promise.all([
    getPosts({ publishedOnly: true, stega: false }),
    getSiteSettings({ publishedOnly: true, stega: false }),
  ])
  const title = settings?.siteTitle || 'Annika Matthaei – Coaching & Training'
  const description = settings?.siteDescription || title

  const items = posts
    .flatMap((post) => {
      if (!post.slug || !post.title) return []
      const url = absoluteUrl(`/blog/${post.slug}`)
      const publishedAt = rssDate(post.publishedAt)

      return [
        `<item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          ${post.description ? `<description>${escapeXml(post.description)}</description>` : ''}
          ${publishedAt ? `<pubDate>${publishedAt}</pubDate>` : ''}
        </item>`,
      ]
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(title)}</title>
        <link>${escapeXml(absoluteUrl('/'))}</link>
        <description>${escapeXml(description)}</description>
        <language>de-DE</language>
        ${items}
      </channel>
    </rss>`
}

export async function GET() {
  return new Response(await buildFeed(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
