import Link from 'next/link'

import { SanityImage } from '@/components/sanity-image'
import { formatDate } from '@/lib/date'
import type { SanityImageValue } from '@/sanity/lib/image'

type PostCardProps = {
  post: {
    _id: string
    title: string | null
    slug: string | null
    description: string | null
    publishedAt: string | null
    topics?: Array<string> | null
    coverImage?: SanityImageValue | null
  }
}

export function PostCard({ post }: PostCardProps) {
  if (!post.slug || !post.title) return null

  return (
    <article className="group border-border border-t pt-6">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-6 rounded-sm focus:outline-none sm:grid-cols-[1fr_13rem]"
      >
        <div>
          {post.publishedAt ? (
            <time
              className="text-muted-foreground text-sm"
              dateTime={post.publishedAt}
            >
              {formatDate(post.publishedAt)}
            </time>
          ) : null}
          <h3 className="group-hover:text-accent mt-2 text-2xl font-semibold tracking-tight">
            {post.title}
          </h3>
          {post.description ? (
            <p className="text-muted-foreground mt-3 leading-7">
              {post.description}
            </p>
          ) : null}
          {post.topics?.length ? (
            <p className="text-foreground/65 mt-4 text-sm font-medium">
              {post.topics.join(' · ')}
            </p>
          ) : null}
        </div>
        {post.coverImage ? (
          <SanityImage
            image={post.coverImage}
            sizes="208px"
            className="sm:order-last"
          />
        ) : null}
      </Link>
    </article>
  )
}
