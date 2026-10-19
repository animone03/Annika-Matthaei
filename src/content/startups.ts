import type { Route } from 'next'

// Texte der Seite /startups (Übergabe 11a im Stil von 10b).

export const hero = {
  eyebrow: 'Coaching für Startups & Founder',
  title: 'Mentale Fitness für Startups.',
  intro:
    'Euer Startup wächst, der Druck auch. Ich arbeite mit euch daran, dass ihr unter Druck klar bleibt, eure Energie haltet und gemeinsam gute Entscheidungen trefft.',
  cta: 'Kostenloses Kennenlernen',
  note: '30 Min. · online · unverbindlich',
}

export const quotes = {
  title: 'Vielleicht kennst du das.',
  items: [
    'Ich arbeite mehr als je zuvor, aber nicht klarer.',
    'Mit meinem Co-Founder rede ich über alles, nur nicht darüber, wie es uns geht.',
    'Unser Streit über Produkt oder Pricing dreht sich im Kreis.',
    'Mein Team spürt meinen Stress, auch wenn ich nichts sage.',
    'Über meine Sorgen spreche ich zu Hause, nicht im Board.',
  ],
  bridge:
    'Mentale Fitness lässt sich trainieren, als Founder und als Team. Genau da setze ich an.',
}

export const stat = {
  value: '92 %',
  claim: 'Investments scheitern am Team, nicht an der Idee.',
  text: 'der befragten VCs nennen das Team als Grund für gescheiterte Investments. Wie ihr oben zusammenarbeitet und mit Druck umgeht, entscheidet mit über euren Erfolg.',
  source: 'Gompers et al. (2020), 885 VC-Investoren',
}

// Themen sind der Inhalt, Angebote das Format. Gesundheit & Resilienz
// gehört zu allen drei Angeboten. Ziel der Themenkarten auf der Startseite.
// TODO: Bildrechte und Originale der Themenbilder vor dem Livegang klären.
export const themes: {
  title: string
  items: {
    key: 'founder' | 'leadership' | 'resilienz'
    title: string
    claim: string
    points: string[]
    focus: string
  }[]
} = {
  title: 'Drei Themen, die über euer Wachstum entscheiden.',
  items: [
    {
      key: 'founder',
      title: 'Founder Relationship',
      claim: 'Euer Startup ist nur so stark wie die Beziehung an der Spitze.',
      points: [
        'Rollen und Entscheidungsrechte klären',
        'Sache und Beziehung auseinanderhalten',
        'Erwartungen und Commitment abgleichen',
        'Schwierige Gespräche führen',
        'Konflikte lösen, bevor sie eskalieren',
      ],
      focus: 'Schwerpunkt in Founders in Sync',
    },
    {
      key: 'leadership',
      title: 'Leadership & Team',
      claim: 'Vom Founder zum Leader, wenn Flurfunk nicht mehr reicht.',
      points: [
        'Vom Macher zur Führungskraft',
        'Eine Mission und Prioritäten, die alle kennen',
        'Klare Rollen im wachsenden Team',
        'Feedbackkultur, bevor ihr 20 seid',
        'Psychologische Sicherheit mit klarer Verantwortung',
      ],
      focus: 'Schwerpunkt in Lead with Clarity',
    },
    {
      key: 'resilienz',
      title: 'Gesundheit & Resilienz',
      claim: 'How to optimize your bounce back rate.',
      points: [
        'Energy Burn Rate statt Dauer-Hustle',
        'Kein Single Point of Failure sein',
        'Das Nervensystem regulieren: Atem, Bewegung, kurze Resets',
        'Ein Frühwarnsystem für Burnout',
        'Sparring statt Alleinkämpfen',
      ],
      focus: 'In allen drei Angeboten',
    },
  ],
}

export const offers: {
  title: string
  items: {
    tone: 'sand' | 'coal' | 'stone'
    label: string
    question: string
    tags: string[]
    title: string
    text: string
    format: string
    href: Route
  }[]
} = {
  title: 'Welches Angebot passt?',
  items: [
    {
      tone: 'sand',
      label: '01 · Für dich',
      question: 'Wer sortiert mit dir, wenn alles gleichzeitig brennt?',
      tags: ['Führung', 'Co-Founder', 'Energie', 'Entscheidungen'],
      title: 'Founder 1:1',
      text: 'Dein Sparring als Founder: für deine Rolle, deine Beziehungen und deine Energie.',
      format: 'Über 3–4 Monate · Für dich',
      // Bis die Angebotsseiten neu gestaltet sind: Kontakt mit Vorauswahl
      href: '/kontakt?thema=startup-coaching' as Route,
    },
    {
      tone: 'coal',
      label: '02 · Für euch als Co-Founder',
      question:
        'Wie kommen wir als Co-Founder wieder in einen gemeinsamen Takt?',
      tags: ['Rollen', 'Entscheidungen', 'Sache & Beziehung'],
      title: 'Founders in Sync',
      text: 'Sache und Beziehung klären. Wieder gemeinsam Tempo machen.',
      format: 'In wenigen Wochen · Als Founder-Team',
      href: '/kontakt?thema=co-founder' as Route,
    },
    {
      tone: 'stone',
      label: '03 · Für euer Leadership-Team',
      question: 'Wie führen wir als wachsendes Team klar und gemeinsam?',
      tags: ['Prioritäten', 'Rollen', 'Mentale Fitness im Team'],
      title: 'Lead with Clarity',
      text: 'Klare Prioritäten, klare Rollen und ein Team, das auch unter Druck gut führt.',
      format: 'Workshop · Auf euch zugeschnitten',
      href: '/kontakt?thema=leadership' as Route,
    },
  ],
}

