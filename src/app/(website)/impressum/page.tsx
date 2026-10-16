import type { Metadata } from 'next'

import { LegalPage } from '@/components/pages/legal-page'
import { impressum } from '@/content/rechtliches'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Impressum – Annika Matthaei',
  path: '/impressum',
  absoluteTitle: true,
})

export default function ImprintPage() {
  return <LegalPage document={impressum} />
}
