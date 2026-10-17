'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './home-sticky-cta.module.css'
import { Arrow } from '@/components/ui/arrow'

type HomeStickyCtaProps = {
  email?: string | null
  label?: string
  startId?: string
  endSelector?: string
}

// Mobile Kontaktleiste: erscheint, sobald der Claim (startId) aus dem Bild ist,
// und verschwindet wieder, wenn der Kontakt-Link (endSelector) sichtbar wird.
export function HomeStickyCta({
  email,
  label = 'Kennenlernen',
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
        {label} <Arrow />
      </Link>
      {email ? (
        <a
          href={`mailto:${email}`}
          className={styles.stickyCtaMail}
          aria-label="E-Mail an Annika"
        >
          @
        </a>
      ) : null}
    </div>
  )
}
