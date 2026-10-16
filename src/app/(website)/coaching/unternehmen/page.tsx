import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../../../public/images/annika-sessel.jpeg'

import { StartupStickyCta } from '@/components/sections/startup-sticky-cta'
import base from '@/components/sections/startups-page.module.css'
import styles from '@/components/sections/leadership-page.module.css'
import {
  approach,
  belief,
  cta,
  hero,
  hr,
  problems,
  why,
} from '@/content/coaching-unternehmen'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Leadership & Teamentwicklung für Unternehmen – Annika Matthaei',
  description:
    'Coaching, Workshops und Teamentwicklung für Teams, Abteilungen und Führungskräfte. Systemisch, agil, stärkenorientiert.',
  path: '/coaching/unternehmen',
  absoluteTitle: true,
})

const number = (index: number) => String(index + 1).padStart(2, '0')

// Aufbau wie /coaching/startups, darum teilen sich beide Seiten die Grundstile.
export default function CompanyCoachingPage() {
  return (
    <div data-frame-page data-coaching-page className={base.page}>
      <section
        aria-labelledby="company-title"
        className={`${base.hero} ${styles.hero}`}
      >
        <p className={base.heroLabel}>{hero.label}</p>
        <h1 id="company-title" className={base.heroTitle}>
          {hero.title}
        </h1>
        <div className={base.heroRow}>
          <p className={`${base.heroIntro} ${styles.heroIntro}`}>
            <span className={base.desktopOnly}>{hero.intro}</span>
            <span className={base.mobileOnly}>{hero.mobileIntro}</span>
          </p>
          <Link href="/kontakt" className={base.darkButton}>
            Kennenlernen
          </Link>
        </div>
      </section>

      <section aria-labelledby="problems-title" className={base.split}>
        <h2 id="problems-title" className={base.label}>
          {problems.label}
        </h2>
        <ul className={base.problems}>
          {problems.items.map((problem) => (
            <li key={problem.title} className={styles.problem}>
              <span className={base.problemTitle}>{problem.title}</span>
              <span className={base.problemText}>{problem.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="belief-title" className={styles.belief}>
        <h2 id="belief-title" className={styles.beliefLabel}>
          {belief.label}
        </h2>
        <p className={styles.beliefText}>{belief.text}</p>
      </section>

      <section aria-labelledby="approach-title" className={styles.approach}>
        <div className={base.split}>
          <p className={base.label}>{approach.label}</p>
          <div className={styles.approachHead}>
            <h2 id="approach-title" className={base.sectionTitle}>
              {approach.title}
            </h2>
            <p className={styles.approachText}>{approach.text}</p>
          </div>
        </div>
        <div className={base.split}>
          <span aria-hidden="true" />
          <ol className={styles.steps}>
            {approach.steps.map((step, index) => (
              <li
                key={step.title}
                className={`${styles.step} ${styles[step.tone]}`}
              >
                <span className={styles.stepNumber}>{number(index)}</span>
                <span className={styles.stepBody}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepText}>{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={`${base.split} ${styles.modulesRow}`}>
          <h3 className={base.label}>{approach.modulesLabel}</h3>
          <ul className={styles.tags}>
            {approach.modules.map((module) => (
              <li key={module.label} className={styles.tag}>
                {'mobile' in module ? (
                  <>
                    <span className={base.desktopOnly}>{module.label}</span>
                    <span className={base.mobileOnly}>{module.mobile}</span>
                  </>
                ) : (
                  module.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="hr-title" className={styles.hr}>
        <div className={styles.hrIntro}>
          <p className={base.label}>{hr.label}</p>
          <h2 id="hr-title" className={styles.hrTitle}>
            {hr.title}
          </h2>
          <p className={styles.hrText}>
            <span className={base.desktopOnly}>{hr.text}</span>
            <span className={base.mobileOnly}>{hr.mobileText}</span>
          </p>
        </div>
        <ol className={styles.hrPoints}>
          {hr.points.map((point, index) => (
            <li key={point} className={styles.hrPoint}>
              <span className={styles.hrNumber}>{number(index)}</span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="why-title" className={base.why}>
        <Image
          src={portrait}
          alt="Annika Matthaei, sitzend in einem Sessel"
          placeholder="blur"
          sizes="(min-width: 768px) 360px, 100vw"
          className={`${base.whyPhoto} ${styles.whyPhoto}`}
        />
        <div className={base.whyBody}>
          <p className={base.label}>{why.label}</p>
          <h2 id="why-title" className={base.sectionTitle}>
            {why.title}
          </h2>
          <div className={styles.whyDesktop}>
            <ul className={base.facts}>
              {why.facts.map((fact) => (
                <li key={fact.value} className={base.fact}>
                  <span className={base.factValue}>{fact.value}</span>
                  <span className={base.factText}>{fact.text}</span>
                </li>
              ))}
            </ul>
            <p className={base.whyText}>{why.text}</p>
          </div>
          <p className={`${base.whyText} ${styles.whyMobile}`}>
            {why.mobileText}
          </p>
        </div>
      </section>

      <section
        id="company-contact"
        aria-labelledby="company-contact-title"
        className={base.cta}
      >
        <h2 id="company-contact-title" className={base.ctaTitle}>
          {cta.title}
        </h2>
        <div className={base.ctaBody}>
          <p>
            <span className={base.desktopOnly}>{cta.text}</span>
            <span className={base.mobileOnly}>{cta.mobileText}</span>
          </p>
          {/* TODO: Auf den Buchungslink umstellen, sobald es einen gibt. */}
          <Link
            href="/kontakt"
            className={`${base.ctaButton} ${styles.ctaButton}`}
          >
            {cta.button}
          </Link>
        </div>
      </section>

      <StartupStickyCta />
    </div>
  )
}
