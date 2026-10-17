import type { Route } from 'next'

// Texte der Startseite (Übergabe 10b, Inhaltskonzept v3 vom 17.10.2026).

export const hero = {
  eyebrow: 'Mentale Fitness für Startups & High-Performing Teams',
  // Zwei Zeilen: „FIT FOR“ / „GROWTH.“
  title: ['Fit for', 'growth.'],
  // Feste Zeilenumbrüche auf dem Desktop
  claim: [
    'Startups sind Leistungssport.',
    'Wie im Sport entscheidet der Kopf,',
    'wie weit du kommst.',
  ],
  cta: 'Kostenloses Kennenlernen',
}

export const facts = [
  {
    value: 'Zertifiziert',
    text: 'Systemischer & psychologischer Business Coach',
  },
  { value: '2 Startups', text: 'von innen erlebt' },
  {
    value: 'Erfahrung',
    text: '13 Jahre im Konzern, Mittelstand & Startup gearbeitet, davon 9 Jahre in Führungspositionen',
  },
  { value: 'Vertraulich', text: 'auch gegenüber Investor:innen' },
]

// Die drei Themen für Startups, ausführlich auf /startups#themen.
// TODO: Bildrechte und Originale der Themenbilder vor dem Livegang klären.
export const themes: {
  title: string
  href: Route
  more: string
  items: {
    key: 'founder' | 'leadership' | 'resilienz'
    title: string
    lead: string
    question: string
    tags: string[]
  }[]
} = {
  title: 'Wachstum beginnt bei dir.',
  href: '/startups#themen',
  more: 'Mehr erfahren',
  items: [
    {
      key: 'founder',
      title: 'Founder Relationship',
      lead: 'Euer Startup ist nur so stark wie die Beziehung an der Spitze.',
      question:
        '„Wie kommen wir als Co-Founder wieder in einen gemeinsamen Takt?“',
      tags: ['Rollen', 'Entscheidungen', 'Konfliktklärung', 'Vertrauen'],
    },
    {
      key: 'leadership',
      title: 'Leadership & Team',
      lead: 'Vom Founder zum Leader, wenn Flurfunk nicht mehr reicht.',
      question: '„Wie führen wir als wachsendes Team klar und gemeinsam?“',
      tags: ['Teamvision', 'Feedback', 'Psychologische Sicherheit', 'Rollen'],
    },
    {
      key: 'resilienz',
      title: 'Gesundheit & Resilienz',
      lead: 'How to optimize your bounce back rate.',
      question: '„Wie bleibe ich unter Druck klar und behalte meine Energie?“',
      tags: ['Energie', 'Antreiber', 'Regulation', 'Erholung'],
    },
  ],
}

// TODO: Position des Unternehmens-Eingangs ist noch offen (Vorschlag: als
// schmaler Streifen unter die Themenkarten).
export const methods: {
  title: string
  lead: string
  text: string
  items: string[]
  cta: string
  company: { label: string; text: string; cta: string; href: Route }
} = {
  title: 'Methoden',
  lead: 'Fundierte Psychologie trifft Business-Praxis.',
  text: 'Systemisch, agil und mit positiver Psychologie. Ich wähle aus, was zu euch und eurer Situation passt.',
  items: [
    'Systemisches Coaching',
    'Positive Psychologie & Stärken',
    'Gewaltfreie Kommunikation & aktives Zuhören',
    'Feedback & schwierige Gespräche',
    'Konfliktmoderation & Mediation',
    'Psychologische Sicherheit',
    'Teamentwicklung & Teamrollen',
    'Werte- & Sinnarbeit',
    'Stress- & Resilienztraining',
    'Antreiber & Glaubenssätze',
    'Atem, Bewegung & Regulation',
    'Agile Methoden & Selbstorganisation',
  ],
  cta: 'Loslegen und wachsen',
  company: {
    label: 'Ihr seid ein Unternehmen?',
    text: 'Leadership sowie Gesundheit & Resilienz für Teams und Führungskräfte in Mittelstand und Konzern.',
    cta: 'Coaching für Unternehmen',
    href: '/coaching/unternehmen',
  },
}

// TODO: Texte der Schritte muss Annika noch bestätigen.
export const ablauf = {
  title: 'So läuft es ab',
  cta: 'Kostenloses Kennenlernen',
  tabs: [
    {
      id: 'team',
      label: 'Für euch · Co-Founder & Teams',
      steps: [
        {
          title: 'Kennenlernen',
          text: 'Im kostenlosen Gespräch (30 Min., online) klären wir, woran ihr gerade arbeitet und was ihr braucht.',
        },
        {
          title: 'Auftrag & Ziele',
          text: 'Gemeinsam legen wir Themen und Ziele fest, abgestimmt auf eure Situation.',
        },
        {
          title: 'Workshops & Sessions',
          text: 'In zugeschnittenen Formaten arbeitet ihr als Co-Founder oder Leadership-Team an euren Themen.',
        },
        {
          title: 'Transfer in den Alltag',
          text: 'Zwischen den Terminen setzt ihr Vereinbarungen und Tools in eurem Startup-Alltag um.',
        },
        {
          title: 'Retrospektive',
          text: 'Zum Abschluss reflektieren wir, was sich verändert hat, und was ihr als Nächstes angeht.',
        },
      ],
    },
    {
      id: 'solo',
      label: 'Für dich · Founder 1:1',
      steps: [
        {
          title: 'Kennenlernen',
          text: 'Im kostenlosen Gespräch (30 Min., online) schauen wir, wo du stehst und ob wir zusammenpassen.',
        },
        {
          title: 'Kick-off & Ziele',
          text: 'Wir klären deine Themen und legen fest, woran du merkst, dass sich etwas verändert.',
        },
        {
          title: 'Sessions',
          text: 'Über 3–4 Monate arbeiten wir alle 2–3 Wochen 90 Minuten an dem, was dich gerade fordert.',
        },
        {
          title: 'Transfer in den Alltag',
          text: 'Zwischen den Sessions probierst du Neues aus. Wir schauen gemeinsam, was wirkt.',
        },
        {
          title: 'Abschluss & Ausblick',
          text: 'Wir blicken zurück, sichern, was du gelernt hast, und klären die nächsten Schritte.',
        },
      ],
    },
  ],
}

export const stats = {
  title: 'Mentale Fitness ist kein Soft Skill.',
  items: [
    {
      value: '92 %',
      claim: 'Investments scheitern am Team, nicht an der Idee.',
      text: 'der befragten VCs nennen das Team als Grund für gescheiterte Investments.',
      source: 'Gompers et al. (2020), 885 VC-Investoren',
    },
    {
      // DSM 2025: 24,4 % mittelmäßig, 7,9 % schlecht, zusammen 32,3 %.
      // TODO: Kernaussage offen. Genauer wäre „Jeder dritte Founder kämpft
      // mit der mentalen Gesundheit.“
      value: '1 von 3',
      claim: 'Founder sind mental am Limit.',
      text: 'Foundern in Deutschland bewertet die eigene mentale Gesundheit nur als mittelmäßig oder schlecht.',
      source: 'Deutscher Startup Monitor 2025',
    },
  ],
}

export const contact = {
  title: 'Was steht bei euch gerade an?',
  text: 'Im kostenlosen Kennenlernen (30 Min., online) klären wir, was euch weiterbringt.',
  cta: 'Gespräch vereinbaren',
}
