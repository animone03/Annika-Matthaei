import type { Metadata } from 'next'

import { StartupOfferPage } from '@/components/sections/startup-offer-page'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title:
    'Lead with Clarity: Leadership-Workshops für Startups – Annika Matthaei',
  description:
    'Workshops für Leadership-Teams in der Wachstumsphase: Prioritäten, Rollen, Entscheidungen. Praxisnah, in München und online.',
  path: '/coaching/startups/lead-with-clarity',
  absoluteTitle: true,
})

export default function LeadWithClarityPage() {
  return (
    <StartupOfferPage
      title="Lead with Clarity"
      question="Stell dir vor, ihr führt als Leadership-Team mit einem klaren gemeinsamen Blick darauf, was ihr erreichen wollt und wie ihr dort hinkommt."
      intro="Workshops für Startup-Teams mitten im Wachstum, die spüren: Wir wollen klarer, gemeinsamer und strategischer führen. Praxisnah, strukturiert und ohne Theorie-Overload. Was ihr lernt, nutzt ihr am nächsten Tag."
      sectionsLabel="Woran wir arbeiten können"
      sections={[
        {
          title: 'Klarheit schaffen',
          text: 'Was ist jetzt wichtig? Welche Prioritäten tragen euch durchs nächste Quartal? Wir sortieren und reduzieren, bis eure nächsten Schritte als Roadmap klar sind.',
        },
        {
          title: 'Rollen schärfen',
          text: 'Viele Teams wachsen schneller als ihre Rollenbilder. Wir klären, wer welche Verantwortung trägt und wie ihr euch am besten ergänzt.',
        },
        {
          title: 'Operating Principles definieren',
          text: 'Klare Leitlinien für Entscheidungen, Zusammenarbeit und Kommunikation. Für starken Zusammenhalt und weniger Grundsatzdiskussionen.',
        },
        {
          title: 'Bessere Entscheidungen treffen',
          text: 'Einfache Entscheidungsformate, die Diskussionen verkürzen und euch schneller handlungsfähig machen.',
        },
        {
          title: 'Ein abgestimmtes Team formen',
          text: 'Klare Kommunikation, produktive Debatten und ein Leadership-Rhythmus, der euch Stabilität gibt.',
        },
        {
          title: 'Leadership-Prinzipien entwickeln',
          text: 'Ein gemeinsames Führungsbild, auf das sich das ganze Team verlassen kann. Auch für Leads, die neu dazukommen.',
        },
        {
          title: 'Mentale Fitness im Team',
          text: 'Kluge Priorisierung, gute Grenzen und Energiemanagement, damit ihr auch stressige Phasen souverän führt. Denn euer Stress überträgt sich aufs Team, eure Klarheit auch.',
        },
        {
          title: 'Team-Stärken sichtbar machen',
          text: 'Wie ergänzt ihr euch, wo entstehen Spannungen, und wie nutzt ihr Konflikte produktiv? The Best of Us!',
        },
        {
          title: 'Den nächsten Schritt definieren',
          text: 'Was lassen wir? Was starten wir? Was ist unser klarer nächster Schritt?',
        },
      ]}
      resultLabel="Danach wisst ihr"
      result="Was jetzt wichtig ist, was ihr als Nächstes tut und wie ihr ab morgen besser zusammenarbeitet."
      facts={[
        {
          label: 'Für',
          value: 'Leadership-Teams in Startups in der Wachstumsphase',
        },
        {
          label: 'Format',
          value: 'Workshop, auf eure Situation zugeschnitten',
        },
        {
          label: 'Start',
          value: 'Kickoff-Call, in dem wir klären, was ihr braucht',
        },
        { label: 'Ort', value: 'München und online' },
      ]}
    />
  )
}
