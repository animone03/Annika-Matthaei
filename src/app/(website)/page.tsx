import type { Metadata } from 'next'

import { HomePageContent } from '@/components/sections/home-page'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site-url'
import { getHomePage, getSiteSettings } from '@/sanity/lib/repository'

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
  const settings = await getSiteSettings()

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
      <HomePageContent email={settings?.email} />
    </>
  )
}
