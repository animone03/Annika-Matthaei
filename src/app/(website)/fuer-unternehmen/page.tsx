import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../../public/images/annika-unternehmen.jpg'

import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Für Unternehmen',
  description:
    'Coaching und Training für Startups und Founder: Gründungsteams, Co-Founder und Führungskräfte zwischen erster Idee und wachsendem Unternehmen.',
  path: '/fuer-unternehmen',
})

const offers = [
  {
    label: 'Early Stage',
    title: 'Eine starke Basis für eure Gründung.',
    paragraphs: [
      'Aus eurer Idee wird ein Unternehmen – und ihr wachst in neue Rollen hinein. Dabei gilt es, Prioritäten zu setzen, Verantwortung zu teilen und gemeinsame Entscheidungen zu treffen.',
      'Ich unterstütze euch dabei, Erwartungen offen anzusprechen, eure Rollen zu klären und eine Zusammenarbeit aufzubauen, die auch unter Druck trägt. Damit ihr als Gründungsteam Klarheit gewinnt und eure nächsten Schritte gemeinsam angeht.',
      'Im Rahmen einer Hochschulkooperation coache ich bereits EXIST-Gründungsteams.',
    ],
  },
  {
    label: 'Co-Founder Coaching',
    title: 'Gemeinsam gründen. Gemeinsam weiterkommen.',
    paragraphs: [
      'Ihr teilt eine Idee. Wie ihr arbeiten, entscheiden und mit Druck umgehen wollt, ist damit noch nicht geklärt.',
      'Wir machen Erwartungen sichtbar, klären Rollen und sprechen an, was im Alltag oft liegen bleibt: unterschiedliche Ambitionen, unausgesprochene Spannungen oder die Frage, wer am Ende entscheidet.',
      'Damit ihr Unterschiede konstruktiv nutzt, Konflikte klärt und eine Zusammenarbeit entwickelt, auf die ihr euch verlassen könnt.',
    ],
  },
  {
    label: 'Leadership & Teams',
    title: 'Gemeinsam mehr bewegen.',
    paragraphs: [
      'Das Team wächst. Entscheidungen laufen weiterhin bei euch zusammen. Was sich früher nebenbei geklärt hat, braucht plötzlich Absprachen und klare Verantwortung.',
      'Ich unterstütze euch dabei, in eure Führungsrolle hineinzuwachsen und leistungsfähige Teams aufzubauen. Teams, die mitdenken, Verantwortung übernehmen, offen miteinander sprechen und ihre Stärken gemeinsam einsetzen.',
      'So wird High Performance im Alltag konkret: durch klare Prioritäten, gute Entscheidungen und Zusammenarbeit, die euer Startup voranbringt.',
    ],
  },
]

const approach = [
  {
    title: 'Verstehen, was eure Zusammenarbeit prägt.',
    text: 'Wir schauen auf eure Rollen, Erwartungen und die Muster, die sich im Alltag eingespielt haben. Was passiert zum Beispiel im Team, wenn Entscheidungen immer wieder bei denselben Personen landen? Gemeinsam erkennt ihr, was euch weiterbringt und wo ihr etwas verändern könnt.',
  },
  {
    title: 'Arbeitsweisen entwickeln, die zu euch passen.',
    text: 'Wir klären Prioritäten, vereinfachen Abstimmungen und gestalten Prozesse so, dass ihr gut zusammenarbeiten könnt. Dazu gehört auch, AI dort einzusetzen, wo sie Aufgaben erleichtert und wiederkehrende Arbeit reduziert.',
  },
  {
    title: 'Aus Erkenntnissen konkrete Veränderungen machen.',
    text: 'Ihr probiert neue Arbeitsweisen im Alltag aus, reflektiert ihre Wirkung und entwickelt weiter, was funktioniert. So entstehen Lösungen, die zu eurem Team und eurer aktuellen Phase passen – und mit euch wachsen können.',
  },
]

