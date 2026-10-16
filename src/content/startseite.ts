import type { Route } from 'next'

// Texte der Startseite (Übergabe v3, Option 3d).

export const hero = {
  eyebrow: 'Mentale Fitness für Startups & Leaders',
  intro:
    'Ich begleite Founder, Co-Founder und Leadership-Teams zu mehr Energie, klaren Köpfen und Entscheidungen, die sitzen.',
  cta: 'Kostenloses Kennenlernen',
}

export const marquee = [
  'Klarer Kopf',
  'Volle Energie',
  'Starkes Team',
  'Founder 1:1',
  'Co-Founder',
  'Leadership-Teams',
]

export const facts = [
  {
    value: 'Zertifiziert',
    text: 'Systemischer & psychologischer Business Coach',
  },
  { value: '2 Startups', text: 'von innen erlebt' },
  { value: '13 / 9', text: 'Jahre Praxis, davon 9 in Führung' },
  { value: 'Vertraulich', text: 'auch gegenüber Investor:innen' },
]

export const growth = {
  title: 'Wachstum beginnt bei dir.',
  items: [
    {
      question: 'Wie bleibe ich unter Druck klar und behalte meine Energie?',
      tags: ['Energiemanagement', 'Resilienz', 'Prioritäten', 'Stärken'],
    },
    {
      question:
        'Wie kommen wir als Co-Founder wieder in einen gemeinsamen Takt?',
      tags: ['Rollen', 'Entscheidungen', 'Konfliktklärung', 'Vertrauen'],
    },
    {
      question: 'Wie führen wir als wachsendes Team klar und gemeinsam?',
      tags: [
        'Operating Principles',
        'Feedbackkultur',
        'Psychologische Sicherheit',
        'Selbstorganisation',
      ],
    },
    {
      question:
        'Wie entwickeln wir Führungskräfte und Teams, die gern bleiben?',
      tags: [
        'Führungsentwicklung',
        'Teamentwicklung',
        'Mental Health',
        'Kulturentwicklung',
      ],
    },
  ],
}

export const audiences: {
  label: string
  items: { title: string; text: string; href: Route }[]
} = {
  label: 'Wen ich begleite',
  items: [
    {
      title: 'Für Founder-Teams, die wachsen.',
      text: 'Founder 1:1 · Founders in Sync · Lead with Clarity',
      href: '/coaching/startups',
    },
    {
      title: 'Für Teams & Führungskräfte',
      text: 'In Mittelstand und Konzern',
      href: '/coaching/unternehmen',
    },
  ],
}

export const method = {
  label: 'Wie ich arbeite',
  title: 'Mentale Fitness lässt sich trainieren.',
  text: 'Vier Bausteine, mit denen ihr unter Druck klar bleibt, eure Energie haltet und gemeinsam gut entscheidet.',
  steps: [
    {
      letter: 'A',
      title: 'Awareness',
      text: 'Verstehen, was euch unter Druck setzt.',
    },
    {
      letter: 'E',
      title: 'Energy',
      text: 'Energie bewusst einsetzen statt verbrennen.',
    },
    {
      letter: 'R',
      title: 'Recovery',
      text: 'Runterfahren können, auch mitten im Sprint.',
    },
    {
      letter: 'F',
      title: 'Focus',
      text: 'Klar entscheiden: Prioritäten, Rollen, nächste Schritte.',
    },
  ],
}

// TODO: Liste muss Annika noch final bestätigen.
export const approaches = {
  label: 'Methoden & Konzepte',
  title: 'Fundierte Psychologie trifft Business-Praxis.',
  text: 'Systemisch, agil und mit positiver Psychologie. Ich wähle aus, was zu euch und eurer Situation passt.',
  items: [
    'Systemisches Coaching',
    'Positive Psychologie & Stärkenorientierung',
    'Psychologische Sicherheit',
    'Werte- & Purpose-Arbeit',
    'Führungsstile & Leadership-Prinzipien',
    'High Performance Teams',
    'Agile Methoden & Selbstorganisation',
    'Feedback & Radical Candor',
    'Konfliktklärung',
    'Kommunikations- & Interaktionsstile',
    'Limiting Beliefs & Reframing',
    'Emotionale Intelligenz',
  ],
  cta: 'Loslegen und wachsen',
}

export const stats = {
  label: 'Warum das zählt',
  items: [
    {
      value: '92 %',
      text: 'der befragten VCs nennen das Team als Grund für gescheiterte Investments.',
      source: 'Gompers et al. (2020), Befragung von 885 VC-Investoren',
    },
    {
      // DSM 2025: 24,4 % mittelmäßig, 7,9 % schlecht, zusammen 32,3 %.
      value: '1 von 3',
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
