'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'

import styles from './topics-graphic.module.css'
import { Arrow } from '@/components/ui/arrow'

// Themen-Grafik „Alles hängt zusammen“. Desktop und Mobil nutzen dieselbe
// Engine mit unterschiedlichen Daten. Alle Maße beziehen sich auf die feste
// Zeichenfläche der Variante; ist weniger Platz, wird sie als Ganzes
// skaliert. Positionen und Pfade werden pro Frame direkt per Ref gesetzt,
// ohne React-Re-Render.

const TAU = Math.PI * 2
const coachingEdgeId = 'topics-coaching-edge'
const SPEED = 0.3

const desktopSize = { width: 880, height: 640 }
const mobileSize = { width: 350, height: 530 }

const ink = '#1e2329'
const paper = '#f4f5f3'
const bluestone = '#587284'
const mist = '#e2e8ec'

type Bubble = {
  id: string
  label: string
  x: number
  y: number
  r: number
  amp: number
  background: string
  color: string
  stroke?: string
  // Bei Kindern sind x/y der Versatz zur Mutter-Blase.
  parent?: string
  labelStyle: CSSProperties & { maxWidth: number }
  href?: Route
}

type Area = {
  label: string
  cx: number
  cy: number
  rx: number
  ry: number
  fill: string
}

type Variant = {
  width: number
  height: number
  areas: Area[]
  bubbles: Bubble[]
  areaPath: (area: Area, index: number, t: number) => string
}

