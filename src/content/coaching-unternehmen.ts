// Texte der Seite /coaching/unternehmen (Übergabe 11b im Stil von 10b).

export const hero = {
  eyebrow: 'Coaching für Unternehmen',
  title: 'Gute Teams entstehen nicht zufällig.',
  intro:
    'Ich begleite Teams, Abteilungen und Führungskräfte dabei, besser zusammenzuarbeiten und auch unter Druck klar zu bleiben. Mit zwei Schwerpunkten: Leadership sowie Gesundheit & Resilienz.',
  // Mobil nur der erste Satz (Mobile v2)
  introMobile:
    'Ich begleite Teams, Abteilungen und Führungskräfte dabei, besser zusammenzuarbeiten und auch unter Druck klar zu bleiben.',
  cta: 'Kennenlern-Call buchen',
  note: '30 Min. · online · unverbindlich',
}

export const problems = {
  title: 'Kommt euch das bekannt vor?',
  // Mobil unter dem Karussell
  swipeHint: 'Wischen →',
  items: [
    {
      title: 'Ihr arbeitet nebeneinander statt miteinander.',
      text: 'Jede:r macht gute Arbeit, aber als Team kommt weniger an, als möglich wäre.',
    },
    {
      title: 'Veränderung kostet zu viel Energie.',
      text: 'Neue Strukturen, neue Leute, neue Ziele. Und das Team kommt nicht hinterher.',
    },
    {
      title: 'Führung zwischen allen Stühlen.',
      text: 'Führungskräfte stehen zwischen Erwartungen von oben und Bedürfnissen im Team.',
    },
  ],
}

// TODO: Eigene Unternehmens-Motive, bis dahin die Startup-Themenbilder.
export const focus: {
  title: string
  items: {
    key: 'leadership' | 'resilienz'
    title: string
    claim: string
    points: string[]
  }[]
} = {
  title: 'Meine Schwerpunkte',
  items: [
    {
      key: 'leadership',
      title: 'Leadership',
      claim: 'Wer sich selbst gut führt, führt auch sein Team gut.',
      points: [
        'Wirksame Selbstführung',
        'Wertebasierte Führung und eigener Führungsstil',
        'Klare Kommunikation',
        'Teamentwicklung, Motivation und Teamvision',
        'Psychologische Sicherheit',
        'Kompetent Feedback geben',
        'Souveräne Konfliktmoderation',
      ],
    },
    {
      key: 'resilienz',
      title: 'Gesund führen & Resilienz',
      claim:
        'Leistung braucht Erholung, bei jeder und jedem Einzelnen und im Team.',
      points: [
        'Stress und Belastung im Team früh erkennen',
        'Burnout und Boreout vorbeugen',
        'Führungskräfte als Vorbild und Puffer',
        'Resilienz im Team stärken',
        'Veränderung ohne Erschöpfung',
      ],
    },
  ],
}

export const belief = {
  label: 'Meine Überzeugung',
  text: 'Wie wir zusammenarbeiten, entscheidet mit über unseren Erfolg, und bekommt trotzdem viel zu wenig Aufmerksamkeit.',
}

export const approach = {
  title: 'So arbeiten wir',
  text: 'Kein Programm von der Stange. Jedes Team ist anders, deshalb stellen wir die Begleitung so zusammen, wie sie zu euch passt.',
  steps: [
    {
      title: 'Klären',
      text: 'Gemeinsam mit euch und HR: Wo steht ihr, was soll sich verändern, woran merkt ihr es?',
    },
    {
      title: 'Gestalten',
      text: 'Ich stelle die passenden Bausteine zusammen. Umfang und Budget stimmen wir offen ab.',
    },
    {
      title: 'Begleiten',
      text: 'Wir setzen um, schauen regelmäßig auf die Wirkung und passen an, wo es nötig ist.',
    },
  ],
}

export const modules = {
  title: 'Bausteine',
  items: [
    'Leadership Coaching 1:1',
    'Team-Workshops',
    'Teamentwicklung über mehrere Monate',
    'Resilienz-Workshops für Teams',
    'Training & Weiterbildung',
  ],
}

export const hr = {
  title: 'Für HR & People and Culture',
  points: [
    'Auftragsklärung mit euch und der Führungskraft',
    'Klare Ziele und regelmäßige Rückmeldung',
    'Format, Umfang und Budget passend zu euch',
    'Angebot und Unterlagen für den Einkauf',
  ],
}

// TODO: Satz freigeben lassen.
export const why = {
  label: 'Warum ich',
  title: 'Ich kenne Führung aus der Praxis.',
  text: 'Etablierte Teams wollen so agil sein wie Startups. Ich bringe beides mit: Führungserfahrung aus Konzern und Mittelstand und das Wissen, wie junge Teams schnell und gemeinsam vorankommen.',
  facts: [
    { value: '13', text: 'Jahre Konzern, Mittelstand & Startup' },
    { value: '9', text: 'Jahre selbst in Führung' },
    // TODO: Fakt von Annika bestätigen lassen.
    { value: '1', text: 'Abteilung von Grund auf aufgebaut' },
  ],
}

export const cta = {
  title: 'Lasst uns gemeinsam wachsen.',
  text: 'Im kostenlosen Kennenlernen klären wir, wo ihr steht und welches Format zu euch passt.',
  button: 'Kennenlern-Call buchen',
}
