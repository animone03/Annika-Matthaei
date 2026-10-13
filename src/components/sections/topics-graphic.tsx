'use client'

import { useEffect, useRef } from 'react'

import styles from './topics-graphic.module.css'

// Themen-Grafik „Alles hängt zusammen“. Alle Maße beziehen sich auf eine
// feste Zeichenfläche von 880 × 770 px; zwischen 768 und 1023 px wird sie
// als Ganzes skaliert. Positionen und Pfade werden pro Frame direkt per Ref
// gesetzt, ohne React-Re-Render.

const WIDTH = 880
const HEIGHT = 770
const TAU = Math.PI * 2
const SPEED = 0.3

type BubbleKind = 'parent' | 'child' | 'bridge' | 'single' | 'ai'

type BubbleDefinition = {
  id: string
  label: string
  kind: BubbleKind
  x: number
  y: number
  r: number
  background: string
  color: string
  stroke?: string
  parent?: string
}

const ink = '#1f1f1b'
const paper = '#f4f4ee'
const taupe = '#d7d5c9'
const white = '#ffffff'

// Bei Kindern sind x/y der Versatz zur Mutter-Blase.
const bubbles: BubbleDefinition[] = [
  {
    id: 'gruendung',
    label: 'Gründungs­coaching',
    kind: 'parent',
    x: 175,
    y: 215,
    r: 104,
    background: ink,
    color: paper,
  },
  {
    id: 'exist',
    label: 'EXIST',
    kind: 'child',
    parent: 'gruendung',
    x: -46,
    y: 28,
    r: 24,
    background: paper,
    color: ink,
  },
  {
    id: 'cofounder',
    label: 'Co-Founder Beziehung',
    kind: 'child',
    parent: 'gruendung',
    x: 26,
    y: 26,
    r: 40,
    background: paper,
    color: ink,
  },
  {
    id: 'leadership',
    label: 'Leadership',
    kind: 'parent',
    x: 215,
    y: 450,
    r: 104,
    background: ink,
    color: paper,
  },
  {
    id: 'hpt',
    label: 'High Per­formance Teams',
    kind: 'child',
    parent: 'leadership',
    x: -38,
    y: 20,
    r: 44,
    background: paper,
    color: ink,
  },
  {
    id: 'fk',
    label: 'Führungs­kräfte',
    kind: 'child',
    parent: 'leadership',
    x: 44,
    y: 26,
    r: 38,
    background: paper,
    color: ink,
  },
  {
    id: 'bridge',
    label: 'Marketing für Coaches',
    kind: 'bridge',
    x: 440,
    y: 310,
    r: 52,
    background: white,
    color: ink,
    stroke: ink,
  },
  {
    id: 'strategie',
    label: 'Strategie',
    kind: 'single',
    x: 548,
    y: 180,
    r: 42,
    background: white,
    color: ink,
  },
  {
    id: 'webdesign',
    label: 'Webdesign',
    kind: 'parent',
    x: 720,
    y: 200,
    r: 100,
    background: white,
    color: ink,
  },
  {
    id: 'frontend',
    label: 'Frontend & Backend Develop­ment',
    kind: 'child',
    parent: 'webdesign',
    x: -26,
    y: 22,
    r: 48,
    background: taupe,
    color: ink,
  },
  {
    id: 'seo',
    label: 'SEO',
    kind: 'child',
    parent: 'webdesign',
    x: 52,
    y: 26,
    r: 24,
    background: taupe,
    color: ink,
  },
  {
    id: 'branding',
    label: 'Branding',
    kind: 'parent',
    x: 690,
    y: 440,
    r: 100,
    background: white,
    color: ink,
  },
  {
    id: 'logo',
    label: 'Logo',
    kind: 'child',
    parent: 'branding',
    x: -40,
    y: 18,
    r: 24,
    background: taupe,
    color: ink,
  },
  {
    id: 'typo',
    label: 'Typo',
    kind: 'child',
    parent: 'branding',
    x: 10,
    y: 48,
    r: 24,
    background: taupe,
    color: ink,
  },
  {
    id: 'visual',
    label: 'Visual Identity',
    kind: 'child',
    parent: 'branding',
    x: 44,
    y: -2,
    r: 34,
    background: taupe,
    color: ink,
  },
  {
    id: 'ai',
    label: 'AI',
    kind: 'ai',
    x: 440,
    y: 575,
    r: 46,
    background: taupe,
    color: ink,
    stroke: ink,
  },
]

