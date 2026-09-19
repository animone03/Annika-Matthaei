import type { Metadata } from 'next'
import Image from 'next/image'

import portrait from '../../../../public/images/annika-unternehmen.jpg'

import { Container } from '@/components/ui/container'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Für Unternehmen',
  description:
    'Coaching und Team-Training für Unternehmen der Kreativbranche: Kommunikation, Ownership und Resilienz.',
  path: '/fuer-unternehmen',
})

export default function ForCompaniesPage() {
  return (
    <>
      <Container className="py-20 sm:py-28">
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          Für Unternehmen
        </h1>
        <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
          Als Team-Trainerin begleite ich Unternehmen und Führungskräfte der
          Kreativbranche – mit Workshops und Trainings zu Kommunikation,
          Ownership und Resilienz.
        </p>
        <Image
          src={portrait}
          alt="Porträt von Annika Matthaei"
          placeholder="blur"
          sizes="(max-width: 424px) calc(100vw - 40px), 384px"
          className="mt-10 h-auto w-full max-w-sm"
        />
      </Container>
    </>
  )
}
