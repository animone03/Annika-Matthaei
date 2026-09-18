import type { Metadata } from 'next'

import { PortableText } from '@/components/portable-text/portable-text'
import { SanityImage } from '@/components/sanity-image'
import { ContactTeaser } from '@/components/sections/contact-teaser'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { buildMetadata } from '@/lib/metadata'
import { getAboutPage, getSiteSettings } from '@/sanity/lib/repository'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getAboutPage({ stega: false }),
    getSiteSettings({ stega: false }),
  ])
  return buildMetadata({
    title: page?.title || 'Über mich',
    description: page?.introduction,
    path: '/ueber-mich',
    seo: page?.seo,
    fallbackImage: settings?.defaultSocialImage,
  })
}

export default async function AboutPage() {
  const page = await getAboutPage()
  if (!page) return <EmptyState title="Über mich" />

  return (
    <>
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-start">
          <div>
            <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              {page.title}
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
              {page.introduction}
            </p>
          </div>
          {page.portrait ? (
            <SanityImage
              image={page.portrait}
              sizes="(max-width: 1024px) 100vw, 40vw"
              preload
            />
          ) : null}
        </div>
        <PortableText value={page.body} className="mt-16" />
      </Container>
      <ContactTeaser value={page.contactTeaser} />
    </>
  )
}