export const journey = {
  title: 'Von der Gründung bis zum ersten Leadership-Team.',
  stages: [
    {
      label: 'Etappe 1',
      title: 'Gründung & Pre-Seed',
      text: 'Idee, Team, erste Kund:innen. Alles gleichzeitig.',
      friction: 'halb klaren Rollen und unausgesprochenen Erwartungen.',
      offers: ['Gründungscoaching', 'Founders in Sync', 'Founder 1:1'],
    },
    {
      label: 'Etappe 2',
      title: 'Seed',
      text: 'Erste Hires, Produkt im Markt, das Tempo steigt.',
      friction: 'Alles läuft über die Founder, die Energie sinkt.',
      offers: ['Founder 1:1', 'Founders in Sync'],
    },
    {
      label: 'Etappe 3',
      title: 'Series A & Wachstum',
      text: 'Das Team wächst über 20, 50 Leute, die ersten Führungskräfte kommen.',
      friction: 'Flurfunk reicht nicht mehr, Prioritäten verschwimmen.',
      offers: ['Lead with Clarity', 'Founder 1:1'],
    },
  ],
  exist: {
    title: 'Früh dran? Gründungscoaching, auch über EXIST.',
    text: 'Geschäftsmodell, erste Kund:innen und euer Team in einem Coaching. Im EXIST-Gründungsstipendium oder Forschungstransfer kann es über euer Coaching-Budget laufen. Was genau, kläre ich vorab mit eurem Gründungsnetzwerk.',
    cta: 'Zum Gründungscoaching',
    href: '/coaching/startups/gruendungscoaching' as Route,
  },
}

export const changes = {
  title: 'Was sich verändert',
  items: [
    'Ihr habt wieder Energie, und euer Team merkt es.',
    'Kein Chaos mehr im Kopf: Ihr wisst, was jetzt wichtig ist.',
    'Ihr sprecht aus, was zwischen euch steht, und klärt es.',
    'Ihr entscheidet schneller, weil klar ist, wer was entscheidet.',
    'Gut auf euch zu achten wird zur Stärke, nicht zur Schwäche.',
  ],
}

export const fit = {
  title: 'Ist das für euch?',
  yes: {
    title: 'Ja, wenn …',
    items: [
      'ihr ein Startup aufbaut und wachsen wollt, ohne euch zu verlieren.',
      'ihr merkt, dass oben etwas hakt.',
      'ihr lieber jetzt investiert, als später zu reparieren.',
    ],
  },
  no: {
    title: 'Eher nicht, wenn …',
    items: [
      'du gerade in einer akuten Krise steckst, etwa mit Burnout oder Depression. Dann ist Therapie der richtige Weg, und ich helfe dir, passende Unterstützung zu finden.',
      'ihr eine klassische Unternehmensberatung ohne Blick aufs Team sucht.',
    ],
  },
}

export const why = {
  label: 'Warum ich',
  title: 'Die Wachstumsphase kenne ich von innen.',
  facts: [
    { value: '13', text: 'Jahre Konzern, Mittelstand & Startup' },
    { value: '9', text: 'Jahre selbst in Führung' },
    { value: '2', text: 'Startups von innen erlebt' },
  ],
  text: 'Ich habe in zwei Startups mitgearbeitet und gesehen, wie Spannungen im Gründerteam eine ganze Organisation ausbremsen. Heute verbinde ich als systemischer und psychologischer Business Coach diese Erfahrung mit dem, was Menschen unter Druck wirklich hilft: praxisnah, ohne Theorie-Overload, mit Werkzeugen, die ihr am nächsten Tag nutzen könnt.',
}

export const faq = {
  title: 'Häufige Fragen',
  items: [
    {
      question: 'Ist das Therapie?',
      answer:
        'Nein. Coaching für Leistung und Zusammenarbeit. Bei akuten Krisen empfehle ich passende Therapeut:innen.',
    },
    {
      question: 'Wie viel Zeit kostet das?',
      answer:
        'Kompakte Formate, die in euren Alltag passen. Den Umfang stimmen wir im Kennenlernen ab.',
    },
    { question: 'Online oder vor Ort?', answer: 'Beides.' },
    {
      question: 'Ist das vertraulich?',
      answer: 'Ja, auch gegenüber Investor:innen und Team.',
    },
    {
      question: 'Wirkt Coaching überhaupt?',
      answer:
        'Ja. Meta-Analysen kontrollierter Studien zeigen messbare Effekte.',
    },
    {
      question: 'Wer zahlt?',
      answer:
        'Meist das Startup. In der Frühphase kann euer EXIST-Budget für Coaching passen, manchmal unterstützt euer VC.',
    },
    { question: 'Auf Deutsch oder Englisch?', answer: 'Beides.' },
  ],
}

export const contact = {
  title: 'Bereit für großartige Teams?',
  text: 'Im kostenlosen Kennenlernen (30 Min., online) schauen wir, wo ihr steht und was euch jetzt weiterbringt.',
  cta: 'Kennenlernen buchen',
}