// Geschlossener Catmull-Rom-Pfad durch die Punkte.
function closedPath(points: number[][]) {
  const count = points.length
  const f = (n: number) => n.toFixed(1)
  let d = `M${f(points[0][0])},${f(points[0][1])}`
  for (let i = 0; i < count; i++) {
    const p0 = points[(i + count - 1) % count]
    const p1 = points[i]
    const p2 = points[(i + 1) % count]
    const p3 = points[(i + 2) % count]
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`
  }
  return `${d}Z`
}

function harmonics(index: number, scale: number) {
  return [
    [1, 22 * scale, index * 1.7, 0.13],
    [2, 40 * scale, index * 2.4, 0.17],
    [3, 30 * scale, 1 + index * 1.3, -0.21],
    [4, 16 * scale, 2 + index, 0.27],
    [5, 9 * scale, index * 3.1, -0.33],
  ]
}

function harmonicOffset(waves: number[][], a: number, t: number) {
  let off = 0
  for (const [m, amp, phase, tempo] of waves) {
    off += amp * Math.cos(m * a + phase + t * tempo)
  }
  return off
}

// Desktop: kreisförmige Flächen mit weicher Begrenzung entlang des Radius.
function desktopAreaPath(area: Area, index: number, t: number) {
  const { cx, cy } = area
  const R0 = area.rx - 14
  const waves = harmonics(index, 1)
  const points = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * TAU
    const ca = Math.cos(a)
    const sa = Math.sin(a)
    const right = desktopSize.width - 12
    const bottom = desktopSize.height - 12
    const tx =
      Math.abs(ca) < 1e-6 ? 1e9 : ca > 0 ? (right - cx) / ca : (12 - cx) / ca
    const ty =
      Math.abs(sa) < 1e-6 ? 1e9 : sa > 0 ? (bottom - cy) / sa : (12 - cy) / sa
    const limit = Math.min(tx, ty) - 36
    let radius = R0 + harmonicOffset(waves, a, t)
    if (radius > limit) radius = limit + 30 * Math.tanh((radius - limit) / 30)
    return [cx + ca * radius, cy + sa * radius]
  })
  return closedPath(points)
}

// Mobil: elliptische Flächen, weich auf die Zeichenfläche begrenzt.
function softClamp(v: number, lo: number, hi: number) {
  const k = 16
  if (v > hi - k) return hi - k + k * Math.tanh((v - (hi - k)) / k)
  if (v < lo + k) return lo + k - k * Math.tanh((lo + k - v) / k)
  return v
}

function mobileAreaPath(area: Area, index: number, t: number) {
  const scale = (Math.min(area.rx, area.ry) / 250) * 0.85
  const waves = harmonics(index, scale)
  const points = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * TAU
    const off = harmonicOffset(waves, a, t)
    return [
      softClamp(
        area.cx + Math.cos(a) * (area.rx - 10 + off),
        8,
        mobileSize.width - 8,
      ),
      softClamp(
        area.cy + Math.sin(a) * (area.ry - 10 + off),
        8,
        mobileSize.height - 8,
      ),
    ]
  })
  return closedPath(points)
}

function parentLabel(r: number) {
  return {
    fontSize: 13,
    letterSpacing: '0.05em',
    justifyContent: 'flex-start',
    paddingTop: Math.round(r * 0.3),
    maxWidth: Math.round(r * 1.2),
  }
}

function childLabel(r: number) {
  return {
    fontSize: 10,
    letterSpacing: '0.02em',
    maxWidth: Math.round(r * 1.4),
  }
}

function centeredLabel(r: number, fontSize: number, factor = 1.5) {
  return {
    fontSize,
    letterSpacing: '0.05em',
    maxWidth: Math.round(r * factor),
  }
}

const desktop: Variant = {
  ...desktopSize,
  areaPath: desktopAreaPath,
  areas: [
    {
      label: 'Coaching',
      cx: 440,
      cy: 320,
      rx: 250,
      ry: 250,
      fill: 'rgba(88,114,132,.07)',
    },
  ],
  bubbles: [
    {
      id: 'gruendung',
      label: 'Gründungs­coaching',
      x: 335,
      y: 235,
      r: 104,
      amp: 7,
      background: bluestone,
      color: paper,
      labelStyle: parentLabel(104),
    },
    {
      id: 'exist',
      label: 'EXIST',
      parent: 'gruendung',
      x: -46,
      y: 28,
      r: 24,
      amp: 5,
      background: mist,
      color: ink,
      labelStyle: childLabel(24),
    },
    {
      id: 'cofounder',
      label: 'Co-Founder Beziehung',
      parent: 'gruendung',
      x: 26,
      y: 26,
      r: 40,
      amp: 5,
      background: mist,
      color: ink,
      labelStyle: childLabel(40),
    },
    {
      id: 'leadership',
      label: 'Leadership',
      x: 545,
      y: 400,
      r: 104,
      amp: 7,
      background: bluestone,
      color: paper,
      labelStyle: parentLabel(104),
    },
    {
      id: 'hpt',
      label: 'High Per­formance Teams',
      parent: 'leadership',
      x: -38,
      y: 20,
      r: 44,
      amp: 5,
      background: mist,
      color: ink,
      labelStyle: childLabel(44),
    },
    {
      id: 'fk',
      label: 'Führungs­kräfte',
      parent: 'leadership',
      x: 44,
      y: 26,
      r: 38,
      amp: 5,
      background: mist,
      color: ink,
      labelStyle: childLabel(38),
    },
  ],
}

const mobile: Variant = {
  ...mobileSize,
  areaPath: mobileAreaPath,
  areas: [
    {
      label: 'Coaching',
      cx: 175,
      cy: 290,
      rx: 158,
      ry: 175,
      fill: 'rgba(88,114,132,.07)',
    },
  ],
  bubbles: [
    {
      id: 'gruendung',
      label: 'Gründungs­coaching',
      x: 110,
      y: 248,
      r: 62,
      amp: 5,
      background: bluestone,
      color: paper,
      labelStyle: centeredLabel(62, 12, 1.6),
      href: '/coaching/startups',
    },
    {
      id: 'leadership',
      label: 'Leadership',
      x: 235,
      y: 335,
      r: 62,
      amp: 5,
      background: bluestone,
      color: paper,
      labelStyle: centeredLabel(62, 12, 1.6),
      href: '/coaching/unternehmen',
    },
  ],
}

const variants = { desktop, mobile }

function bubbleMotion(bubbles: Bubble[]) {
  return bubbles.map((_, index) => {
    const h = ((index * 9301 + 49297) % 233280) / 233280
    return { p: h * TAU, s1: 0.22 + h * 0.3, s2: 0.18 + (1 - h) * 0.3 }
  })
}

const motions = {
  desktop: bubbleMotion(desktop.bubbles),
  mobile: bubbleMotion(mobile.bubbles),
}

function bubblePath(r: number, p: number, t: number) {
  const points = Array.from({ length: 14 }, (_, k) => {
    const a = (k / 14) * TAU
    const radius =
      r -
      0.5 +
      r *
        (0.045 * Math.cos(2 * a + p + 0.5 * t) +
          0.03 * Math.cos(3 * a + 2 * p - 0.4 * t))
    return [r + Math.cos(a) * radius, r + Math.sin(a) * radius]
  })
  return closedPath(points)
}

function bubblePositions(
  bubbles: Bubble[],
  motion: ReturnType<typeof bubbleMotion>,
  t: number,
) {
  const positions: Record<string, { x: number; y: number }> = {}
  const drift = (index: number) => {
    const { p, s1, s2 } = motion[index]
    const amp = bubbles[index].amp * 1.7
    return {
      wx:
        (Math.sin(t * s1 * 0.8 + p) * 0.7 +
          Math.sin(t * s2 * 1.9 + p * 2.3) * 0.3) *
        amp,
      wy:
        (Math.cos(t * s2 * 0.8 + p * 1.3) * 0.7 +
          Math.cos(t * s1 * 1.7 + p * 0.7) * 0.3) *
        amp,
    }
  }
  bubbles.forEach((bubble, index) => {
    if (bubble.parent) return
    const { wx, wy } = drift(index)
    positions[bubble.id] = { x: bubble.x + wx, y: bubble.y + wy }
  })
  bubbles.forEach((bubble, index) => {
    if (!bubble.parent) return
    const { wx, wy } = drift(index)
    const parent = positions[bubble.parent]
    positions[bubble.id] = {
      x: parent.x + bubble.x + wx,
      y: parent.y + bubble.y + wy,
    }
  })
  return positions
}

const initialPositions = {
  desktop: bubblePositions(desktop.bubbles, motions.desktop, 0),
  mobile: bubblePositions(mobile.bubbles, motions.mobile, 0),
}

type TopicsGraphicProps = {
  variant: keyof typeof variants
}

export function TopicsGraphic({ variant }: TopicsGraphicProps) {
  const config = variants[variant]
  const motion = motions[variant]
  const frameRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const areaRefs = useRef<(SVGPathElement | null)[]>([])
  const bubbleRefs = useRef<(HTMLElement | null)[]>([])
  const bubblePathRefs = useRef<(SVGPathElement | null)[]>([])

  // Bei weniger Platz als die Zeichenfläche als Ganzes skalieren.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.min(1, entry.contentRect.width / config.width)
      frame.style.setProperty('--topics-scale', String(scale))
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [config.width])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameId = 0
    let running = false

    function render(timestamp: number) {
      const t = (timestamp / 1000) * SPEED
      const positions = bubblePositions(config.bubbles, motion, t)
      config.areas.forEach((area, index) => {
        areaRefs.current[index]?.setAttribute(
          'd',
          config.areaPath(area, index, t),
        )
      })
      config.bubbles.forEach((bubble, index) => {
        const { x, y } = positions[bubble.id]
        const element = bubbleRefs.current[index]
        if (element) {
          element.style.transform = `translate(${x - bubble.r}px,${y - bubble.r}px)`
        }
        bubblePathRefs.current[index]?.setAttribute(
          'd',
          bubblePath(bubble.r, motion[index].p, t),
        )
      })
      frameId = requestAnimationFrame(render)
    }

    // Nur animieren, solange die Grafik sichtbar ist.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        frameId = requestAnimationFrame(render)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(frameId)
      }
    })
    observer.observe(stage)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [config, motion])

  const isMobile = variant === 'mobile'

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      style={
        {
          '--topics-width': `${config.width}px`,
          '--topics-height': `${config.height}px`,
        } as CSSProperties
      }
    >
      {isMobile ? null : (
        <ul className={styles.srOnly}>
          <li>
            Coaching mit systemischer, agiler und positiv-psychologischer
            Haltung: Gründungscoaching mit EXIST und Co-Founder-Beziehung,
            Leadership mit High Performance Teams und Führungskräften.
          </li>
        </ul>
      )}
      <div
        ref={stageRef}
        className={`${styles.stage} ${isMobile ? styles.mobile : ''}`}
      >
        <svg
          aria-hidden="true"
          width={config.width}
          height={config.height}
          viewBox={`0 0 ${config.width} ${config.height}`}
          className={styles.layer}
        >
          {config.areas.map((area, index) => (
            <path
              key={area.label}
              id={!isMobile && index === 0 ? coachingEdgeId : undefined}
              ref={(element) => {
                areaRefs.current[index] = element
              }}
              d={config.areaPath(area, index, 0)}
              fill={area.fill}
              stroke={ink}
              strokeWidth={1}
            />
          ))}
        </svg>

        <div aria-hidden="true">
          <span className={`${styles.heading} ${styles.headingCoaching}`}>
            Coaching
          </span>
          {isMobile ? (
            <span className={styles.attitude}>
              <span>Systemisch · Agil · Positive Psychologie</span>
            </span>
          ) : null}
        </div>

        {config.bubbles.map((bubble, index) => {
          const { x, y } = initialPositions[variant][bubble.id]
          const { maxWidth, ...label } = bubble.labelStyle
          const style: CSSProperties = {
            width: bubble.r * 2,
            height: bubble.r * 2,
            color: bubble.color,
            transform: `translate(${x - bubble.r}px,${y - bubble.r}px)`,
            ...label,
          }
          const content = (
            <>
              <svg
                aria-hidden="true"
                width={bubble.r * 2}
                height={bubble.r * 2}
                className={styles.layer}
              >
                <path
                  ref={(element) => {
                    bubblePathRefs.current[index] = element
                  }}
                  d={bubblePath(bubble.r, motion[index].p, 0)}
                  fill={bubble.background}
                  stroke={bubble.stroke ?? bubble.background}
                  strokeWidth={1}
                />
              </svg>
              <span className={styles.bubbleLabel} style={{ maxWidth }}>
                {bubble.label}
              </span>
              {bubble.href ? <Arrow className={styles.bubbleArrow} /> : null}
            </>
          )
          const setRef = (element: HTMLElement | null) => {
            bubbleRefs.current[index] = element
          }

          return bubble.href ? (
            <Link
              key={bubble.id}
              ref={setRef}
              href={bubble.href}
              aria-label={bubble.label.replaceAll('­', '')}
              className={`${styles.bubble} ${styles.bubbleLink}`}
              style={style}
            >
              {content}
            </Link>
          ) : (
            <div
              key={bubble.id}
              ref={setRef}
              aria-hidden={isMobile ? undefined : true}
              className={styles.bubble}
              style={style}
            >
              {content}
            </div>
          )
        })}

        {/* Desktop: Haltung als Schriftzug am Rand der Coaching-Fläche. Der
            Pfad beginnt rechts und läuft im Uhrzeigersinn, damit der Text
            oben auf dem Bogen aufrecht steht. */}
        {isMobile ? null : (
          <svg
            aria-hidden="true"
            width={config.width}
            height={config.height}
            className={`${styles.layer} ${styles.edgeText}`}
          >
            <text
              fontSize={11}
              letterSpacing={1.4}
              fill={ink}
              dy={-7}
              textAnchor="middle"
            >
              <textPath href={`#${coachingEdgeId}`} startOffset="76%">
                SYSTEMISCH · AGIL · POSITIVE PSYCHOLOGIE
              </textPath>
            </text>
          </svg>
        )}
      </div>
    </div>
  )
}
