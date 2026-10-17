import type { Metadata } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'

import portrait from '../../../../public/images/fotos/portrait-lachend.jpg'
import runningPhoto from '../../../../public/images/fotos/laufbild-warm.jpg'

import styles from '@/components/sections/about-page.module.css'
import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import { LongExposureFilters } from '@/components/ui/long-exposure-filters'
import { Closing } from '@/components/warm/closing'
import warm from '@/components/warm/warm.module.css'
import {
  career,
  contact,
  drive,
  hero,
  intro,
  skills,
  stance,
} from '@/content/ueber-mich'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title:
    'Über mich – Annika Matthaei | Systemischer & psychologischer Business Coach',
  description:
    '13 Jahre in Konzern, Mittelstand und Startup, 9 davon in Führung. Heute begleite ich Founder und Teams zu mehr mentaler Fitness.',
  path: '/ueber-mich',
  absoluteTitle: true,
})

const toneClass = {
  sand: styles.stanceSand,
  coal: styles.stanceCoal,
  stone: styles.stanceStone,
}

const number = (index: number) => String(index + 1).padStart(2, '0')

export default function AboutPage() {
  return (
    <div data-warm-page className={warm.page}>
      <LongExposureFilters />

      {/* Ab 1024 px liegt der Header über der beigen Hälfte
          (site-header.module.css). */}
      <section aria-labelledby="about-title" className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="about-title" className={styles.heroTitle}>
            {hero.title.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? ' ' : null}
                <span className={styles.heroLine}>{line}</span>
              </Fragment>
            ))}
          </h1>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={portrait}
            alt="Annika Matthaei lachend"
            preload
            placeholder="blur"
            sizes="(min-width: 768px) 520px, 100vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section aria-label="Über Annika" className={styles.intro}>
        <p className={styles.introLead}>{intro.lead}</p>
        <div className={styles.introBody}>
          <p className={styles.introText}>{intro.text}</p>
          <ul className={styles.facts}>
            {intro.facts.map((fact) => (
              <li key={fact.value} className={styles.fact}>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factText}>{fact.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="about-stance"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2 id="about-stance" className={`${warm.title} ${warm.titleEnd}`}>
          {stance.title}
        </h2>
        <ul className={styles.stanceList}>
          {stance.items.map((item, index) => (
            <li
              key={item.title}
              className={`${styles.stanceItem} ${toneClass[item.tone]}`}
            >
              <span aria-hidden="true" className={styles.stanceNumber}>
                {number(index)}
              </span>
              <h3 className={styles.stanceTitle}>{item.title}</h3>
              <p className={styles.stanceText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="about-drive"
        className={`${warm.section} ${styles.drive}`}
      >
        <div className={styles.driveBody}>
          <div className={styles.driveHead}>
            <h2 id="about-drive" className={warm.label}>
              {drive.label}
            </h2>
            <p className={styles.driveStatement}>{drive.statement}</p>
          </div>
          <p className={styles.driveText}>{drive.text}</p>
        </div>
        <div className={styles.drivePhoto}>
          <Image
            src={runningPhoto}
            alt="Annika Matthaei beim Halbmarathon"
            placeholder="blur"
            sizes="(min-width: 768px) 360px, 100vw"
            className={styles.driveImage}
          />
        </div>
      </section>

      <section
        aria-labelledby="about-skills"
        className={`${warm.section} ${styles.skills}`}
      >
        {/* Mobil ein Kohle-Band mit nummerierten Zeilen */}
        <div className={styles.skillsHead}>
          <h2 id="about-skills" className={warm.title}>
            {skills.title}
          </h2>
          <span aria-hidden="true" className={styles.skillCount}>
            {number(skills.items.length - 1)}
          </span>
        </div>
        <ul className={styles.skillList}>
          {skills.items.map((skill, index) => (
            <li key={skill} className={styles.skill}>
              <span aria-hidden="true" className={styles.skillNumber}>
                {number(index)}
              </span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="about-career"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2 id="about-career" className={`${warm.title} ${warm.titleCenter}`}>
          {career.title}
        </h2>
        <div className={styles.career}>
          <div className={styles.stations}>
            <h3 className={styles.careerLabel}>{career.stations.title}</h3>
            <ul>
              {career.stations.items.map((item) => (
                <li key={item.period} className={styles.entry}>
                  <span className={styles.entryPeriod}>{item.period}</span>
                  {/* Mobil: Punkt und Linie des Zeitstrahls */}
                  <span aria-hidden="true" className={styles.entryMarker} />
                  <span className={styles.entryTitle}>{item.title}</span>
                  <span className={styles.entryDetail}>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.education}>
            <h3 className={styles.careerLabel}>{career.education.title}</h3>
            <ul>
              {career.education.items.map((item) => (
                <li key={item.title} className={styles.entry}>
                  <span className={styles.entryTitle}>
                    <span className={warm.desktopOnly}>{item.title}</span>
                    <span className={warm.mobileOnly}>{item.short.title}</span>
                  </span>
                  <span className={styles.entryMuted}>
                    <span className={warm.desktopOnly}>{item.detail}</span>
                    <span className={warm.mobileOnly}>{item.short.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Closing
        id="about-contact"
        title={contact.title}
        text={contact.text}
        cta={contact.cta}
      />

      <HomeStickyCta
        label={contact.cta}
        startId="about-title"
        endSelector="#about-contact a"
      />
    </div>
  )
}
