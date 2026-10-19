'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './home-sticky-cta.module.css'

type HomeStickyCtaProps = {
  label?: string
  href?: Route
  /** id des Hero-Buttons: Erst wenn er aus dem Bild ist, kommt die Leiste. */
  startId?: string
  /** Der dunkle Abschluss: Sobald er sichtbar ist, verschwindet die Leiste. */
  endSelector?: string
}

// Mobile Kontaktleiste (04_mobile, Mobile v2): erscheint, sobald der Button im
// Hero aus dem Bild gescrollt ist, und verschwindet, sobald der dunkle
// Abschluss sichtbar wird. Dort steht mobil ein eigener Button. So sind nie
// zwei Kennenlernen-Buttons gleichzeitig zu sehen.
export function HomeStickyCta({
  label = 'Kostenloses Kennenlernen',
  href = '/kontakt',
  startId = 'home-hero-cta',
  endSelector = '#home-contact',
}: HomeStickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const start = document.getElementById(startId)
    const end = document.querySelector(endSelector)
    if (!start || !end) return

    let startPassed = false
    let endVisible = false

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === start) {
          startPassed =
            !entry.isIntersecting && entry.boundingClientRect.top < 0
        } else {
          endVisible = entry.isIntersecting
        }
      }
      setVisible(startPassed && !endVisible)
    })

    observer.observe(start)
    observer.observe(end)
    return () => observer.disconnect()
  }, [startId, endSelector])

  return (
    <div className={styles.stickyCta} data-visible={visible} inert={!visible}>
      <Link href={href} className={styles.stickyCtaPrimary}>
        {label}
      </Link>
    </div>
  )
}
