import type { Metadata } from 'next'

import { PortableText } from '@/components/portable-text/portable-text'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { formatDate } from '@/lib/date'
import { buildMetadata } from '@/lib/metadata'
import { getLegalPage, getSiteSettings } from '@/sanity/lib/repository'

type LegalPageId = 'legalPage.impressum' | 'legalPage.datenschutz'

export async function generateLegalMetadata(
  id: LegalPageId,
  fallbackTitle: string,
  path: string,
): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getLegalPage(id, { stega: false }),
    getSiteSettings({ stega: false }),
  ])

  return buildMetadata({
    title: page?.title || fallbackTitle,
    path,
    seo: page?.seo,
    fallbackImage: settings?.defaultSocialImage,
  })
}

export async function LegalPageView({
  id,
  fallbackTitle,
}: {
  id: LegalPageId
  fallbackTitle: string
}) {
  const page = await getLegalPage(id)
  if (!page) return <EmptyState title={fallbackTitle} />

  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
        {page.title}
      </h1>
      {page.updatedAt ? (
        <p className="text-muted-foreground mt-5 text-sm">
          Stand:{' '}
          <time dateTime={page.updatedAt}>{formatDate(page.updatedAt)}</time>
        </p>
      ) : null}
      <PortableText value={page.body} className="mt-12" />
    </Container>
  )
}
