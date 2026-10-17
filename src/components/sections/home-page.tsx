import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import heroPortrait from '../../../public/images/startseite/portrait-sessel.jpg'
import runningPhoto from '../../../public/images/startseite/laufbild-warm.jpg'
import methodsPortrait from '../../../public/images/startseite/portrait-lachend.jpg'
import processPortrait from '../../../public/images/startseite/portrait-workspace.jpg'
import founderImage from '../../../public/images/startseite/thema-founder.jpg'
import leadershipImage from '../../../public/images/startseite/thema-leadership.jpg'
import resilienceImage from '../../../public/images/startseite/thema-resilienz.jpg'

import { Arrow } from '@/components/ui/arrow'
import { LongExposureFilters } from '@/components/ui/long-exposure-filters'
import {
  ablauf,
  contact,
  facts,
  hero,
  methods,
  stats,
  themes,
} from '@/content/startseite'

import { HomeStickyCta } from './home-sticky-cta'
import { ProcessTabs } from './process-tabs'
import styles from './home-page.module.css'

const themeImages = {
  founder: founderImage,
  leadership: leadershipImage,
  resilienz: resilienceImage,
}

type HomePageContentProps = {
  email?: string | null
}

export function HomePageContent({ email }: HomePageContentProps) {
  return (
    <div data-home className={styles.page}>
      <LongExposureFilters />

      <section aria-labelledby="home-title" className={styles.hero}>
        <div className={styles.heroPhoto}>
          <Image
            src={heroPortrait}
            alt="Annika Matthaei im Sessel"
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 510px, (min-width: 768px) 400px, 130vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroBody}>
          <div className={styles.heroHead}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 id="home-title" className={styles.heroTitle}>
              {hero.title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? ' ' : null}
                  <span className={styles.heroLine}>{line}</span>
                </Fragment>
              ))}
            </h1>
          </div>
          <div className={styles.heroFoot}>
            <div className={styles.heroRun}>
              <Image
                src={runningPhoto}
                alt="Annika Matthaei beim Laufen"
                loading="eager"
                placeholder="blur"
                sizes="(min-width: 1024px) 200px, (min-width: 768px) 140px, 50vw"
                className={styles.runImage}
              />
            </div>
            <p className={styles.claim}>
              {hero.claim.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? (
                    <>
                      {' '}
                      <br />
                    </>
                  ) : null}
                  {line}
                </Fragment>
              ))}
            </p>
            <Link
              id="home-hero-cta"
              href="/kontakt"
              className={`${styles.link} ${styles.heroCta}`}
            >
              {hero.cta}
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Erfahrung" className={styles.facts}>
        <ul className={styles.factList}>
          {facts.map((fact) => (
            <li key={fact.value} className={styles.fact}>
              <span className={styles.factValue}>{fact.value}</span>
              <span className={styles.factText}>{fact.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-themes" className={styles.themes}>
        <h2 id="home-themes" className={`${styles.title} ${styles.titleEnd}`}>
          {themes.title}
        </h2>
        <ul className={styles.themeList}>
          {themes.items.map((item) => (
            <li key={item.key} className={styles.theme}>
              <div className={styles.themeMedia}>
                <Image
                  src={themeImages[item.key]}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 900px) 360px, 100vw"
                  className={styles.themeImage}
                />
                <Link href={themes.href} className={styles.themeLink}>
                  <h3 className={styles.themeTitle}>{item.title}</h3>
                  <span className={styles.themeLead}>{item.lead}</span>
                  <span className={styles.themeMore}>
                    {themes.more} <Arrow className={styles.themeArrow} />
                  </span>
                </Link>
              </div>
              <p className={styles.themeQuestion}>{item.question}</p>
              <p className={styles.themeTags}>{item.tags.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-methods" className={styles.methods}>
        <h2
          id="home-methods"
          className={`${styles.title} ${styles.methodsTitle}`}
        >
          {methods.title}
        </h2>
        <div className={styles.methodsIntro}>
          <p className={styles.methodsLead}>{methods.lead}</p>
          <p className={styles.methodsText}>{methods.text}</p>
        </div>
        <div className={styles.methodsPhoto}>
          <Image
            src={methodsPortrait}
            alt="Annika Matthaei lachend"
            placeholder="blur"
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 480px, 100vw"
            className={styles.methodsImage}
          />
        </div>
        <ul className={styles.methodList}>
          {methods.items.map((item) => (
            <li key={item} className={styles.method}>
              {item}
            </li>
          ))}
        </ul>
        <Link href="/kontakt" className={`${styles.link} ${styles.methodsCta}`}>
          {methods.cta}
        </Link>
        <Link href={methods.company.href} className={styles.company}>
          <span className={styles.companyLabel}>{methods.company.label}</span>
          <span className={styles.companyText}>
            {methods.company.text}{' '}
            <span className={styles.companyCta}>{methods.company.cta}</span>
          </span>
        </Link>
      </section>

      <section aria-labelledby="home-process" className={styles.process}>
        <h2 id="home-process" className={`${styles.title} ${styles.titleEnd}`}>
          {ablauf.title}
        </h2>
        <ProcessTabs
          tabs={ablauf.tabs}
          photo={
            <Image
              src={processPortrait}
              alt="Annika Matthaei an ihrem Arbeitsplatz"
              placeholder="blur"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 280px, 100vw"
              className={styles.processImage}
            />
          }
          cta={
            <Link
              href="/kontakt"
              className={`${styles.button} ${styles.processCta}`}
            >
              {ablauf.cta}
            </Link>
          }
        />
      </section>

      <section aria-labelledby="home-stats" className={styles.stats}>
        <h2 id="home-stats" className={styles.title}>
          {stats.title}
        </h2>
        <ul className={styles.statList}>
          {stats.items.map((stat) => (
            <li key={stat.value} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statClaim}>{stat.claim}</span>
              <span className={styles.statText}>{stat.text}</span>
              <span className={styles.statSource}>{stat.source}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="home-contact"
        aria-labelledby="home-contact-title"
        className={styles.contact}
      >
        <h2 id="home-contact-title" className={styles.contactTitle}>
          {contact.title}
        </h2>
        <div className={styles.contactRow}>
          <p className={styles.contactText}>{contact.text}</p>
          <Link
            href="/kontakt"
            className={`${styles.link} ${styles.contactLink}`}
          >
            {contact.cta}
          </Link>
        </div>
      </section>

      <HomeStickyCta email={email} label={hero.cta} startId="home-hero-cta" />
    </div>
  )
}
