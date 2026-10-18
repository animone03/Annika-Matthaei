import type { Route } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import warm from './warm.module.css'
import styles from './warm-hero.module.css'

type WarmHeroProps = {
  id: string
  eyebrow: string
  title: string
  intro: string
  /** Mobil kürzerer Einstieg, z. B. nur der erste Satz */
  introMobile?: string
  cta: { label: string; href: Route }
  note: string
  image: StaticImageData
  alt: string
  /** Foto links (Unternehmen) oder rechts (Startups) */
  photoSide: 'start' | 'end'
  /** Bildausschnitt, z. B. Zoom 127 % bei 36 % wie beim Sesselfoto */
  crop?: { position: string; zoom?: number }
  /** Mobil: Format, Ausschnitt und Zoom des Fotos (04_mobile, Mobile v2) */
  mobilePhoto: { aspectRatio: string; position: string; zoom?: number }
}

// Hero der Unterseiten im Design 10b. Die Überschrift bekommt die id, der
// Button `${id}-cta` (Startpunkt der mobilen Kontaktleiste). Mobil steht das
// Foto oben, der Button in voller Breite unter dem Text.
export function WarmHero({
  id,
  eyebrow,
  title,
  intro,
  introMobile,
  cta,
  note,
  image,
  alt,
  photoSide,
  crop,
  mobilePhoto,
}: WarmHeroProps) {
  const photoStyle = {
    '--photo-position': crop?.position ?? 'center',
    '--photo-zoom': crop?.zoom ?? 1,
    '--photo-origin': (crop?.position ?? 'center').replace('center', '50%'),
    '--mobile-aspect': mobilePhoto.aspectRatio,
    '--mobile-position': mobilePhoto.position,
    '--mobile-zoom': mobilePhoto.zoom ?? 1,
  } as CSSProperties

  return (
    <section
      aria-labelledby={id}
      className={`${styles.hero} ${photoSide === 'start' ? styles.photoStart : ''}`}
    >
      <div className={styles.text}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id={id} className={styles.title}>
            {title}
          </h1>
          {introMobile ? (
            <>
              <p className={`${styles.intro} ${styles.introDesktop}`}>
                {intro}
              </p>
              <p className={`${styles.intro} ${styles.introMobile}`}>
                {introMobile}
              </p>
            </>
          ) : (
            <p className={styles.intro}>{intro}</p>
          )}
        </div>
        <div className={styles.action}>
          <Link
            id={`${id}-cta`}
            href={cta.href}
            className={`${warm.button} ${warm.buttonLarge}`}
          >
            {cta.label}
          </Link>
          <span className={styles.note}>{note}</span>
        </div>
      </div>
      <div className={styles.photo} style={photoStyle}>
        <Image
          src={image}
          alt={alt}
          preload
          placeholder="blur"
          sizes="(min-width: 768px) 560px, 100vw"
          className={styles.image}
        />
      </div>
    </section>
  )
}
