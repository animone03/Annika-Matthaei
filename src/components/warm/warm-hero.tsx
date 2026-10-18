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
  cta: { label: string; href: Route }
  note: string
  image: StaticImageData
  alt: string
  /** Foto links (Unternehmen) oder rechts (Startups) */
  photoSide: 'start' | 'end'
  /** Bildausschnitt, z. B. Zoom 127 % bei 36 % wie beim Sesselfoto */
  crop?: { position: string; zoom?: number }
  /** Mobil: Format und Ausschnitt des Fotos (04_mobile, Tabelle Bildformate) */
  mobilePhoto: { aspectRatio: string; position: string }
}

// Hero der Unterseiten im Design 10b. Die Überschrift bekommt die id
// (Startpunkt der mobilen Kontaktleiste), der Button `${id}-cta`. Mobil steht
// das Foto oben, der Button entfällt dort zugunsten der festen Leiste.
export function WarmHero({
  id,
  eyebrow,
  title,
  intro,
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
          <p className={styles.intro}>{intro}</p>
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
