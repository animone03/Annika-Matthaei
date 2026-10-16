// Texte für /impressum und /datenschutz. Abschnitte mit `pending` sind noch
// Platzhalter aus der Übergabe und erscheinen nicht auf der Seite, bis der
// finale Text (z. B. aus eRecht24) eingetragen und `pending` entfernt ist.
// Nach dem Umzug nach München: Anschrift und Aufsichtsbehörde (BayLDA) ändern.

export type LegalLine = string | { text: string; href: string }

export type LegalBlock = {
  title: string
  lines: LegalLine[]
  pending?: boolean
}

export type LegalDocument = {
  title: string
  // Monat und Jahr der letzten Änderung, z. B. „Oktober 2026“.
  updated?: string
  blocks: LegalBlock[]
}

const email = {
  text: 'annika.matthaei@googlemail.com',
  href: 'mailto:annika.matthaei@googlemail.com',
}

export const impressum: LegalDocument = {
  title: 'Impressum',
  blocks: [
    {
      title: 'Angaben gemäß § 5 DDG',
      lines: [
        'Annika Matthaei',
        'Coaching & Marketing',
        'Waldhornstraße 52',
        '68199 Mannheim',
      ],
    },
    {
      title: 'Kontakt',
      lines: [
        { text: 'Telefon: 0172 773 2006', href: 'tel:+491727732006' },
        { text: `E-Mail: ${email.text}`, href: email.href },
      ],
    },
    {
      title: 'Umsatzsteuer',
      lines: [
        'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr. oder Hinweis Kleinunternehmerregelung]',
      ],
      pending: true,
    },
    {
      title: 'Berufsbezeichnung',
      lines: [
        'Systemischer & psychologischer Business Coach',
        'Marketing-Dienstleistungen',
      ],
    },
    {
      title: 'Verantwortlich für den Inhalt',
      lines: ['Annika Matthaei, Anschrift wie oben'],
    },
    {
      title: 'Streitschlichtung',
      lines: ['[Hinweis zur Verbraucherstreitbeilegung laut Generator]'],
      pending: true,
    },
    {
      title: 'Haftung für Inhalte und Links',
      lines: ['[Text laut Generator]'],
      pending: true,
    },
    {
      title: 'Bildnachweise',
      lines: ['Fotos: Manuela Hall'],
    },
  ],
}

export const datenschutz: LegalDocument = {
  title: 'Datenschutz',
  updated: 'Oktober 2026',
  blocks: [
    {
      title: '1. Verantwortliche',
      lines: ['Annika Matthaei, Waldhornstraße 52, 68199 Mannheim', email],
    },
    {
      title: '2. Überblick',
      lines: [
        'Ich verarbeite personenbezogene Daten nur, soweit es für den Betrieb dieser Website und die Beantwortung Ihrer Anfragen nötig ist. Personenbezogene Daten fallen an, wenn Sie die Website aufrufen (technische Zugriffsdaten) und wenn Sie mir über das Kontaktformular oder per E-Mail schreiben.',
        'Diese Website verwendet keine Analyse-Tools, kein Tracking und keine Werbe-Cookies.',
      ],
    },
    {
      title: '3. Hosting',
      lines: [
        'Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf verarbeitet Vercel automatisch technische Zugriffsdaten (Server-Logfiles): IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, zuvor besuchte Seite, Browser und Betriebssystem. Das ist nötig, um die Website auszuliefern und ihre Sicherheit zu gewährleisten.',
        'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der Website.',
        'Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert. Die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der EU-Kommission und ergänzend auf Standardvertragsklauseln.',
        'Die Domain ist bei der IONOS SE (Deutschland) registriert.',
      ],
    },
    {
      title: '4. Kontaktformular und E-Mail',
      lines: [
        'Wenn Sie mir über das Kontaktformular schreiben, verarbeite ich die Angaben, die Sie eintragen: Name, E-Mail-Adresse und Ihre Nachricht sowie, falls angegeben, Unternehmen, Telefonnummer und die ausgewählten Themen. Ich nutze diese Daten ausschließlich, um Ihre Anfrage zu beantworten.',
        'Die Angaben werden über den E-Mail-Dienst Resend (USA) an mein E-Mail-Postfach weitergeleitet und auf der Website nicht gespeichert. Mit Resend besteht ein Vertrag zur Auftragsverarbeitung. Resend ist unter dem EU-US Data Privacy Framework zertifiziert, ergänzend gelten Standardvertragsklauseln.',
        'E-Mails, auch solche, die Sie mir direkt schreiben, empfange ich über Google (Google Ireland Limited, Irland).',
        'Zum Schutz vor Spam enthält das Formular ein unsichtbares Feld und prüft die Zeit, die zum Ausfüllen gebraucht wird. Dabei werden keine zusätzlichen Daten gespeichert.',
        'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage mit einem Vertrag oder dessen Anbahnung zusammenhängt, sonst Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).',
        'Ich lösche Ihre Anfrage, sobald sie erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      ],
    },
    {
      title: '5. Terminbuchung',
      lines: [
        '[Falls ein Buchungstool für den Kennenlern-Call genutzt wird: Anbieter, Daten]',
      ],
      pending: true,
    },
    {
      title: '5. Schriften',
      lines: [
        'Die Schriften dieser Website sind lokal eingebunden. Beim Aufruf wird keine Verbindung zu Servern Dritter wie Google Fonts oder Adobe Fonts aufgebaut.',
      ],
    },
    {
      title: '6. Cookies',
      lines: [
        'Diese Website setzt keine Tracking- oder Marketing-Cookies. Ein technisch notwendiges Cookie entsteht nur, wenn ich als Betreiberin die Vorschau meines Redaktionssystems nutze. Für Besucherinnen und Besucher fällt es nicht an.',
      ],
    },
    {
      title: '7. Redaktionssystem',
      lines: [
        'Die Inhalte dieser Website pflege ich mit dem Redaktionssystem Sanity (Sanity AS, Norwegen). Bilder werden über die Infrastruktur von Vercel ausgeliefert. Dabei werden keine Daten von Besucherinnen und Besuchern an Sanity übermittelt.',
      ],
    },
    {
      title: '8. Externe Links',
      lines: [
        'Diese Website enthält Links zu externen Seiten, zum Beispiel zu meinem LinkedIn-Profil. Daten werden erst an den jeweiligen Anbieter übertragen, wenn Sie einen Link anklicken. Für die Datenverarbeitung dort ist der jeweilige Anbieter verantwortlich.',
      ],
    },
    {
      title: '9. Ihre Rechte',
      lines: [
        'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO). Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO können Sie widersprechen (Art. 21 DSGVO). Schreiben Sie mir dafür einfach eine E-Mail.',
        'Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg.',
      ],
    },
  ],
}
