import { afterEach, describe, expect, it, vi } from 'vitest'

import { absoluteUrl, getSiteOrigin } from '@/lib/site-url'

afterEach(() => vi.unstubAllEnvs())

describe('site URL helpers', () => {
  it('normalizes the configured origin and resolves paths', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.test/base')
    expect(getSiteOrigin()).toBe('https://example.test')
    expect(absoluteUrl('/blog/eintrag')).toBe(
      'https://example.test/blog/eintrag',
    )
  })

  it('falls back to localhost when the configured URL is invalid', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'not a url')
    expect(getSiteOrigin()).toBe('http://localhost:3000')
  })
})
