import type { Route } from 'next'

// Texte der Startseite (Übergabe final, ehem. 13d, Inhaltskonzept v3 vom
// 17.10.2026).

export const hero = {
  eyebrow: 'Mentale Fitness für Startups & High-Performing Teams',
  // Zwei Zeilen: „FIT FOR“ / „GROWTH.“
  title: ['Fit for', 'growth.'],
  cta: 'Kostenloses Kennenlernen',
  note: '30 Min. · online · unverbindlich',
}

export const facts = [
  {
    value: 'Zertifiziert',
    text: 'Systemischer & psychologischer Business Coach',
  },
  {
    value: 'Erfahrung',
    text: '13 Jahre Konzern, Mittelstand & Startup, davon 9 in Führung',
  },
  {
    value: 'Ergebnisorientiert',
    text: 'Klare Ziele, spürbare Fortschritte, Werkzeuge für den Alltag',
  },
  {
    value: 'Founder-Perspektive',
    text: 'Zwei Startups von innen erlebt, Druck an der Spitze kenne ich',
  },
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

// Eingang für Unternehmen, als Streifen unter den Themenkarten
export const company: {
  label: string
  text: string
  cta: string
  href: Route
} = {
  label: 'Ihr seid ein Unternehmen?',
  text: 'Leadership sowie Gesundheit & Resilienz für Teams und Führungskräfte in Mittelstand und Konzern.',
  cta: 'Coaching für Unternehmen',
  href: '/coaching/unternehmen',
}

export const methods = {
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
  // Mobil: die 12 Methoden als Karussell mit drei Feldern
  groups: [
    {
      number: '01',
      title: 'Kommunikation & Konflikt',
      items: [
        'Systemisches Coaching',
        'Gewaltfreie Kommunikation & aktives Zuhören',
        'Feedback & schwierige Gespräche',
        'Konfliktmoderation & Mediation',
      ],
    },
    {
      number: '02',
      title: 'Team & Zusammenarbeit',
      items: [
        'Psychologische Sicherheit',
        'Teamentwicklung & Teamrollen',
        'Werte- & Sinnarbeit',
        'Agile Methoden & Selbstorganisation',
      ],
    },
    {
      number: '03',
      title: 'Psychologie & Resilienz',
      items: [
        'Positive Psychologie & Stärken',
        'Stress- & Resilienztraining',
        'Antreiber & Glaubenssätze',
        'Atem, Bewegung & Regulation',
      ],
    },
  ],
  swipeHint: 'Wischen · 3 Felder →',
}

// Streifen zwischen Methoden und „So läuft es ab“
export const performance: { text: string; cta: string; href: Route } = {
  text: 'Startups sind Leistungssport. Wie im Sport entscheidet der Kopf, wie weit du kommst.',
  cta: 'Mehr über mich',
  href: '/ueber-mich',
}

// TODO: Texte der Schritte muss Annika noch bestätigen.
export const ablauf = {
  title: 'So läuft es ab',
  cta: 'Kostenloses Kennenlernen',
  tabs: [
    {
      id: 'team',
      label: 'Für euch · Co-Founder & Teams',
      // Mobil im Umschalter
      shortLabel: 'Für euch',
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
      shortLabel: 'Für dich',
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
      value: '1 von 3',
      claim: 'Jeder dritte Founder kämpft mit der mentalen Gesundheit.',
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
