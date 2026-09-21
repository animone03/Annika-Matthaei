import type { Metadata } from 'next'
import Image from 'next/image'

import portrait from '../../../../public/images/annika-unternehmen-sessel.jpg'

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
        <div className="mt-12 grid items-start gap-8 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Image
            src={portrait}
            alt="Annika Matthaei im schwarzen Anzug, sitzend in einem hellen Sessel"
            placeholder="blur"
            sizes="(min-width: 1152px) 461px, (min-width: 1024px) calc(45vw - 58px), (min-width: 768px) calc(45vw - 43px), (min-width: 640px) 448px, (max-width: 488px) calc(100vw - 40px), 448px"
            className="h-auto w-full max-w-md md:max-w-none"
          />
          <div>
            <p className="text-muted-foreground text-xl leading-9">
              Meine Programme werden individuell an Ihre Bedürfnisse und
              Herausforderungen angepasst und können folgende Schwerpunkte
              haben:
            </p>
            <ul
              lang="en"
              className="text-muted-foreground mt-7 list-disc space-y-2 pl-6 text-xl leading-9"
            >
              <li>Level up your (team) performance</li>
              <li>Communicate with clarity &amp; confidence</li>
              <li>Build resilience</li>
              <li>
                Understand your nervous system &amp; put neuroscience into
                practice
              </li>
              <li>focus &amp; productivity</li>
              <li>emotional navigation &amp; management</li>
              <li>Build lasting confidence</li>
            </ul>
          </div>
        </div>
        <p className="text-muted-foreground mt-12 max-w-2xl text-xl leading-9">
          Zu diesen Themen biete ich Keynotes, Workshops und Integrations
          Begleitung an, sodass das Wissen nach einem Workshop auch wirklich im
          Alltag ankommt und täglich trainiert wird!
        </p>
      </Container>
    </>
  )
}
