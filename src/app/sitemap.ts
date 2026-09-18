import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/site-url'
import { getSitemapContent } from '@/sanity/lib/repository'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent()
  const fixed = [
    '/',
    '/ueber-mich',
    '/projekte',
    '/blog',
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
