import type { Metadata } from 'next'

import { Container } from '@/components/ui/container'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Für Einzelpersonen',
  description:
    'Mindful Business und Life Coaching für Privatpersonen und Einzelpersonen der Kreativbranche.',
  path: '/fuer-einzelpersonen',
})

export default function ForIndividualsPage() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
        Für Einzelpersonen
      </h1>
      <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
        Als zertifizierte Mindful Business und Life Coach begleite ich
        Privatpersonen – einzeln und auf Augenhöhe, mit Fokus auf Kommunikation,
        Ownership und Resilienz.
      </p>
    </Container>
  )
}
