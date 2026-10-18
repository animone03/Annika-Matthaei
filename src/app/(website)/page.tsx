import type { Metadata } from 'next'

import { HomePageContent } from '@/components/sections/home-page'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { personAndServiceSchema } from '@/lib/structured-data'
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
      <JsonLd data={personAndServiceSchema(settings)} />
      <HomePageContent />
    </>
  )
}
