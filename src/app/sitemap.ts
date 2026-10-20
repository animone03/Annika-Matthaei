import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/site-url'
import { getSitemapContent } from '@/sanity/lib/repository'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent()
  const fixed = [
    '/',
    '/startups',
    '/coaching/startups/gruendungscoaching',
    // Founder 1:1, Founders in Sync und Lead with Clarity fehlen bewusst:
    // altes Design, nicht verlinkt, noindex, bis sie neu gestaltet sind.
    '/coaching/unternehmen',
    '/ueber-mich',
    // Übersichten erst aufnehmen, wenn es Inhalte gibt
    ...(content.projects.length > 0 ? ['/projekte'] : []),
    ...(content.posts.length > 0 ? ['/blog'] : []),
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ].map((path) => ({ url: absoluteUrl(path) }))

  const projects = content.projects.flatMap((project) =>
    project.slug
      ? [
          {
            url: absoluteUrl(`/projekte/${project.slug}`),
            lastModified: project._updatedAt,
          },
        ]
      : [],
  )
  const posts = content.posts.flatMap((post) =>
    post.slug
      ? [
          {
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: post._updatedAt,
          },
        ]
      : [],
  )

  return [...fixed, ...projects, ...posts]
}
