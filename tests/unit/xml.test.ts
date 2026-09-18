import { describe, expect, it } from 'vitest'

import { escapeXml } from '@/lib/xml'

describe('escapeXml', () => {
  it('escapes all XML-significant characters', () => {
    expect(escapeXml(`<tag a="1">Tom & 'Ada'</tag>`)).toBe(
      '&lt;tag a=&quot;1&quot;&gt;Tom &amp; &apos;Ada&apos;&lt;/tag&gt;',
    )
  })
})
