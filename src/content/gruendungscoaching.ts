import type { Route } from 'next'

// Texte der Seite /coaching/startups/gruendungscoaching (Übergabe 15c,
// Briefing Gründungscoaching & EXIST vom 18.10.2026). Keine EXIST-Erfahrung
// behaupten, keine Preise.

export type GruendungsTab = 'team' | 'uni'

export const hero = {
  eyebrow: 'Gründungscoaching · Frühphase & EXIST',
  title: 'Gründen ist Teamsport.',
  intro:
    'In der Frühphase passiert alles gleichzeitig: Geschäftsmodell, erste Kund:innen, euer Team. Ich begleite euch bei allem, strategisch und mit Blick darauf, dass ihr als Team stark bleibt.',
}

// Zwei Eingänge. ?fuer=beratung öffnet den Reiter „uni“.
export const tabs: { id: GruendungsTab; label: string; title: string }[] = [
  { id: 'team', label: 'Ich gründe gerade', title: 'Für Gründungsteams' },
  {
    id: 'uni',
    label: 'Ich begleite Gründungsteams',
    title: 'Für Gründungsberatungen',
  },
]

// Reiter „Für Gründungsteams“

export const recognize = {
  title: 'Kommt euch das bekannt vor?',
  stat: {
    value: '72,5 %',
    text: 'Wer Geschäftsmodell und Team zusammen angeht, wächst mehr als doppelt so stark.',
    source: 'Kotha et al. (2022), Feldexperiment mit 181 Gründer:innen',
  },
  quotes: [
    'Wir sind gute Forscher:innen. Verkaufen haben wir nie gelernt.',
    'Wer von uns wird eigentlich CEO?',
    'Über Anteile haben wir in der ersten Woche gesprochen. Seitdem nie wieder.',
  ],
  bridge:
    'Geschäftsmodell und Team gehören zusammen. Deshalb arbeite ich an beidem.',
}

export const work = {
  title: 'Woran wir arbeiten',
  items: [
    {
      group: 'Euer Startup',
      title: 'Geschäftsmodell & Zielgruppe',
      text: 'Welches Problem ihr für wen löst, festgehalten im Business Model Canvas. Und Kundengespräche, die echte Antworten bringen statt Höflichkeiten.',
    },
    {
      group: 'Euer Startup',
      title: 'Positionierung & Markteintritt',
      text: 'Wofür ihr steht, wie ihr die ersten Kund:innen erreicht und was ihr als Nächstes ausprobiert.',
    },
    {
      group: 'Euer Startup',
      title: 'Finanzierung & Tragfähigkeit',
      text: 'Ein Finanzplan und die Frage, wie es nach EXIST weitergeht. Auf die Tragfähigkeitsbescheinigung bereite ich euch vor.',
    },
    {
      group: 'Euer Team',
      title: 'Team & Rollen',
      text: 'Wer was entscheidet, wer führt, was ihr voneinander erwartet und wie ihr über Anteile sprecht, bevor es schwierig wird.',
    },
    {
      group: 'Euer Team',
      title: 'Resilienz in der Gründungsphase',
      text: 'Energie, Druck und Unsicherheit aushalten. Und gesund bleiben, wenn die ersten Mitarbeitenden kommen.',
    },
  ],
}

export const roadmap = {
  title: 'Am Ende habt ihr euren Gründungsfahrplan',
  items: [
    'Geschäftsmodell auf einer Seite',
    'Zielgruppe und was die Kundengespräche gezeigt haben',
    'Drei Experimente für den Markteintritt in den nächsten 3 Monaten',
    'Rollen und Entscheidungsregeln im Gründerteam',
    'Euer Finanzierungsweg und die offenen Fragen',
  ],
}

export const process = {
  title: 'So läuft es',
  steps: [
    {
      title: 'Kennenlernen',
      text: '30 Minuten, kostenlos. Wo steht ihr, und was braucht ihr jetzt?',
    },
    {
      title: 'Klären',
      text: 'Ich kläre mit eurem Gründungsnetzwerk, was über das EXIST-Budget laufen kann. Ohne EXIST bekommt ihr einen festen Preis.',
    },
    {
      title: 'Arbeiten',
      text: 'Bis zu 5 Coaching-Tage, als ganze oder halbe Tage. Als Team, bei Bedarf einzeln.',
    },
    {
      title: 'Abschluss',
      text: 'Euer Gründungsfahrplan und ein Blick auf die nächsten Schritte.',
    },
  ],
}

// Reiter „Für Gründungsberatungen“

