import type { Route } from 'next'

// Texte der Seite /startups (Übergabe v3, Option 4a).

export const hero = {
  eyebrow: 'Coaching für Startups & Founder',
  title: 'Mentale Fitness für Founder-Teams.',
  intro:
    'Euer Startup wächst, der Druck auch. Ich arbeite mit euch daran, dass ihr unter Druck klar bleibt, eure Energie haltet und gemeinsam gute Entscheidungen trefft.',
  cta: 'Kostenloses Kennenlernen',
  note: '30 Min. · online · unverbindlich',
}

export const quotes = {
  label: 'Vielleicht kennst du das',
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
  text: 'der befragten VCs nennen das Team als Grund für gescheiterte Investments.',
  source: 'Gompers et al. (2020), Befragung von 885 VC-Investoren',
  note: 'Wie ihr oben zusammenarbeitet und mit Druck umgeht, entscheidet mit über euren Erfolg.',
}

export const method = {
  label: 'Wie ich arbeite',
  title: 'Mentale Fitness in vier Bausteinen.',
  text: 'Entstanden aus der Coaching-Praxis und dem, was in stressigen Phasen wirklich hilft.',
  steps: [
    {
      letter: 'A',
      title: 'Awareness',
      text: 'Verstehen, was dich unter Druck setzt. Stress lesen statt nur aushalten.',
    },
    {
      letter: 'E',
      title: 'Energy',
      text: 'Was gibt dir Kraft, was zieht sie ab, wann brauchst du Pausen?',
    },
    {
      letter: 'R',
      title: 'Recovery',
      text: 'Runterfahren können, mit Atem, Bewegung und kurzen Resets.',
    },
    {
      letter: 'F',
      title: 'Focus',
      text: 'Klar entscheiden, allein und gemeinsam: Prioritäten, Rollen, nächste Schritte.',
    },
  ],
}

export const offers: {
  label: string
  title: string
  items: {
    tone: 'light' | 'dark' | 'taupe'
    label: string
    question: string
    tags: string[]
    title: string
    text: string
    format: string
    href: Route
  }[]
} = {
  label: 'So können wir arbeiten',
  title: 'Welches Angebot passt?',
  items: [
    {
      tone: 'light',
      label: '01 · Für dich',
      question: 'Wie bleibe ich unter Druck klar, ohne auszubrennen?',
      tags: ['Energie', 'Regulation', 'Prioritäten', 'Delegieren'],
      title: 'Founder 1:1',
      text: 'Mentale Fitness und klarer Fokus für dich als Founder.',
      format: 'Über 3–4 Monate · Für dich',
      href: '/coaching/startups/founder-1-1',
    },
    {
      tone: 'dark',
      label: '02 · Für euch als Co-Founder',
      question:
        'Wie kommen wir als Co-Founder wieder in einen gemeinsamen Takt?',
      tags: ['Rollen', 'Entscheidungen', 'Sache & Beziehung'],
      title: 'Founders in Sync',
      text: 'Sache und Beziehung klären. Wieder gemeinsam Tempo machen.',
      format: 'In wenigen Wochen · Als Founder-Team',
      href: '/coaching/startups/founders-in-sync',
    },
    {
      tone: 'taupe',
      label: '03 · Für euer Leadership-Team',
      question: 'Wie führen wir als wachsendes Team klar und gemeinsam?',
      tags: ['Prioritäten', 'Rollen', 'Mentale Fitness im Team'],
      title: 'Lead with Clarity',
      text: 'Klare Prioritäten, klare Rollen und ein Team, das auch unter Druck gut führt.',
      format: 'Workshop · Auf euch zugeschnitten',
      href: '/coaching/startups/lead-with-clarity',
    },
  ],
}

export const journey = {
  label: 'Der Weg',
  title: 'Von der Gründung bis zum ersten Leadership-Team.',
  stages: [
    {
      label: 'Etappe 1',
      title: 'Gründung & Pre-Seed',
      text: 'Idee, Team, erste Kund:innen. Alles gleichzeitig.',
      friction: 'halb klaren Rollen, unausgesprochenen Erwartungen.',
      offers: ['Founders in Sync', 'Founder 1:1'],
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
    title: 'Früh dran? Über EXIST finanzierbar.',
    text: 'Im EXIST-Gründungsstipendium, Forschungstransfer oder EXIST Women kann Coaching über euer Budget laufen. Ich kläre das mit euch und eurem Gründungsnetzwerk.',
    cta: 'Ansprechen',
    href: '/kontakt?thema=exist' as Route,
  },
}

export const changes = {
  label: 'Was sich verändert',
  items: [
    'Ihr habt wieder Energie, und euer Team merkt es.',
    'Kein Chaos mehr im Kopf: Ihr wisst, was jetzt wichtig ist.',
    'Ihr sprecht aus, was zwischen euch steht, und klärt es.',
    'Ihr entscheidet schneller, weil klar ist, wer was entscheidet.',
    'Gut auf euch zu achten wird zur Stärke, nicht zur Schwäche.',
  ],
}

export const fit = {
  label: 'Ist das für euch?',
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
  label: 'Häufige Fragen',
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
        'Meist das Startup. In der frühen Phase oft das EXIST-Budget, manchmal unterstützt euer VC.',
    },
    { question: 'Auf Deutsch oder Englisch?', answer: 'Beides.' },
  ],
}

export const contact = {
  title: 'Bereit für großartige Teams?',
  text: 'Im kostenlosen Kennenlernen (30 Min., online) schauen wir, wo ihr steht und was euch jetzt weiterbringt.',
  cta: 'Kennenlernen buchen',
}
