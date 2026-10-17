import { describe, expect, it } from 'vitest'

import {
  inquirySubject,
  inquiryText,
  readInquiry,
  validateInquiry,
} from '@/lib/inquiry'

function form(entries: Record<string, string | string[]>) {
  const data = new FormData()
  for (const [key, value] of Object.entries(entries)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      data.append(key, item)
    }
  }
  return data
}

describe('inquiry', () => {
  it('accepts a complete inquiry', () => {
    const values = readInquiry(
      form({
        themen: ['EXIST', 'Co-Founder'],
        name: ' Alex ',
        email: 'alex@example.test',
        nachricht: 'Hallo',
      }),
    )
    expect(values.name).toBe('Alex')
    expect(validateInquiry(values, { messageRequired: true })).toEqual({})
    expect(inquirySubject(values)).toBe(
      'Neue Anfrage: EXIST, Co-Founder – Alex',
    )
    expect(inquiryText(values, '/kontakt')).toContain(
      'Seite: /kontakt\n\nHallo',
    )
  })

  it('reports missing and invalid fields', () => {
    const errors = validateInquiry(
      readInquiry(form({ email: 'keine-adresse' })),
      { messageRequired: true },
    )
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })

  it('treats the message as optional where allowed', () => {
    const errors = validateInquiry(
      readInquiry(form({ name: 'Alex', email: 'alex@example.test' })),
      { messageRequired: false },
    )
    expect(errors).toEqual({})
  })

  it('reads the single topic of the contact form', () => {
    const values = readInquiry(
      form({ thema: 'EXIST', name: 'Alex', email: 'alex@example.test' }),
    )
    expect(values.topics).toEqual(['EXIST'])
    expect(inquirySubject(values)).toBe('Neue Anfrage: EXIST – Alex')
  })
})
