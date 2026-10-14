'use server'

import {
  inquiryRecipient,
  inquirySubject,
  inquiryText,
  readInquiry,
  validateInquiry,
  type InquiryState,
} from './inquiry'

const sources = {
  kontakt: { path: '/kontakt', messageRequired: true },
  'coaching-startups': { path: '/coaching/startups', messageRequired: false },
} as const

export type InquirySource = keyof typeof sources

const minimumFillTime = 3000

// Versendet Kontaktanfragen per Resend. Die Angaben werden nicht gespeichert.
// Ohne RESEND_API_KEY bleibt der Versand aus und das Formular verweist auf
// die E-Mail-Adresse.
export async function sendInquiry(
  source: InquirySource,
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const config = sources[source]
  if (!config) return { status: 'error' }

  // Spam-Schutz: Honeypot ausgefüllt oder Formular zu schnell abgeschickt.
  // Dann tun wir so, als sei alles gesendet, ohne etwas zu verschicken.
  const startedAt = Number(formData.get('gestartet'))
  if (
    formData.get('website') ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < minimumFillTime
  ) {
    return { status: 'sent' }
  }

  const values = readInquiry(formData)
  const errors = validateInquiry(values, {
    messageRequired: config.messageRequired,
  })
  if (Object.keys(errors).length) return { status: 'invalid', errors }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { status: 'unavailable' }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Website <onboarding@resend.dev>',
        to: [process.env.INQUIRY_RECIPIENT || inquiryRecipient],
        reply_to: values.email,
        subject: inquirySubject(values),
        text: inquiryText(values, config.path),
      }),
    })
    if (!response.ok) {
      console.error('Anfrage konnte nicht versendet werden', response.status)
      return { status: 'error' }
    }
    return { status: 'sent' }
  } catch (error) {
    console.error('Anfrage konnte nicht versendet werden', error)
    return { status: 'error' }
  }
}
