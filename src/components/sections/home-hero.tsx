import Image from 'next/image'

import { SanityImage } from '@/components/sanity-image'
import { Container } from '@/components/ui/container'

type HomeHeroProps = {
  eyebrow?: string | null
  heading?: string | null
  lead?: string | null
  portrait?: unknown
}

const defaults = {
  eyebrow: '',
  heading: 'coaching & training for mental fitness',
  lead: 'Als zertifizierte systemische & psychologische Business Coach arbeite ich mit Privatpersonen, Teams und Führungskräften. Meine Fokusthemen sind Kommunikation, Ownership und Resilienz; denn nur wer wirksam kommuniziert, Verantwortung übernimmt und Widerstandsfähigkeit entwickelt, kann Ideen und Visionen wirklich in die Welt bringen. Mit einem wertschätzenden, ressourcenorientierten und praxisnahen Ansatz unterstütze ich dabei, Herausforderung als Chance zu begreifen und von der Wahrnehmung über die Erkenntnis ins Doing zu kommen. Bei Bedarf sind auch achtsamkeitsbasierte Methoden, Körperwahrnehmungen und Atemübungen zum Beispiel, Teil meines Coaching- und Trainings-Angebots.',
}

export function HomeHero({ eyebrow, heading, lead, portrait }: HomeHeroProps) {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          {eyebrow || defaults.eyebrow ? (
            <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">
              {eyebrow || defaults.eyebrow}
            </p>
          ) : null}
          <h1 className="text-5xl leading-[1.15] font-normal tracking-[-0.015em] text-balance sm:text-6xl">
            {heading || defaults.heading}
          </h1>
          <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9 text-pretty">
            {lead || defaults.lead}
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {portrait ? (
            <SanityImage
              image={portrait}
              sizes="(max-width: 1024px) 100vw, 45vw"
              preload
            />
          ) : (
            <Image
              src="/images/annika-portrait.jpg"
              alt="Annika Matthaei, Mindful Business und Life Coach, sitzend auf einem hellen Bouclé-Stuhl"
              width={1000}
              height={1500}
              quality={75}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-auto w-full object-cover"
            />
          )}
        </div>
      </Container>
    </section>
  )
}
