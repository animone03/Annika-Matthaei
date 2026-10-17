import Image, { type StaticImageData } from 'next/image'

import warm from './warm.module.css'
import styles from './why-me.module.css'

type WhyMeProps = {
  id: string
  label: string
  title: string
  text: string
  facts: { value: string; text: string }[]
  image: StaticImageData
  alt: string
  /** object-position des Fotos */
  imagePosition?: string
  photoSide: 'start' | 'end'
}

// „Warum ich“ mit Foto und drei Zahlen (Startups, Unternehmen)
export function WhyMe({
  id,
  label,
  title,
  text,
  facts,
  image,
  alt,
  imagePosition,
  photoSide,
}: WhyMeProps) {
  return (
    <section
      aria-labelledby={id}
      className={`${warm.section} ${styles.why} ${
        photoSide === 'end' ? styles.photoEnd : ''
      }`}
    >
      <div className={styles.photo}>
        <Image
          src={image}
          alt={alt}
          placeholder="blur"
          sizes="(min-width: 768px) 400px, 100vw"
          className={styles.image}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </div>
      <div className={styles.body}>
        <p className={warm.label}>{label}</p>
        <h2 id={id} className={`${warm.title} ${styles.title}`}>
          {title}
        </h2>
        <p className={styles.text}>{text}</p>
        <ul className={styles.facts}>
          {facts.map((fact) => (
            <li key={fact.text} className={styles.fact}>
              <span className={styles.value}>{fact.value}</span>
              <span className={styles.factText}>{fact.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