const areas = [
  { label: 'Coaching', cx: 264, cy: 310, R: 250, fill: 'rgba(31,31,27,.03)' },
  {
    label: 'Marketing',
    cx: 616,
    cy: 310,
    R: 250,
    fill: 'rgba(215,213,201,.45)',
  },
  {
    label: 'Prozesse & Organisation',
    cx: 440,
    cy: 560,
    R: 140,
    fill: 'rgba(255,255,255,.55)',
  },
]

const amplitude: Record<BubbleKind, number> = {
  child: 5,
  parent: 7,
  bridge: 9,
  single: 12,
  ai: 12,
}

const motion = bubbles.map((bubble, index) => {
  const h = ((index * 9301 + 49297) % 233280) / 233280
  return {
    p: h * TAU,
    s1: 0.22 + h * 0.3,
    s2: 0.18 + (1 - h) * 0.3,
    amp: amplitude[bubble.kind],
  }
})

const areaHarmonics = areas.map((_, j) =>
  [
    [1, 22, j * 1.7, 0.13],
    [2, 40, j * 2.4, 0.17],
    [3, 30, 1 + j * 1.3, -0.21],
    [4, 16, 2 + j, 0.27],
    [5, 9, j * 3.1, -0.33],
  ].map(([m, amp, phase, tempo]) => [
    m,
    j === 2 ? amp * 0.55 : amp,
    phase,
    tempo,
  ]),
)

// Geschlossener Catmull-Rom-Pfad durch Punkte um (cx, cy).
function closedPath(cx: number, cy: number, radii: number[]) {
  const count = radii.length
  const points = radii.map((radius, i) => {
    const a = (i / count) * TAU
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius]
  })
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

function bubblePath(r: number, p: number, t: number) {
  const radii = Array.from({ length: 14 }, (_, k) => {
    const a = (k / 14) * TAU
    return (
      r -
      0.5 +
      r *
        (0.045 * Math.cos(2 * a + p + 0.5 * t) +
          0.03 * Math.cos(3 * a + 2 * p - 0.4 * t))
    )
  })
  return closedPath(r, r, radii)
}

function areaPath(index: number, t: number) {
  const { cx, cy, R } = areas[index]
  const R0 = R - 14
  const radii = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * TAU
    const ca = Math.cos(a)
    const sa = Math.sin(a)
    let off = 0
    for (const [m, amp, phase, tempo] of areaHarmonics[index]) {
      off += amp * Math.cos(m * a + phase + t * tempo)
    }
    // Weiche Begrenzung, damit die Fläche nicht am Rand abgeschnitten wird.
    const tx =
      Math.abs(ca) < 1e-6 ? 1e9 : ca > 0 ? (868 - cx) / ca : (12 - cx) / ca
    const ty =
      Math.abs(sa) < 1e-6 ? 1e9 : sa > 0 ? (758 - cy) / sa : (12 - cy) / sa
    const limit = Math.min(tx, ty) - 36
    let radius = R0 + off
    if (radius > limit) radius = limit + 30 * Math.tanh((radius - limit) / 30)
    return radius
  })
  return closedPath(cx, cy, radii)
}

