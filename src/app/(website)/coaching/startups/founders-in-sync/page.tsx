import type { Metadata } from 'next'

import { StartupOfferPage } from '@/components/sections/startup-offer-page'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Founders in Sync: Co-Founder Coaching – Annika Matthaei',
  description:
    'Coaching für Co-Founder-Teams: Sach- und Beziehungsfragen klären, wieder gemeinsam entscheiden und Tempo machen. In München und online.',
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
          title: 'Sache und Beziehung auseinanderhalten',
          text: 'Oft sieht es aus wie ein Streit über Produkt, Pricing oder Go-to-Market. Wir schauen, was davon Strategie ist und was zwischen euch steht. Und klären beides, in einem Rahmen, in dem beide gehört werden.',
        },
        {
          title: 'Rollen und Entscheidungen klären',
          text: 'Wer entscheidet was? Was macht ihr, wenn ihr euch nicht einig seid? Damit ihr nach außen und im Team mit einer Stimme sprecht.',
        },
        {
          title: 'Unter Druck zusammenhalten',
          text: 'Wie ihr auch in stressigen Phasen fair streitet, schnell entscheidet und euch dabei nicht aufreibt.',
        },
      ]}
      result="In wenigen Wochen wieder gemeinsam Tempo machen, mit klaren Rollen und einer Strategie, hinter der ihr beide steht."
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
