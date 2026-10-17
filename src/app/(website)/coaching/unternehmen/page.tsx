import type { Metadata } from 'next'

import heroPortrait from '../../../../../public/images/fotos/portrait-sessel.jpg'
import whyPortrait from '../../../../../public/images/fotos/portrait-profil.jpg'
import leadershipImage from '../../../../../public/images/fotos/thema-leadership.jpg'
import resilienceImage from '../../../../../public/images/fotos/thema-resilienz.jpg'

import styles from '@/components/sections/company-page.module.css'
import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import { LongExposureFilters } from '@/components/ui/long-exposure-filters'
import { Closing } from '@/components/warm/closing'
import { ImageCard } from '@/components/warm/image-card'
import { Timeline } from '@/components/warm/timeline'
import warm from '@/components/warm/warm.module.css'
import { WarmHero } from '@/components/warm/warm-hero'
import { WhyMe } from '@/components/warm/why-me'
import {
  approach,
  belief,
  cta,
  focus,
  hero,
  hr,
  modules,
  problems,
  why,
} from '@/content/coaching-unternehmen'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Coaching für Unternehmen – Annika Matthaei',
  description:
    'Leadership sowie Gesundheit & Resilienz für Teams und Führungskräfte in Mittelstand und Konzern.',
  path: '/coaching/unternehmen',
  absoluteTitle: true,
})

const focusImages = {
  leadership: leadershipImage,
  resilienz: resilienceImage,
}

const number = (index: number) => String(index + 1).padStart(2, '0')

export default function CompanyCoachingPage() {
  return (
    <div data-warm-page className={warm.page}>
      <LongExposureFilters />

      <WarmHero
        id="company-hero"
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
        cta={{ label: hero.cta, href: '/kontakt' }}
        note={hero.note}
        image={heroPortrait}
        alt="Annika Matthaei im Sessel"
        photoSide="start"
        crop={{ position: 'center 36%', zoom: 1.27 }}
      />

      <section
        aria-labelledby="company-problems"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2 id="company-problems" className={`${warm.title} ${warm.titleEnd}`}>
          {problems.title}
        </h2>
        <ul className={styles.problems}>
          {problems.items.map((problem) => (
            <li key={problem.title} className={styles.problem}>
              <h3 className={styles.problemTitle}>{problem.title}</h3>
              <p className={styles.problemText}>{problem.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="company-focus"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2 id="company-focus" className={warm.title}>
          {focus.title}
        </h2>
        <ul className={styles.focusList}>
          {focus.items.map((item, index) => (
            <li key={item.key} className={styles.focusItem}>
              <ImageCard
                image={focusImages[item.key]}
                number={number(index)}
                title={item.title}
                lead={item.claim}
                shape="wide"
                sizes="(min-width: 900px) 560px, 100vw"
              />
              <ul className={`${warm.lines} ${styles.focusPoints}`}>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="company-belief"
        className={`${warm.band} ${styles.belief}`}
      >
        <h2 id="company-belief" className={styles.beliefLabel}>
          {belief.label}
        </h2>
        <p className={styles.beliefText}>{belief.text}</p>
      </section>

      <section
        aria-labelledby="company-approach"
        className={`${warm.section} ${styles.approach}`}
      >
        <div className={styles.approachHead}>
          <h2 id="company-approach" className={warm.title}>
            {approach.title}
          </h2>
          <p className={styles.approachText}>{approach.text}</p>
        </div>
        <Timeline steps={approach.steps} />
      </section>

      <div className={styles.offer}>
        <section aria-labelledby="company-modules">
          <h2 id="company-modules" className={styles.offerLabel}>
            {modules.title}
          </h2>
          <ul>
            {modules.items.map((item) => (
              <li key={item} className={styles.module}>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="company-hr" className={styles.hr}>
          <h2 id="company-hr" className={styles.offerLabel}>
            {hr.title}
          </h2>
          <ul className={styles.hrList}>
            {hr.points.map((point) => (
              <li key={point} className={styles.hrPoint}>
                {point}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <WhyMe
        id="company-why"
        label={why.label}
        title={why.title}
        text={why.text}
        facts={why.facts}
        image={whyPortrait}
        alt="Annika Matthaei im Profil"
        imagePosition="center 20%"
        photoSide="end"
      />

      {/* TODO: Auf den Buchungslink umstellen, sobald es einen gibt. */}
      <Closing
        id="company-contact"
        title={cta.title}
        text={cta.text}
        cta={cta.button}
      />

      <HomeStickyCta
        label={hero.cta}
        startId="company-hero-cta"
        endSelector="#company-contact a"
      />
    </div>
  )
}
