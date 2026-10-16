import { describe, expect, it } from 'vitest'

import {
  adjacentPage,
  atPageEdge,
  ScrollGesture,
} from '../../src/lib/scroll-navigation'

describe('scroll navigation', () => {
  it('moves through main pages without wrapping or leaving legal/detail pages', () => {
    expect(adjacentPage('/', 1)).toBe('/startups')
    expect(adjacentPage('/startups', -1)).toBe('/')
    expect(adjacentPage('/kontakt', 1)).toBeUndefined()
    expect(adjacentPage('/', -1)).toBeUndefined()
    expect(adjacentPage('/impressum', 1)).toBeUndefined()
    expect(adjacentPage('/datenschutz', -1)).toBeUndefined()
    expect(adjacentPage('/blog/beitrag', 1)).toBeUndefined()
  })

  it('keeps long pages readable until their boundary', () => {
    expect(atPageEdge(1, 400, 1600, 800)).toBe(false)
    expect(atPageEdge(1, 800, 1600, 800)).toBe(true)
    expect(atPageEdge(-1, 400, 1600, 800)).toBe(false)
    expect(atPageEdge(-1, 0, 1600, 800)).toBe(true)
  })

  it('requires a fresh gesture after scrolling to the bottom', () => {
    const gesture = new ScrollGesture()
    expect(gesture.update(120, 0, false, false)).toBe(false)
    expect(gesture.update(120, 50, true, false)).toBe(false)
    expect(gesture.update(120, 400, true, false)).toBe(true)
  })

  it('ignores tiny deltas and prevents momentum from skipping pages', () => {
    const gesture = new ScrollGesture()
    expect(gesture.update(20, 0, true, false)).toBe(false)
    expect(gesture.update(40, 30, true, false)).toBe(true)
    expect(gesture.update(100, 60, true, true)).toBe(false)
    expect(gesture.update(100, 280, true, false)).toBe(false)
    expect(gesture.update(100, 600, true, false)).toBe(true)
  })

  it('does not arm a new gesture during a transition', () => {
    const gesture = new ScrollGesture()
    expect(gesture.update(100, 0, true, true)).toBe(false)
    expect(gesture.update(100, 100, true, false)).toBe(false)
    expect(gesture.update(-100, 400, true, false)).toBe(true)
  })
})