export const advisors = {
  title: 'Für Gründungsberatungen & Hochschulen',
  text: 'Ich ergänze eure Beratung dort, wo es selten Angebote gibt: Team, Rollen und Resilienz, verbunden mit Geschäftsmodell, Markteintritt, Marketing und agilem Projektmanagement.',
  formats: [
    {
      tone: 'sand',
      label: 'Für einzelne Teams',
      title: 'Gründungscoaching',
      text: 'Bis zu 5 Coaching-Tage, über die EXIST-Pauschale des Teams.',
    },
    {
      tone: 'stone',
      label: 'Für Kohorten',
      title: 'Workshops',
      text: 'Ein halber Tag Resilienz oder ein Co-Founder-Check-up für 5 bis 10 Teams. Auch für EXIST-Women-Programme.',
    },
    {
      tone: 'coal',
      label: 'Für euer Beratungsteam',
      title: 'Teamkonflikte früh erkennen',
      text: 'Woran ihr Spannungen in Gründerteams erkennt, bevor sie das Projekt gefährden.',
    },
  ],
  topics: {
    label: 'Themen in euren Worten',
    startup: {
      title: 'Euer Startup',
      note: 'Strategisch',
      items: [
        'Geschäftsmodell',
        'Markteintritt',
        'Marketing',
        'Finanzierung',
        'Agiles Projektmanagement',
      ],
    },
    team: {
      title: 'Euer Team',
      note: 'Coaching',
      items: ['Team & Rollen', 'Co-Founder', 'Resilienz'],
    },
  },
} as const

// Beide Reiter

// TODO: Beträge vor dem Livegang prüfen, EXIST passt sie gelegentlich an.
export const funding = {
  title: 'Über EXIST finanzierbar.',
  text: 'Im EXIST-Gründungsstipendium hat euer Team ein Coaching-Budget von 5.000 €, im Forschungstransfer sind es 10.000 €. Abgerechnet wird über eure Hochschule. Welche Themen darüber laufen, kläre ich vorab mit eurem Gründungsnetzwerk. Ohne EXIST geht es auch, dann mit festem Preis nach dem Kennenlernen.',
  facts: [
    { label: 'Format', value: 'Als Team, bei Bedarf 1:1' },
    { label: 'Umfang', value: 'Bis zu 5 Coaching-Tage' },
    { label: 'Ort', value: 'Online & vor Ort' },
    {
      label: 'Finanzierung',
      value: 'EXIST-Budget über eure Hochschule oder fester Preis',
    },
  ],
}

const confidential = {
  question: 'Ist das vertraulich?',
  answer:
    'Ja. Die Hochschule bekommt nur, was sie für die Abrechnung braucht. Was ihr im Coaching besprecht, bleibt bei uns.',
}

export const faq: {
  title: string
  items: Record<GruendungsTab, { question: string; answer: string }[]>
} = {
  title: 'Häufige Fragen',
  items: {
    team: [
      {
        question: 'Zahlt EXIST das Coaching?',
        answer:
          'Das Gründungsstipendium hat ein Coaching-Budget von 5.000 € pro Team, der Forschungstransfer 10.000 €. Was davon für welches Thema genutzt werden kann, entscheidet euer Gründungsnetzwerk. Ich kläre das vorab mit euch.',
      },
      {
        question: 'Wir haben kein EXIST. Geht das trotzdem?',
        answer:
          'Ja. Dann bekommt ihr nach dem Kennenlernen einen festen Preis.',
      },
      {
        question: 'Ist das Gründungsberatung oder Coaching?',
        answer:
          'Beides. Beim Geschäftsmodell und beim Markteintritt bringe ich Erfahrung und gute Fragen mit. Bei Team und Resilienz arbeite ich als Coach. Ich sage euch jeweils, in welcher Rolle ich gerade spreche.',
      },
      {
        question: 'Stellst du die Tragfähigkeitsbescheinigung aus?',
        answer:
          'Nein, die stellt eine fachkundige Stelle aus, zum Beispiel die IHK. Ich bereite euch darauf vor.',
      },
      confidential,
    ],
    uni: [
      {
        question: 'Welche Themen deckst du ab?',
        answer:
          'Geschäftsmodell, Markteintritt und Finanzierung auf strategischer Ebene, dazu Team, Rollen und Resilienz.',
      },
      {
        question: 'Wie läuft die Abrechnung?',
        answer:
          'Über die EXIST-Pauschale des Teams, abgerechnet über eure Hochschule. Was darüber laufen kann, stimmen wir vorab ab.',
      },
      {
        question: 'Gibt es Workshops für mehrere Teams?',
        answer:
          'Ja, zum Beispiel ein halber Tag Resilienz oder ein Co-Founder-Check-up für 5 bis 10 Teams.',
      },
      confidential,
    ],
  },
}

export const contact: Record<
  GruendungsTab,
  { title: string; text: string; cta: string; href: Route }
> = {
  team: {
    title: 'Früh dran? Dann lasst uns reden.',
    text: 'Im kostenlosen Kennenlernen (30 Min., online) schauen wir, wo ihr steht und was euch jetzt weiterbringt.',
    cta: 'Kostenloses Kennenlernen',
    href: '/kontakt?thema=gruendungscoaching' as Route,
  },
  uni: {
    title: 'Lasst uns über eine Zusammenarbeit sprechen.',
    text: 'Schreibt mir kurz, welche Teams oder Programme ihr begleitet. Ich melde mich innerhalb von zwei Werktagen.',
    cta: 'Zusammenarbeit anfragen',
    href: '/kontakt?thema=gruendungscoaching&fuer=beratung' as Route,
  },
}
