import type { Metadata } from 'next'

import { StartupOfferPage } from '@/components/sections/startup-offer-page'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'EXIST-Coaching für Founder-Teams – Annika Matthaei',
  description:
    'Coaching für EXIST-geförderte Gründungsteams. 6 Sessions, über das EXIST-Budget förderfähig.',
  path: '/coaching/startups/exist',
  absoluteTitle: true,
})

export default function ExistCoachingPage() {
  return (
    <StartupOfferPage
      title="EXIST-Coaching"
      question="Bauen wir das Richtige? Und können wir es als Co-Founder-Team gemeinsam umsetzen?"
      intro="Early Stage passiert alles gleichzeitig. Ihr baut euer Startup und euren Modus als Team. Ich helfe euch, beides von Anfang an richtig aufzusetzen."
      sectionsLabel="Die drei Module"
      sections={[
        {
          title: 'Co-Founder-Alignment',
          text: 'Vision, Rollen, shared Commitment. Stärken und Blind Spots. Werte, Operating Principles, Entscheidungskriterien. Wie ihr mit Spannungen umgeht und stabil bleibt.',
        },
        {
          title: 'Traction, Kundenfokus & Entscheidungen',
          text: 'Prioritäten setzen, wenn alles dringend ist. Entscheiden unter Unsicherheit. Verstehen, was der Markt braucht. Verantwortlichkeiten so aufsetzen, dass ihr ins Handeln kommt.',
        },
        {
          title: 'Vom Förderprojekt zum Unternehmen',
          text: 'VC, weitere Förderung oder Bootstrapping? Selbstbewusst ins Selling. Erste Hires onboarden, delegieren, Führung für die Phase nach EXIST.',
        },
      ]}
      result="Einen klaren Plan für die nächsten Monate, und ein Team, das auch unter Druck zusammen liefert."
      facts={[
        { label: 'Für', value: 'EXIST-geförderte Founder-Teams' },
        { label: 'Format', value: '6 Sessions, als Team, bei Bedarf 1:1' },
        { label: 'Ort', value: 'München und online' },
        {
          label: 'Finanzierung',
          value:
            'Über euer EXIST-Budget. Ich rechne direkt mit der Hochschule ab.',
        },
      ]}
    />
  )
}