function bubblePositions(t: number) {
  const positions: Record<string, { x: number; y: number }> = {}
  const drift = (index: number) => {
    const { p, s1, s2, amp } = motion[index]
    return {
      wx:
        (Math.sin(t * s1 * 0.8 + p) * 0.7 +
          Math.sin(t * s2 * 1.9 + p * 2.3) * 0.3) *
        amp *
        1.7,
      wy:
        (Math.cos(t * s2 * 0.8 + p * 1.3) * 0.7 +
          Math.cos(t * s1 * 1.7 + p * 0.7) * 0.3) *
        amp *
        1.7,
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

function labelStyle(bubble: BubbleDefinition) {
  const r = bubble.r
  switch (bubble.kind) {
    case 'parent':
      return {
        fontSize: 13,
        letterSpacing: '0.05em',
        alignItems: 'flex-start',
        paddingTop: Math.round(r * 0.3),
        maxWidth: Math.round(r * 1.2),
      }
    case 'child':
      return {
        fontSize: 10,
        letterSpacing: '0.02em',
        alignItems: 'center',
        paddingTop: 4,
        maxWidth: Math.round(r * 1.4),
      }
    case 'ai':
      return {
        fontSize: 20,
        letterSpacing: '0.05em',
        alignItems: 'center',
        paddingTop: 4,
        maxWidth: Math.round(r * 1.5),
      }
    default:
      return {
        fontSize: 11,
        letterSpacing: '0.05em',
        alignItems: 'center',
        paddingTop: 4,
        maxWidth: Math.round(r * 1.5),
      }
  }
}

const initialPositions = bubblePositions(0)

export function TopicsGraphic() {
  const frameRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const areaRefs = useRef<(SVGPathElement | null)[]>([])
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([])
  const bubblePathRefs = useRef<(SVGPathElement | null)[]>([])

  // Zwischen 768 und 1023 px als Ganzes auf die verfügbare Breite skalieren.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.min(1, entry.contentRect.width / WIDTH)
      frame.style.setProperty('--topics-scale', String(scale))
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameId = 0
    let running = false

    function render(timestamp: number) {
      const t = (timestamp / 1000) * SPEED
      const positions = bubblePositions(t)
      areas.forEach((_, index) => {
        areaRefs.current[index]?.setAttribute('d', areaPath(index, t))
      })
      bubbles.forEach((bubble, index) => {
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
  }, [])

  return (
    <div ref={frameRef} className={styles.frame}>
      <ul className={styles.srOnly}>
        <li>
          Coaching mit systemischer, agiler und positiv-psychologischer Haltung:
          Gründungscoaching mit EXIST und Co-Founder-Beziehung, Leadership mit
          High Performance Teams und Führungskräften.
        </li>
        <li>
          Marketing: Strategie, Webdesign mit Frontend- und Backend-Development
          und SEO, Branding mit Logo, Typo und Visual Identity.
        </li>
        <li>Zwischen Coaching und Marketing: Marketing für Coaches.</li>
        <li>Prozesse &amp; Organisation: AI.</li>
      </ul>
      <div ref={stageRef} className={styles.stage} aria-hidden="true">
        <svg
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className={styles.layer}
        >
          {areas.map((area, index) => (
            <path
              key={area.label}
              ref={(element) => {
                areaRefs.current[index] = element
              }}
              d={areaPath(index, 0)}
              fill={area.fill}
              stroke={ink}
              strokeWidth={1}
            />
          ))}
        </svg>

        <span className={`${styles.heading} ${styles.headingCoaching}`}>
          Coaching
        </span>
        <span className={styles.attitude}>
          <span className={styles.attitudeLabel}>Haltung</span>
          <span>Systemisch · Agil · Positive Psychologie</span>
        </span>
        <span className={`${styles.heading} ${styles.headingMarketing}`}>
          Marketing
        </span>
        <span className={`${styles.heading} ${styles.headingProcesses}`}>
          Prozesse &amp; Organisation
        </span>

        {bubbles.map((bubble, index) => {
          const { x, y } = initialPositions[bubble.id]
          const { maxWidth, ...label } = labelStyle(bubble)
          return (
            <div
              key={bubble.id}
              ref={(element) => {
                bubbleRefs.current[index] = element
              }}
              className={styles.bubble}
              style={{
                width: bubble.r * 2,
                height: bubble.r * 2,
                color: bubble.color,
                transform: `translate(${x - bubble.r}px,${y - bubble.r}px)`,
                ...label,
              }}
            >
              <svg
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
