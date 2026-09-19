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
          Mentale Fitness für Teams &amp; Führungskräfte
        </h1>
        <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
          Unsere mentale Fitness ist trainierbar, wie ein Muskel. Ich arbeite
          mit Führungskräften und Teams, die merken, dass da noch Luft nach oben
          ist.
        </p>
        <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
          Meine Programme werden individuell an Ihre Bedürfnisse und
          Herausforderungen angepasst und können folgende Schwerpunkte haben:
        </p>
        <ul
          lang="en"
          className="text-muted-foreground mt-7 max-w-2xl list-disc space-y-2 pl-6 text-xl leading-9"
        >
          <li>Level up your (team) performance</li>
          <li>Communicate with clarity &amp; confidence</li>
          <li>Build resilience</li>
          <li>
            Understand your nervous system &amp; put neuroscience into practice
          </li>
          <li>focus &amp; productivity</li>
          <li>emotional navigation &amp; management</li>
          <li>Build lasting confidence</li>
        </ul>
        <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9">
          Zu diesen Themen biete ich Keynotes, Workshops und Integrations
          Begleitung an, sodass das Wissen nach einem Workshop auch wirklich im
          Alltag ankommt und täglich trainiert wird!
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
