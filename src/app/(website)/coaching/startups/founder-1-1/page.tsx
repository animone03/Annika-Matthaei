import type { Metadata } from 'next'

import { StartupOfferPage } from '@/components/sections/startup-offer-page'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Founder Coaching 1:1 – Annika Matthaei',
  description:
    '1:1 Coaching für Founder in der Wachstumsphase: 3–4 Monate, alle 2–3 Wochen 90 Minuten. In München und online.',
  path: '/coaching/startups/founder-1-1',
  absoluteTitle: true,
})

export default function FounderCoachingPage() {
  return (
    <StartupOfferPage
      title="Founder Coaching 1:1"
      question="Was wäre, wenn du endlich wieder voller Energie Entrepreneur sein kannst?"
      intro="Vieles läuft nur über dich. Du bist fast nur noch in Meetings, und die strategische Arbeit bleibt auf der Strecke. Du wünschst dir ein Leadership-Team, dem du vertraust."
      sectionsLabel="So arbeiten wir"
      sections={[
        {
          title: 'Deine Themen im Mittelpunkt',
          text: 'Wir arbeiten an allem, was dich gerade herausfordert. Kein festes Programm, sondern genau das, was du brauchst.',
        },
        {
          title: 'Ein Rhythmus, der in deinen Kalender passt',
          text: 'Alle 2–3 Wochen eine Session von 90 Minuten, über 3–4 Monate. So kommst du auf kürzestem Weg an dein Ziel.',
        },
        {
          title: 'Was sich verändert',
          text: 'Sehr wahrscheinlich erlebst du schnell einiges anders: Du hast deine Energie zurück. Flexible Strukturen und klare Rollen machen alles wieder überschaubar.',
        },
      ]}
      resultLabel="Danach hast du"
      result="Lösungen, wie du dein Leadership-Team befähigst. Und du fühlst dich sicher in deiner Rolle."
      facts={[
        { label: 'Für', value: 'Founder in der Wachstumsphase' },
        { label: 'Dauer', value: '3–4 Monate' },
        { label: 'Rhythmus', value: 'Alle 2–3 Wochen, 90 Minuten' },
        { label: 'Ort', value: 'München und online' },
      ]}
    />
  )
}
