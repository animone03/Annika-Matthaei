import Image from 'next/image'

import heroImage from '../../../public/images/annika-home-hero.png'

import { Container } from '@/components/ui/container'

type HomeHeroProps = {
  eyebrow?: string | null
  heading?: string | null
  lead?: string | null
}

const defaults = {
  eyebrow: '',
  heading: 'Coaching & Training für mentale Fitness',
  lead: 'Als zertifizierte systemische & psychologische Business Coach arbeite ich mit Privatpersonen, Teams und Führungskräften. Meine Fokusthemen sind Kommunikation, Ownership und Resilienz; denn nur wer wirksam kommuniziert, Verantwortung übernimmt und Widerstandsfähigkeit entwickelt, kann Projekte wirkungsvoll umsetzen und Ideen und Visionen wirklich in die Welt bringen. Mit einem wertschätzenden, ressourcenorientierten und praxisnahen Ansatz unterstütze ich dabei, Herausforderung und Veränderung als Chance zu sehen und von der Wahrnehmung über die Erkenntnis ins Doing zu kommen – so, dass sich im täglichen Arbeiten wirklich etwas verändert.\nIch freue mich auf eine wirkungsvolle Zusammenarbeit!',
}

export function HomeHero({ eyebrow, heading, lead }: HomeHeroProps) {
  return (
    <section data-home-hero>
      <div className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2]">
          <Image
            src={heroImage}
            alt="Annika Matthaei vor einem hellen Hintergrund"
            preload
            placeholder="blur"
            sizes="(min-width: 640px) 140vw, 100vw"
            className="h-full w-full object-cover object-center sm:absolute sm:top-0 sm:right-0 sm:h-auto sm:w-[140%] sm:max-w-none"
          />
        </div>
        <div className="px-5 pt-10 sm:absolute sm:top-1/2 sm:left-[55%] sm:w-[40%] sm:-translate-y-1/2 sm:p-0">
          {eyebrow || defaults.eyebrow ? (
            <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">
              {eyebrow || defaults.eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl leading-[1.2] font-semibold tracking-[-0.015em] text-balance sm:text-[clamp(1.5rem,2.8vw,3rem)]">
            {heading || defaults.heading}
          </h1>
          <a
            href="#coaching-training"
            className="border-foreground hover:bg-foreground hover:text-background mt-6 inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-base font-medium transition-colors"
          >
            Mehr erfahren
          </a>
        </div>
      </div>
      <Container id="coaching-training" className="scroll-mt-8 py-12 sm:py-28">
        <h2
          lang="en"
          className="max-w-3xl text-3xl leading-tight font-medium text-balance sm:text-4xl"
        >
          train your brain like you train your body!
        </h2>
        <p className="text-muted-foreground mt-7 max-w-2xl text-xl leading-9 text-pretty whitespace-pre-line">
          {lead || defaults.lead}
        </p>
      </Container>
    </section>
  )
}
