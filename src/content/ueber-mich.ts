// Texte der Seite /ueber-mich (Übergabe 14d im Stil von 10b).

export const hero = {
  eyebrow: 'Systemischer & psychologischer Business Coach',
  // Zwei Zeilen: „ICH BIN“ / „ANNIKA.“
  title: ['Ich bin', 'Annika.'],
}

export const intro = {
  lead: 'Ich liebe es, wenn Menschen über sich hinauswachsen, Teams in ihren Flow finden und aus einer mutigen Idee etwas Reales wird.',
  text: 'Wenn ihr gemeinsam etwas schafft, das vorher unmöglich schien. Genau dabei möchte ich euch begleiten. Ich bringe viel Energie, Kreativität und Empathie mit. Ich denke in Möglichkeiten, frage nach und freue mich, wenn eure Projekte erfolgreich umgesetzt werden.',
  facts: [
    { value: '13', text: 'Jahre in Konzern, Mittelstand & Startup' },
    { value: '9', text: 'Jahre Führungsverantwortung' },
    // TODO: Laut Inhaltskonzept v3 noch nicht belegt, Annika möchte den Fakt
    // behalten. Vor dem Livegang noch einmal bestätigen lassen.
    { value: 'EXIST', text: 'Coach für Gründungsteams' },
  ],
}

export const stance = {
  title: 'Wie ich arbeite',
  items: [
    {
      tone: 'sand',
      title: 'Systemisch',
      text: 'Ich schaue auf das ganze System: Menschen, Beziehungen und Dynamiken.',
    },
    {
      tone: 'coal',
      title: 'Agil',
      text: 'In kleinen Schritten vorankommen, ausprobieren, lernen, anpassen.',
    },
    {
      tone: 'stone',
      title: 'Positive Psychologie',
      text: 'An Stärken ansetzen, nicht nur an Problemen.',
    },
  ],
} as const

export const drive = {
  label: 'Was mich antreibt',
  statement: 'Train your brain like you train your body.',
  // TODO: Satz zum Halbmarathon von Annika bestätigen lassen.
  text: 'Ich laufe Halbmarathon. Dabei habe ich gelernt: Ab einem gewissen Punkt laufen nicht mehr die Beine, sondern der Kopf. Mit Gründen und Führen ist es genauso. Mentale Stärke lässt sich trainieren.',
}

export const skills = {
  title: 'Kompetenzen',
  items: [
    'Systemisches Coaching',
    'Mentale Fitness & Resilienz',
    'Training & Weiterbildung',
    'Moderation & Keynotes',
    '(Agiles) Projektmanagement',
    'Change & Veränderungsprozesse',
    'Go-to-Market',
    'Kompetenter Umgang mit AI',
  ],
}

export const career = {
  title: 'Werdegang',
  stations: {
    title: 'Stationen',
    items: [
      {
        period: 'Seit 2026',
        title: 'Systemisches Coaching',
        detail: 'Selbstständig',
      },
      {
        period: 'Seit 2025',
        title: 'Marketing-Beratung & Markenentwicklung',
        detail: 'Selbstständig',
      },
      {
        period: '2022 – 2026',
        title: 'Ehrmann Wohn- und Einrichtungs GmbH',
        detail: 'Abteilungsleiterin · Aufbau der Abteilung Nachhaltigkeit',
      },
      {
        period: '2019 – 2021',
        title: 'Performance One AG',
        detail: 'Beraterin Digitales Marketing',
      },
      {
        period: '2013 – 2018',
        title: 'Peek & Cloppenburg',
        detail:
          'Stellv. Abteilungsleiterin & Abteilungsleiterin · Wien / Düsseldorf',
      },
    ],
  },
  // `short`: gekürzte Fassung für Mobil
  education: {
    title: 'Ausbildung',
    items: [
      {
        title: 'Systemischer & psychologischer Business Coach',
        detail: 'DACTE',
        short: {
          title: 'Systemischer & psychologischer Business Coach',
          detail: 'DACTE',
        },
      },
      {
        title: 'Sustainability Management Expert',
        detail:
          'Leuphana Universität Lüneburg · MBA-Programm Sustainability Management',
        short: {
          title: 'Sustainability Management Expert',
          detail: 'Leuphana Universität Lüneburg · MBA-Programm',
        },
      },
      {
        title: 'Master of Arts Kommunikationswissenschaft',
        detail: 'FOM Hochschule für Ökonomie & Management',
        short: {
          title: 'M.A. Kommunikationswissenschaft',
          detail: 'FOM Hochschule',
        },
      },
      {
        title: 'Bachelor of Arts Business Administration',
        detail: 'FOM Hochschule für Ökonomie & Management',
        short: {
          title: 'B.A. Business Administration',
          detail: 'FOM Hochschule',
        },
      },
    ],
  },
}

export const contact = {
  title: 'Let’s grow!',
  text: 'Im kostenlosen Kennenlernen (30 Min., online) finden wir heraus, ob wir zusammenpassen.',
  cta: 'Kostenloses Kennenlernen',
}
