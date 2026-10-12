import type { Metadata } from 'next'
import Image from 'next/image'

import portrait from '../../../../public/images/annika-unternehmen.jpg'

import { CompanyFocusText } from '@/components/sections/company-focus-content'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Für Unternehmen',
  description:
    'Coaching und Team-Training für Unternehmen der Kreativbranche: Kommunikation, Ownership und Resilienz.',
  path: '/fuer-unternehmen',
})

export default function ForCompaniesPage() {
  return (
    <section
      data-company-page
      className="px-6 pt-6 pb-11 sm:px-10 sm:pt-7 sm:pb-20"
    >
      <div className="editorial-label flex justify-between gap-6">
        <span>Für Unternehmen</span>
        <span className="hidden sm:inline">Coaching &amp; Training</span>
      </div>
      <div className="mx-auto mt-11 grid max-w-[1140px] gap-9 sm:mt-20 sm:grid-cols-2 sm:gap-[12%]">
        <div>
          <h1
            lang="en"
            className="text-[clamp(1.75rem,2.7vw,2.75rem)] leading-[1.13] tracking-[-0.035em] uppercase"
          >
            train your brain
            <br />
            like you train
            <br />
            your body!
          </h1>
          <div className="mt-7 ml-auto w-[76%] max-w-[250px] sm:mt-11">
            <Image
              src={portrait}
              alt="Annika Matthaei im weißen Oberteil vor einem hellen Hintergrund"
              placeholder="blur"
              preload
              sizes="(min-width: 640px) 250px, 70vw"
              className="aspect-[4/5] w-full object-cover saturate-[0.35]"
            />
          </div>
        </div>
        <div className="sm:pt-1">
          <div>
            <p className="editorial-label mb-5">Teams &amp; Führungskräfte</p>
            <h2 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
              Mentale Fitness für Unternehmen
            </h2>
            <p className="mt-5 max-w-md text-base leading-7">
              Unsere mentale Fitness ist trainierbar, wie ein Muskel. Ich
              arbeite mit Führungskräften und Teams, die merken, dass da noch
              Luft nach oben ist.
            </p>
            <div id="schwerpunkte" className="mt-8 scroll-mt-6">
              <CompanyFocusText />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
