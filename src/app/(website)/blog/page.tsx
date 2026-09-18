import type { Metadata } from 'next'

import { PostCard } from '@/components/cards/post-card'
import { Container } from '@/components/ui/container'
import { buildMetadata } from '@/lib/metadata'
import { getPosts, getSiteSettings } from '@/sanity/lib/repository'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings({ stega: false })
  return buildMetadata({
    title: settings?.blogSeo?.title || 'Blog',
    description: settings?.blogSeo?.description,
    path: '/blog',
    seo: settings?.blogSeo,
    fallbackImage: settings?.defaultSocialImage,
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
        Blog
      </h1>
      {posts.length ? (
        <div className="mt-14 space-y-10">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-8">
          Noch keine Beiträge veröffentlicht.
        </p>
      )}
    </Container>
  )
}
