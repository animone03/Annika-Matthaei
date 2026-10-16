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
  blocks: [
    {
      title: '1. Verantwortliche',
      lines: ['Annika Matthaei, Waldhornstraße 52, 68199 Mannheim', email],
    },
    {
      title: '2. Überblick',
      lines: [
        '[Kurz: welche Daten beim Besuch der Website verarbeitet werden und warum]',
      ],
      pending: true,
    },
    {
      title: '3. Hosting',
      lines: [
        'Diese Website wird bei Vercel Inc. (USA) gehostet. Die Domain ist bei IONOS SE registriert.',
        '[Text laut Generator: Server-Logfiles, Auftragsverarbeitung, Datenübermittlung in die USA / EU-US Data Privacy Framework]',
      ],
      pending: true,
    },
    {
      title: '4. Kontaktformular',
      lines: [
        '[Welche Felder, Zweck, Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, Speicherdauer, Formular-Dienst]',
      ],
      pending: true,
    },
    {
      title: '5. Terminbuchung',
      lines: [
        '[Falls ein Buchungstool für den Kennenlern-Call genutzt wird: Anbieter, Daten]',
      ],
      pending: true,
    },
    {
      title: '6. Schriften',
      lines: [
        '[Century Gothic: lokal eingebunden oder über Adobe Fonts / Monotype. Bei externem Dienst: Übertragung der IP-Adresse]',
      ],
      pending: true,
    },
    {
      title: '7. Analyse & Cookies',
      lines: [
        '[Nur falls genutzt, sonst: Diese Website verwendet keine Tracking-Cookies.]',
      ],
      pending: true,
    },
    {
      title: '8. Externe Links',
      lines: ['[Hinweis zu ijustwannacoach und weiteren verlinkten Seiten]'],
      pending: true,
    },
    {
      title: '9. Ihre Rechte',
      lines: [
        '[Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerde bei der Aufsichtsbehörde (LfDI Baden-Württemberg)]',
      ],
      pending: true,
    },
  ],
}