export default function ForCompaniesPage() {
  return (
    <div data-company-page>
      <section className="px-6 pt-6 pb-11 sm:px-10 sm:pt-7 sm:pb-20">
        <div className="editorial-label flex justify-between gap-6">
          <span>Für Unternehmen</span>
          <span className="hidden sm:inline">Coaching &amp; Training</span>
        </div>
        <div className="mx-auto mt-11 grid max-w-[1140px] gap-9 sm:mt-20 sm:grid-cols-2 sm:gap-[12%]">
          <div>
            <p className="editorial-label mb-5">
              Coaching &amp; Training für Startups &amp; Founder
            </p>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.75rem)] leading-[1.13] tracking-[-0.035em] uppercase">
              Euer Startup wächst mit euch.
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
            <p className="max-w-md text-base leading-8">
              Eine Idee voranbringen. Gemeinsam gründen. Ein Team aufbauen, das
              etwas bewegen will. Dafür braucht ihr Klarheit, Vertrauen und die
              Fähigkeit, auch dann zusammenzuarbeiten, wenn es anspruchsvoll
              wird.
            </p>
            <p className="text-muted-foreground mt-6 max-w-md text-base leading-8">
              Ich begleite euch dabei: als Founder, als Gründungsteam und als
              Führungskräfte. Mit Coaching und Training für die
              Herausforderungen zwischen erster Idee und wachsendem Unternehmen.
            </p>
            <Link href="/kontakt" className="editorial-link mt-8">
              Lasst uns kennenlernen <span aria-hidden="true">↗︎</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-11 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1140px]">
          <div className="grid gap-9 sm:grid-cols-2 sm:gap-[12%]">
            <h2 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
              Große Pläne. Und Menschen, die sie umsetzen.
            </h2>
            <div>
              <p className="max-w-md text-base leading-8">
                Mit jeder neuen Phase verändert sich, was euer Startup von euch
                braucht. Ihr trefft Entscheidungen unter Unsicherheit, bringt
                unterschiedliche Vorstellungen zusammen und übernehmt
                Verantwortung, in die ihr selbst erst hineinwachst.
              </p>
              <p className="text-muted-foreground mt-6 max-w-md text-base leading-8">
                Wir arbeiten an dem, was euch gerade weiterbringt – und schaffen
                eine Grundlage für das, was als Nächstes kommt.
              </p>
            </div>
          </div>

          <div className="border-border mt-11 border-t sm:mt-16">
            {offers.map((offer) => (
              <article
                key={offer.label}
                className="border-border grid gap-5 border-b py-9 sm:grid-cols-2 sm:gap-[12%] sm:py-12"
              >
                <div>
                  <p className="editorial-label mb-4">{offer.label}</p>
                  <h3 className="text-xl leading-tight tracking-[-0.02em] uppercase sm:text-2xl">
                    {offer.title}
                  </h3>
                </div>
                <div className="text-muted-foreground space-y-5 text-base leading-8">
                  {offer.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-md">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-11 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1140px]">
          <div className="grid gap-9 sm:grid-cols-2 sm:gap-[12%]">
            <h2 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
              Mein Ansatz: Zusammenhänge verstehen. Zusammenarbeit verbessern.
            </h2>
            <p className="max-w-md text-base leading-8">
              Ich verbinde systemisches Coaching mit agilen Arbeitsweisen und
              einem praktischen Blick auf Prozesse und AI. Dabei schauen wir
              sowohl auf die Menschen als auch darauf, wie ihr eure tägliche
              Arbeit organisiert.
            </p>
          </div>
          <div className="mt-11 grid gap-9 sm:mt-16 sm:grid-cols-3 sm:gap-10">
            {approach.map((step) => (
              <div key={step.title} className="border-border border-t pt-6">
                <h3 className="text-lg leading-snug tracking-[-0.015em]">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-4 text-base leading-8">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-11 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1140px] gap-9 sm:grid-cols-2 sm:gap-[12%]">
          <h2 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
            Ich bin Annika.
          </h2>
          <div className="text-muted-foreground space-y-5 text-base leading-8">
            <p className="text-foreground max-w-md">
              Ich bringe über 14 Jahre Berufserfahrung aus Konzern, Mittelstand
              und Startup mit, davon zehn Jahre mit Führungsverantwortung.
            </p>
            <p className="max-w-md">
              Ich kenne den Anspruch, Ergebnisse zu liefern, Menschen zu führen
              und Veränderungen zu gestalten, aus eigener Erfahrung. Diese
              Perspektive verbinde ich mit meiner Ausbildung als systemischer
              Coach und meiner Expertise in Agile Leadership und AI
              Transformation.
            </p>
            <p className="max-w-md">
              Mein Studium der Betriebswirtschaft sowie mein Master in Marketing
              und Kommunikationswissenschaft ergänzen meinen Blick auf
              Unternehmen und die Menschen, die sie gestalten.
            </p>
            <p className="max-w-md">
              Mit mir bekommt ihr eine Sparringspartnerin, die unternehmerisch
              denkt, genau hinhört und auch unbequeme Fragen stellt. Damit aus
              euren Gesprächen Klarheit entsteht – und daraus konkrete nächste
              Schritte.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-11 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1140px] gap-9 sm:grid-cols-2 sm:gap-[12%]">
          <h2 className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
            Was steht bei euch gerade an?
          </h2>
          <div>
            <p className="max-w-md text-base leading-8">
              Ihr steht am Anfang, wollt eure Zusammenarbeit als Co-Founder
              stärken oder mit eurem Team den nächsten Schritt gehen?
            </p>
            <p className="text-muted-foreground mt-6 max-w-md text-base leading-8">
              Lasst uns darüber sprechen, wo ihr steht und welche Unterstützung
              euch weiterbringt.
            </p>
            <Link href="/kontakt" className="editorial-link mt-8">
              Kennenlerngespräch vereinbaren <span aria-hidden="true">↗︎</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
