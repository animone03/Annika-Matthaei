export const scrollPages = [
  '/',
  '/coaching/startups',
  '/coaching/unternehmen',
  '/fuer-einzelpersonen',
  '/ueber-mich',
  '/kontakt',
] as const

export type ScrollDirection = -1 | 1

export function adjacentPage(pathname: string, direction: ScrollDirection) {
  const index = scrollPages.findIndex((path) => path === pathname)
  return index < 0 ? undefined : scrollPages[index + direction]
}

export function atPageEdge(
  direction: ScrollDirection,
  top: number,
  height: number,
  viewport: number,
) {
  return direction === 1 ? top + viewport >= height - 3 : top <= 3
}

// A gesture that reaches the edge must finish before it can change pages.
// This also prevents trackpad momentum from skipping multiple pages.
export class ScrollGesture {
  private lastTime = -Infinity
  private direction = 0
  private distance = 0
  private armed = false

  update(delta: number, time: number, atEdge: boolean, locked: boolean) {
    const direction = Math.sign(delta)
    if (time - this.lastTime > 240 || direction !== this.direction) {
      this.distance = 0
      this.armed = atEdge && !locked
    }
    this.lastTime = time
    this.direction = direction
    if (!atEdge || locked) this.armed = false
    if (!this.armed) return false
    this.distance += Math.abs(delta)
    if (this.distance < 60) return false
    this.armed = false
    return true
  }
}
