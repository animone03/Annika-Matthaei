import type { Metadata } from 'next'

import { LegalPage } from '@/components/pages/legal-page'
import { datenschutz } from '@/content/rechtliches'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Datenschutz – Annika Matthaei',
  path: '/datenschutz',
  absoluteTitle: true,
})

export default function PrivacyPage() {
  return <LegalPage document={datenschutz} />
}
