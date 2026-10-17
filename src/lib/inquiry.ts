// Gemeinsame Regeln für die Kontaktformulare. Wird im Browser und in der
// Server Action verwendet, damit beide dieselben Fehler melden.

export const inquiryRecipient = 'annika.matthaei@googlemail.com'

export type InquiryField = 'name' | 'email' | 'message'

export type InquiryErrors = Partial<Record<InquiryField, string>>

export type InquiryValues = {
  topics: string[]
  name: string
  email: string
  company: string
  phone: string
  message: string
}

export type InquiryStatus =
  'idle' | 'sent' | 'invalid' | 'unavailable' | 'error'

export type InquiryState = {
  status: InquiryStatus
  errors?: InquiryErrors
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(formData: FormData, key: string, max: number) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

// Das Kontaktformular schickt ein Thema als `thema`, ältere Formulare
// mehrere als `themen`.
export function readInquiry(formData: FormData): InquiryValues {
  return {
    topics: [...formData.getAll('thema'), ...formData.getAll('themen')]
      .filter((topic): topic is string => typeof topic === 'string' && !!topic)
      .slice(0, 10),
    name: text(formData, 'name', 200),
    email: text(formData, 'email', 200),
    company: text(formData, 'unternehmen', 200),
    phone: text(formData, 'telefon', 60),
    message: text(formData, 'nachricht', 5000),
  }
}

export function validateInquiry(
  values: InquiryValues,
  { messageRequired }: { messageRequired: boolean },
): InquiryErrors {
  const errors: InquiryErrors = {}
  if (!values.name) errors.name = 'Bitte gib deinen Namen ein.'
  if (!emailPattern.test(values.email)) {
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
  }
  if (messageRequired && !values.message) {
    errors.message = 'Bitte schreib kurz, worum es geht.'
  }
  return errors
}

export function inquirySubject(values: InquiryValues) {
  const topics = values.topics.length ? values.topics.join(', ') : 'Anfrage'
  return `Neue Anfrage: ${topics} – ${values.name}`
}

export function inquiryText(values: InquiryValues, source: string) {
  const details = [
    `Name: ${values.name}`,
    `E-Mail: ${values.email}`,
    values.company ? `Unternehmen / Startup: ${values.company}` : null,
    values.phone ? `Telefon: ${values.phone}` : null,
    `Themen: ${values.topics.join(', ') || '–'}`,
    `Seite: ${source}`,
  ].filter(Boolean)
  return `${details.join('\n')}\n\n${values.message || '(keine Nachricht)'}`
}
