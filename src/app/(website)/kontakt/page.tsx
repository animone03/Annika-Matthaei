import type { Metadata } from 'next'

import { PortableText } from '@/components/portable-text/portable-text'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { buildMetadata } from '@/lib/metadata'
import { getContactPage, getSiteSettings } from '@/sanity/lib/repository'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getContactPage({ stega: false }),
    getSiteSettings({ stega: false }),
  ])
  return buildMetadata({
    title: page?.title || 'Kontakt',
    description: page?.introduction,
    path: '/kontakt',
    seo: page?.seo,
    fallbackImage: settings?.defaultSocialImage,
  })
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ])
  if (!page) return <EmptyState title="Kontakt" />

  return (
    <Container className="py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            {page.title}
          </h1>
          <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
            {page.introduction}
          </p>
          <PortableText value={page.body} className="mt-10" />
        </div>
        <aside className="border-border bg-surface rounded-[var(--radius)] border p-8">
          {settings?.email ? (
            <a
              className="text-accent text-xl font-semibold underline underline-offset-4"
              href={`mailto:${settings.email}`}
            >
              {settings.email}
            </a>
          ) : (
            <p className="text-muted-foreground">
              Noch keine Kontaktadresse veröffentlicht.
            </p>
          )}
          {settings?.socialLinks?.length ? (
            <ul className="mt-8 space-y-3">
              {settings.socialLinks.map((link) =>
                link.label && link.url ? (
                  <li key={link._key}>
                    <a
                      className="hover:text-accent font-medium"
                      href={link.url}
                      rel="me"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          ) : null}
        </aside>
      </div>
    </Container>
  )
}
