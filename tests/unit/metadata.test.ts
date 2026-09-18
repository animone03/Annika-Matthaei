import { afterEach, describe, expect, it, vi } from 'vitest'

import { buildMetadata } from '@/lib/metadata'

afterEach(() => vi.unstubAllEnvs())

describe('buildMetadata', () => {
  it('uses editorial SEO values and a canonical URL', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.test')
    const metadata = buildMetadata({
      title: 'Fallback',
      description: 'Fallback description',
      path: '/blog/beitrag',
      seo: {
        title: 'Editorial title',
        description: 'Editorial description',
        noIndex: true,
      },
    })

    expect(metadata.title).toBe('Editorial title')
    expect(metadata.description).toBe('Editorial description')
    expect(metadata.alternates?.canonical).toBe(
      'https://example.test/blog/beitrag',
    )
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })
})
