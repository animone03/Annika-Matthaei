import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import detailImage from '../../../../public/images/annika-unternehmen.jpg'

import { ReferencesSection } from '@/components/sections/references-section'
import { ServicesSection } from '@/components/sections/services-section'

export const metadata: Metadata = {
  title: 'Frühere Designvorschläge',
  robots: { index: false, follow: false },
}

export default function DesignPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <>
      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4 sm:px-10">
        <h1 className="editorial-label">
          Vorschau · Frühere Startseiten-Abschnitte
        </h1>
        <Link href="/" className="text-xs underline underline-offset-4">
          Zur aktuellen Startseite
        </Link>
      </div>
      <section className="px-6 pt-6 pb-11 sm:px-10 sm:pt-7 sm:pb-20">
        <div className="editorial-label flex justify-between gap-6">
          <span>01 / Haltung &amp; Ansatz</span>
          <span className="hidden sm:inline">Coaching &amp; Training</span>
        </div>
        <div className="mx-auto mt-11 grid max-w-[1140px] gap-9 sm:mt-20 sm:grid-cols-2 sm:gap-[12%]">
          <div>
            <h2
              lang="en"
              className="text-[clamp(1.75rem,2.7vw,2.75rem)] leading-[1.13] tracking-[-0.035em] uppercase"
            >
              train your brain
              <br />
              like you train
              <br />
              your body!
            </h2>
            <div className="mt-7 ml-auto w-[76%] max-w-[250px] sm:mt-11">
              <Image
                src={detailImage}
                alt="Annika Matthaei im weißen Oberteil vor einem hellen Hintergrund"
                placeholder="blur"
                sizes="(min-width: 640px) 250px, 70vw"
                className="aspect-[4/5] w-full object-cover saturate-[0.35]"
              />
            </div>
          </div>
          <div className="sm:pt-1">
            <p className="text-base leading-[1.8]">
              Als zertifizierte systemische &amp; psychologische Business Coach
              arbeite ich mit Privatpersonen, Teams und Führungskräften. Meine
              Fokusthemen sind Kommunikation, Ownership und Resilienz; denn nur
              wer wirksam kommuniziert, Verantwortung übernimmt und
              Widerstandsfähigkeit entwickelt, kann Projekte wirkungsvoll
              umsetzen und Ideen und Visionen wirklich in die Welt bringen. Mit
              einem wertschätzenden, ressourcenorientierten und praxisnahen
              Ansatz unterstütze ich dabei, Herausforderung und Veränderung als
              Chance zu sehen und von der Wahrnehmung über die Erkenntnis ins
              Doing zu kommen – so, dass sich im täglichen Arbeiten wirklich
              etwas verändert.
              <br />
              Ich freue mich auf eine wirkungsvolle Zusammenarbeit!
            </p>
            <Link href="/ueber-mich" className="editorial-link mt-8">
              Über mich <span aria-hidden="true">↗︎</span>
            </Link>
          </div>
        </div>
      </section>
      <ServicesSection />
      <ReferencesSection />
    </>
  )
}
