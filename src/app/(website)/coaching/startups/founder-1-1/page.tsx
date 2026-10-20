import type { Metadata } from 'next'

import { StartupOfferPage } from '@/components/sections/startup-offer-page'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Founder Coaching 1:1 – Annika Matthaei',
  description:
    'Founder Coaching 1:1: mentale Fitness und strategisches Sparring für Founder in der Wachstumsphase. 3–4 Monate, online und vor Ort.',
  path: '/coaching/startups/founder-1-1',
  absoluteTitle: true,
  // Altes Design und nicht verlinkt: bis zur Neugestaltung nicht bei Google
  seo: { noIndex: true },
})

export default function FounderCoachingPage() {
  return (
    <StartupOfferPage
      title="Founder Coaching 1:1"
      question="Was wäre, wenn du endlich wieder voller Energie Entrepreneur sein kannst?"
      intro="Vieles läuft nur über dich. Du bist fast nur noch in Meetings, und die strategische Arbeit bleibt auf der Strecke. Du wünschst dir ein Leadership-Team, dem du vertraust."
      sectionsLabel="Woran wir arbeiten"
      sections={[
        {
          title: 'Mentale Fitness',
          text: 'Wie du unter Druck klar bleibst, deine Energie hältst und wieder Raum für das Wesentliche hast. Mit Werkzeugen, die im Founder-Alltag funktionieren, nicht nur im Seminarraum.',
        },
        {
          title: 'Strategisches Sparring',
          text: 'Wohin soll es gehen, was ist jetzt wichtig, was lässt du los? Ich bringe meine Erfahrung als Strategin ein, wenn du sie brauchst. Und halte mich zurück, wenn du deine eigene Antwort findest.',
        },
        {
          title: 'Führen und abgeben',
          text: 'Klare Rollen und ein Leadership-Team, an das du abgeben kannst. Damit nicht mehr alles über deinen Tisch läuft.',
        },
      ]}
      resultLabel="Danach hast du"
      result="Lösungen, wie du dein Leadership-Team befähigst. Und du fühlst dich sicher in deiner Rolle."
      facts={[
        { label: 'Für', value: 'Founder in der Wachstumsphase' },
        { label: 'Dauer', value: '3–4 Monate' },
        { label: 'Rhythmus', value: 'Alle 2–3 Wochen, 90 Minuten' },
        { label: 'Ort', value: 'Online & vor Ort' },
      ]}
    />
  )
}
