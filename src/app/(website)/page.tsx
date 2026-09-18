import type { Metadata } from 'next'
import Link from 'next/link'

import { PostCard } from '@/components/cards/post-card'
import { ProjectCard } from '@/components/cards/project-card'
import { PortableText } from '@/components/portable-text/portable-text'
import { ContactTeaser } from '@/components/sections/contact-teaser'
import { HomeHero } from '@/components/sections/home-hero'
import { ReferencesSection } from '@/components/sections/references-section'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { Section } from '@/components/ui/section'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site-url'
import {
  getHomePage,
  getHomePosts,
  getSiteSettings,
} from '@/sanity/lib/repository'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getHomePage({ stega: false }),
    getSiteSettings({ stega: false }),
  ])

  return buildMetadata({
    title: settings?.siteTitle || 'Annika Matthaei – Coaching & Training',
    description: settings?.siteDescription,
    path: '/',
    seo: page?.seo,
    fallbackImage: settings?.defaultSocialImage,
    absoluteTitle: true,
  })
}

export default async function HomePage() {
  const [page, posts, settings] = await Promise.all([
    getHomePage(),
    getHomePosts(),
    getSiteSettings(),
  ])

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${absoluteUrl('/')}#person`,
          name: settings?.ownerName,
          jobTitle: settings?.ownerRole,
          url: absoluteUrl('/'),
          email: settings?.email ? `mailto:${settings.email}` : undefined,
          sameAs: settings?.socialLinks?.flatMap((link) =>
            link.url ? [link.url] : [],
          ),
        }}
      />
      <HomeHero
        eyebrow={page?.hero?.eyebrow}
        heading={page?.hero?.heading}
        lead={page?.hero?.lead}
        portrait={page?.portrait}
      />

      <ReferencesSection />

      {page?.introduction?.length ? (
        <Section className="border-border border-t">
          <Container>
            <PortableText
              value={page.introduction}
              className="text-lg sm:text-xl"
            />
          </Container>
        </Section>
      ) : null}

      {page?.featuredProjects?.length ? (
        <Section className="bg-surface">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {page.projectsHeading}
              </h2>
              <Link href="/projekte" className="text-accent font-semibold">
                {page.projectsOverviewLinkLabel}
              </Link>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {page.featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {posts.length ? (
        <Section>
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {page?.postsHeading}
              </h2>
              <Link href="/blog" className="text-accent font-semibold">
                {page?.postsOverviewLinkLabel}
              </Link>
            </div>
            <div className="mt-10 space-y-9">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactTeaser value={page?.contactTeaser} />
    </>
  )
}
