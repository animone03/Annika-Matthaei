import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../public/images/annika-unternehmen-sessel.jpg'

export function ServicesSection() {
  return (
    <section
      className="bg-olive px-6 pt-6 pb-10 sm:px-10 sm:pb-12"
      aria-labelledby="services-heading"
    >
      <div className="editorial-label flex justify-between gap-6">
        <span>02 / Zusammenarbeit</span>
        <span>Annika Matthaei</span>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-20">
        <div>
          <Image
            src={portrait}
            alt="Annika Matthaei im schwarzen Anzug in einem hellen Sessel"
            placeholder="blur"
            sizes="(min-width: 1280px) 440px, (min-width: 768px) 40vw, 85vw"
            className="aspect-[4/5] w-full object-cover object-center grayscale"
          />
          <h2
            id="services-heading"
            className="mt-6 flex justify-between gap-6 text-2xl tracking-[-0.035em] uppercase sm:text-3xl"
          >
            <span aria-hidden="true">02.</span> Coaching &amp; Training
          </h2>
        </div>
        <div className="space-y-12 py-4 md:py-12">
          <div>
            <p className="editorial-label mb-5">Teams &amp; Führungskräfte</p>
            <h3 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
              Mentale Fitness für Unternehmen
            </h3>
            <p className="mt-5 max-w-md text-base leading-7">
              Unsere mentale Fitness ist trainierbar, wie ein Muskel. Ich
              arbeite mit Führungskräften und Teams, die merken, dass da noch
              Luft nach oben ist.
            </p>
            <Link href="/fuer-unternehmen" className="editorial-link mt-5">
              Für Unternehmen <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="border-foreground/30 border-t pt-10">
            <p className="editorial-label mb-5">
              Individuell &amp; auf Augenhöhe
            </p>
            <h3 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
              Mindful Business &amp; Life Coaching
            </h3>
            <p className="mt-5 max-w-md text-base leading-7">
              Als zertifizierte Mindful Business und Life Coach begleite ich
              Privatpersonen – einzeln und auf Augenhöhe, mit Fokus auf
              Kommunikation, Ownership und Resilienz.
            </p>
            <Link href="/fuer-einzelpersonen" className="editorial-link mt-5">
              Für Einzelpersonen <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
