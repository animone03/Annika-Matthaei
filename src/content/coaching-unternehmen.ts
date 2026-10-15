// Texte der Seite /coaching/unternehmen. Alles sind Entwürfe, die Annika noch
// freigibt. Wo mobil eine kürzere Fassung steht, liegt sie in `mobile`.

export const hero = {
  label: 'Coaching für Unternehmen',
  title: 'Gute Teams entstehen nicht zufällig.',
  intro:
    'Ich begleite Teams, Abteilungen und Führungskräfte dabei, besser zusammenzuarbeiten. Systemisch, agil und mit Blick auf Stärken. In München und online.',
  mobileIntro:
    'Ich begleite Teams, Abteilungen und Führungskräfte dabei, besser zusammenzuarbeiten. Systemisch, agil und mit Blick auf Stärken.',
}

export const problems = {
  label: 'Kommt euch das bekannt vor?',
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

export const belief = {
  label: 'Meine Überzeugung',
  text: 'Wie wir zusammenarbeiten, entscheidet mit über unseren Erfolg. Und bekommt trotzdem viel zu wenig Aufmerksamkeit.',
}

export const approach = {
  label: 'So arbeiten wir',
  title: 'Kein Programm von der Stange.',
  text: 'Jedes Team ist anders. Deshalb stellen wir die Begleitung so zusammen, wie sie zu euch passt: für einzelne Führungskräfte, ein Team oder einen ganzen Bereich.',
  steps: [
    {
      title: 'Klären',
      text: 'Gemeinsam mit euch und HR: Wo steht ihr, was soll sich verändern, woran merkt ihr es?',
      tone: 'dark',
    },
    {
      title: 'Gestalten',
      text: 'Ich stelle die passenden Bausteine zusammen. Umfang und Budget stimmen wir offen ab.',
      tone: 'taupe',
    },
    {
      title: 'Begleiten',
      text: 'Wir setzen um, schauen regelmäßig auf die Wirkung und passen an, wo es nötig ist.',
      tone: 'mist',
    },
  ],
  modulesLabel: 'Mögliche Bausteine',
  modules: [
    { label: 'Leadership Coaching 1:1' },
    { label: 'Team-Workshops' },
    {
      label: 'Teamentwicklung über mehrere Monate',
      mobile: 'Teamentwicklung',
    },
    { label: 'Training & Weiterbildung' },
    { label: 'Kommunikation' },
    { label: 'Projektmanagement' },
  ],
} as const

export const hr = {
  label: 'Für HR & People and Culture',
  title: 'Ihr sucht Begleitung für ein Team oder eine Führungskraft?',
  text: 'Ich stimme Ziele, Ablauf und Rahmen mit euch ab und halte euch auf dem Laufenden. So wisst ihr jederzeit, was passiert und was es bringt.',
  mobileText:
    'Ich stimme Ziele, Ablauf und Rahmen mit euch ab und halte euch auf dem Laufenden.',
  points: [
    'Auftragsklärung mit euch und der Führungskraft',
    'Klare Ziele und regelmäßige Rückmeldung',
    'Format, Umfang und Budget passend zu euch',
    'Angebot und Unterlagen für den Einkauf',
  ],
}

export const why = {
  label: 'Warum ich',
  title: 'Ich kenne Führung aus der Praxis.',
  facts: [
    { value: '13', text: 'Jahre Konzern, Mittelstand & Startup' },
    { value: '9', text: 'Jahre selbst in Führung' },
    // TODO: Fakt von Annika bestätigen lassen.
    { value: '1', text: 'Abteilung von Grund auf aufgebaut' },
  ],
  text: 'Ich habe selbst Teams geführt und eine Abteilung aufgebaut. Als systemischer & psychologischer Business Coach verbinde ich diese Erfahrung mit einem klaren Blick darauf, was Teams wirklich weiterbringt.',
  // Mobil ersetzt dieser Absatz Fakten und Text.
  mobileText:
    '13 Jahre Konzern, Mittelstand und Startup, 9 davon selbst in Führung. Als systemischer & psychologischer Business Coach verbinde ich diese Erfahrung mit einem klaren Blick darauf, was Teams weiterbringt.',
}

export const cta = {
  title: 'Lasst uns gemeinsam wachsen.',
  text: 'Im kostenlosen Kennenlern-Call klären wir, wo ihr steht und welches Format zu euch passt.',
  mobileText:
    'Im kostenlosen Kennenlern-Call klären wir, welches Format zu euch passt.',
  button: 'Kennenlern-Call buchen',
}
