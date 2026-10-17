'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './home-sticky-cta.module.css'

type HomeStickyCtaProps = {
  label?: string
  startId?: string
  endSelector?: string
}

// Mobile Kontaktleiste: erscheint, sobald der Claim (startId) aus dem Bild ist,
// und verschwindet wieder, wenn der Kontakt-Link (endSelector) sichtbar wird.
// Ist der Link mobil ausgeblendet, bleibt die Leiste bis zum Ende stehen.
export function HomeStickyCta({
  label = 'Kostenloses Kennenlernen',
  startId = 'home-title',
  endSelector = '#home-contact a',
}: HomeStickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const claim = document.getElementById(startId)
    const contact = document.querySelector(endSelector)
    if (!claim || !contact) return

    let claimPassed = false
    let contactVisible = false

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === claim) {
          claimPassed =
            !entry.isIntersecting && entry.boundingClientRect.top < 0
        } else {
          contactVisible = entry.isIntersecting
        }
      }
      setVisible(claimPassed && !contactVisible)
    })

    observer.observe(claim)
    observer.observe(contact)
    return () => observer.disconnect()
  }, [startId, endSelector])

  return (
    <div className={styles.stickyCta} data-visible={visible} inert={!visible}>
      <Link href="/kontakt" className={styles.stickyCtaPrimary}>
        {label}
      </Link>
    </div>
  )
}
