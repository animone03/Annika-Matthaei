'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './home-sticky-cta.module.css'

type HomeStickyCtaProps = {
  label?: string
  startId?: string
  endSelector?: string
  /** Leiste schon im ersten Bild zeigen (Startseite: mobil kein Button im
   *  Hero). Ohne Einblenden beim Laden, sonst zeichnet iOS kurz einen
   *  schwarzen Balken oben links, bis gescrollt wird. */
  visibleAtStart?: boolean
}

// Mobile Kontaktleiste: erscheint, sobald der Claim (startId) aus dem Bild ist,
// und verschwindet wieder, wenn der Kontakt-Link (endSelector) sichtbar wird.
// Ist der Link mobil ausgeblendet, bleibt die Leiste bis zum Ende stehen.
export function HomeStickyCta({
  label = 'Kostenloses Kennenlernen',
  startId = 'home-title',
  endSelector = '#home-contact a',
  visibleAtStart = false,
}: HomeStickyCtaProps) {
  const [visible, setVisible] = useState(visibleAtStart)

  useEffect(() => {
    const claim = document.getElementById(startId)
    const contact = document.querySelector(endSelector)
    if (!claim || !contact) return

    // Ist der Startpunkt mobil ausgeblendet (Startseite: kein Button im
    // Hero), steht die Leiste von Anfang an.
    const claimHidden = () => claim.getClientRects().length === 0

    let claimPassed = claimHidden()
    let contactVisible = false

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === claim) {
          claimPassed =
            claimHidden() ||
            (!entry.isIntersecting && entry.boundingClientRect.top < 0)
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
