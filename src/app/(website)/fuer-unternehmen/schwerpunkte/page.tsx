import type { Metadata } from 'next'
import Link from 'next/link'

import { CompanyFocusContent } from '@/components/sections/company-focus-content'
import { Container } from '@/components/ui/container'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Schwerpunkte für Teams & Führungskräfte',
  description:
    'Individuelle Programme, Keynotes und Workshops für Teams und Führungskräfte: Kommunikation, Resilienz, Fokus und mentale Fitness.',
  path: '/fuer-unternehmen/schwerpunkte',
})

export default function CompanyFocusPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <Link href="/fuer-unternehmen" className="editorial-link mb-10">
          <span aria-hidden="true">←</span> Zurück zu Für Unternehmen
        </Link>
        <CompanyFocusContent headingLevel="h1" />
      </Container>
    </section>
  )
}
