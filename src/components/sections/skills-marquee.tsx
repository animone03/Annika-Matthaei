'use client'

import { useEffect, useRef } from 'react'

import styles from './about-page.module.css'

type SkillsMarqueeProps = {
  rows: Array<{ items: string[]; speed: number }>
}

type RowState = {
  pos: number | null
  hold: number
  drag: { x: number; pos: number } | null
}

// Mobile Kompetenz-Reihen: laufen langsam (px/s, negativ = nach rechts) und
// lassen sich wischen. Inhalt dreifach, damit die Schleife nahtlos bleibt.
export function SkillsMarquee({ rows }: SkillsMarqueeProps) {
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])
  const trackRefs = useRef<Array<HTMLDivElement | null>>([])
  const states = useRef<RowState[]>(
    rows.map(() => ({ pos: null, hold: 0, drag: null })),
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = false
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000
      last = now
      rows.forEach((row, index) => {
        const track = trackRefs.current[index]
        const state = states.current[index]
        if (!track) return
        const third = track.scrollWidth / 3
        if (!third) return
        if (state.pos === null) state.pos = third
        if (!reduce && !state.drag && now > state.hold) {
          state.pos += row.speed * dt
        }
        if (state.pos >= third * 2) {
          state.pos -= third
          if (state.drag) state.drag.pos -= third
        }
        if (state.pos < third * 0.5) {
          state.pos += third
          if (state.drag) state.drag.pos += third
        }
        track.style.transform = `translate3d(${(-state.pos).toFixed(2)}px, 0, 0)`
      })
      frame = visible ? requestAnimationFrame(tick) : 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    })
    observer.observe(container)

    const cleanups = rowRefs.current.map((element, index) => {
      if (!element) return () => {}
      const state = states.current[index]
      const down = (event: PointerEvent) => {
        state.drag = { x: event.clientX, pos: state.pos ?? 0 }
        element.setPointerCapture(event.pointerId)
        element.dataset.dragging = 'true'
        if (!frame) frame = requestAnimationFrame(tick)
      }
      const move = (event: PointerEvent) => {
        if (state.drag)
          state.pos = state.drag.pos - (event.clientX - state.drag.x)
      }
      const up = () => {
        if (!state.drag) return
        state.drag = null
        delete element.dataset.dragging
        state.hold = performance.now() + 2500
      }
      element.addEventListener('pointerdown', down)
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerup', up)
      element.addEventListener('pointercancel', up)
      return () => {
        element.removeEventListener('pointerdown', down)
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerup', up)
        element.removeEventListener('pointercancel', up)
      }
    })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [rows])

  return (
    <div ref={containerRef} className={styles.marquee} aria-hidden="true">
      {rows.map((row, index) => (
        <div
          key={row.items.join()}
          ref={(element) => {
            rowRefs.current[index] = element
          }}
          className={styles.marqueeRow}
        >
          <div
            ref={(element) => {
              trackRefs.current[index] = element
            }}
            className={styles.marqueeTrack}
          >
            {[...row.items, ...row.items, ...row.items].map((item, i) => (
              <span key={i} className={styles.marqueeChip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
