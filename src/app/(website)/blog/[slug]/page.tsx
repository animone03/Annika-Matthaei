import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PortableText } from '@/components/portable-text/portable-text'
import { SanityImage } from '@/components/sanity-image'
import { Container } from '@/components/ui/container'
import { formatDate } from '@/lib/date'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site-url'
import { getPost, getSiteSettings } from '@/sanity/lib/repository'

type PostPageProps = { params: Promise<{ slug: string }> }

export const instant = false

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    getPost(slug, { stega: false }),
    getSiteSettings({ stega: false }),
  ])

  if (!post?.title)
    return { title: 'Beitrag nicht gefunden', robots: { index: false } }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    seo: post.seo,
    fallbackImage: post.coverImage || settings?.defaultSocialImage,
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPost(slug), getSiteSettings()])
  if (!post?.title) notFound()

  const canonical = absoluteUrl(`/blog/${slug}`)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${canonical}#article`,
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          mainEntityOfPage: canonical,
          author: settings?.ownerName
            ? {
                '@type': 'Person',
                name: settings.ownerName,
                url: absoluteUrl('/'),
              }
            : undefined,
          keywords: post.topics,
        }}
      />
      <article>
        <Container className="py-20 sm:py-28">
          <header className="mx-auto max-w-4xl text-center">
            {post.publishedAt ? (
              <time
                className="text-muted-foreground text-sm"
                dateTime={post.publishedAt}
              >
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="text-muted-foreground mt-7 text-xl leading-9">
                {post.description}
              </p>
            ) : null}
            {post.topics?.length ? (
              <p className="text-foreground/65 mt-5 text-sm font-medium">
                {post.topics.join(' · ')}
              </p>
            ) : null}
          </header>

          {post.coverImage ? (
            <SanityImage
              image={post.coverImage}
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="mt-12"
              preload
            />
          ) : null}

          <PortableText value={post.body} className="mx-auto mt-14" />

          {post.updatedAt ? (
            <p className="text-muted-foreground mx-auto mt-10 max-w-3xl text-sm">
              Aktualisiert am{' '}
              <time dateTime={post.updatedAt}>
                {formatDate(post.updatedAt)}
              </time>
            </p>
          ) : null}

          {(post.previous || post.next) && (
            <nav
              className="border-border mx-auto mt-16 grid max-w-3xl gap-4 border-t pt-8 sm:grid-cols-2"
              aria-label="Weitere Beiträge"
            >
              <div>
                {post.previous?.slug ? (
                  <Link
                    className="hover:text-accent font-semibold"
                    href={`/blog/${post.previous.slug}`}
                  >
                    ← {post.previous.title}
                  </Link>
                ) : null}
              </div>
              <div className="sm:text-right">
                {post.next?.slug ? (
                  <Link
                    className="hover:text-accent font-semibold"
                    href={`/blog/${post.next.slug}`}
                  >
                    {post.next.title} →
                  </Link>
                ) : null}
              </div>
            </nav>
          )}

          {post.related?.length ? (
            <section className="mx-auto mt-16 max-w-3xl">
              <h2 className="text-2xl font-semibold">Verwandte Beiträge</h2>
              <ul className="mt-5 space-y-3">
                {post.related.map((related) =>
                  related.slug ? (
                    <li key={related._id}>
                      <Link
                        className="text-accent font-semibold underline underline-offset-4"
                        href={`/blog/${related.slug}`}
                      >
                        {related.title}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
          ) : null}
        </Container>
      </article>
    </>
  )
}
