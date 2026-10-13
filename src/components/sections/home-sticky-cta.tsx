'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './home-page.module.css'

type HomeStickyCtaProps = {
  email?: string | null
}

// Mobile Kontaktleiste: erscheint, sobald der Claim aus dem Bild ist,
// und verschwindet wieder, wenn der Kontakt-Link sichtbar wird.
export function HomeStickyCta({ email }: HomeStickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const claim = document.getElementById('home-title')
    const contact = document.querySelector('#home-contact a')
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
  }, [])

  return (
    <div className={styles.stickyCta} data-visible={visible} inert={!visible}>
      <Link href="/kontakt" className={styles.stickyCtaPrimary}>
        Kennenlernen <span aria-hidden="true">↗︎</span>
      </Link>
      {email ? (
        <a
          href={`mailto:${email}`}
          className={styles.stickyCtaMail}
          aria-label="E-Mail schreiben"
        >
          @
        </a>
      ) : null}
    </div>
  )
}
