import { describe, expect, it } from 'vitest'

import { formatDate } from '@/lib/date'

describe('formatDate', () => {
  it('formats an ISO date in German without a timezone shift', () => {
    expect(formatDate('2026-09-01T23:30:00-07:00')).toBe('2. September 2026')
  })

  it('returns an empty string for an invalid date', () => {
    expect(formatDate('not-a-date')).toBe('')
  })
})
