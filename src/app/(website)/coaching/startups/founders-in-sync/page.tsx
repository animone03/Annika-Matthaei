import type { Metadata } from 'next'

import { StartupOfferPage } from '@/components/sections/startup-offer-page'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Founders in Sync: Co-Founder Coaching – Annika Matthaei',
  description:
    'Coaching für Co-Founder-Teams: Spannungen klären, wieder Seite an Seite führen. In München und online.',
  path: '/coaching/startups/founders-in-sync',
  absoluteTitle: true,
})

export default function FoundersInSyncPage() {
  return (
    <StartupOfferPage
      title="Founders in Sync"
      question="Euer Funding steht, euer Team wächst. Von außen sieht alles gut aus. Aber zwischen euch hakt es."
      intro="Ihr diskutiert endlos und reibt euch auf, statt gemeinsam Tempo zu machen. Bei manchen Themen geht ihr euch ganz aus dem Weg. Und was niemand laut sagt: So hält das auf Dauer nicht."
      showStat
      sectionsLabel="Woran wir arbeiten"
      sections={[
        {
          title: 'Spannungen ehrlich klären',
          text: 'Wir bringen auf den Tisch, was zwischen euch steht. In einem geschützten Rahmen, in dem beide gehört werden.',
        },
        {
          title: 'Wieder Seite an Seite führen',
          text: 'Rollen, Verantwortung und gemeinsame Prinzipien, damit ihr nach außen und im Team mit einer Stimme sprecht.',
        },
        {
          title: 'Gemeinsam Tempo machen',
          text: 'Wie ihr Entscheidungen trefft und Konflikte löst, auch in stressigen Phasen, ohne euch dabei aufzureiben.',
        },
      ]}
      result="In wenigen Wochen zurück zu echter Partnerschaft. Stark im Zusammenspiel."
      facts={[
        { label: 'Für', value: 'Co-Founder-Teams, bei denen es hakt' },
        {
          label: 'Format',
          value: 'Programm über wenige Wochen, gemeinsam als Founder-Team',
        },
        { label: 'Start', value: 'Kennenlern-Call, getrennt oder gemeinsam' },
        { label: 'Ort', value: 'München und online' },
      ]}
    />
  )
}
