import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import heroPortrait from '../../../public/images/fotos/portrait-sessel.jpg'
import runningPhoto from '../../../public/images/fotos/laufbild-warm.jpg'
import methodsPortrait from '../../../public/images/fotos/portrait-lachend.jpg'
import processPortrait from '../../../public/images/fotos/portrait-whiteboard.jpg'
import founderImage from '../../../public/images/fotos/thema-founder.jpg'
import leadershipImage from '../../../public/images/fotos/thema-leadership.jpg'
import resilienceImage from '../../../public/images/fotos/thema-resilienz.jpg'

import { Arrow } from '@/components/ui/arrow'
import { LongExposureFilters } from '@/components/ui/long-exposure-filters'
import { Carousel } from '@/components/warm/carousel'
import { Closing } from '@/components/warm/closing'
import { ImageCard } from '@/components/warm/image-card'
import warm from '@/components/warm/warm.module.css'
import {
  ablauf,
  company,
  contact,
  facts,
  hero,
  methods,
  performance,
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

export function HomePageContent() {
  return (
    <div data-warm-page className={`${warm.page} ${styles.home}`}>
      <LongExposureFilters />

      <section aria-labelledby="home-title" className={styles.hero}>
        <div className={styles.heroStage}>
          <Image
            src={heroPortrait}
            alt="Annika Matthaei im Sessel"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroText}>
            <h1 id="home-title" className={styles.heroTitle}>
              {hero.title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? ' ' : null}
                  <span className={styles.heroLine}>{line}</span>
                </Fragment>
              ))}
            </h1>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
          </div>
        </div>
        {/* Desktop auf dem Foto unten rechts, mobil darunter */}
        <div className={styles.heroAction}>
          <Link
            id="home-hero-cta"
            href="/kontakt"
            className={`${warm.button} ${warm.buttonLarge} ${styles.heroButton}`}
          >
            {hero.cta}
          </Link>
          <span className={styles.heroNote}>{hero.note}</span>
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
        <h2 id="home-themes" className={`${warm.title} ${warm.titleEnd}`}>
          {themes.title}
        </h2>
        <ul className={styles.themeList}>
          {themes.items.map((item) => (
            <li key={item.key} className={styles.theme}>
              <ImageCard
                image={themeImages[item.key]}
                title={item.title}
                lead={item.lead}
                link={{ href: themes.href, label: themes.more }}
                sizes="(min-width: 900px) 360px, 100vw"
              />
              <p className={styles.themeQuestion}>{item.question}</p>
              <p className={styles.themeTags}>{item.tags.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.companyStrip}>
        <Link href={company.href} className={styles.company}>
          <span className={styles.companyText}>
            <span className={styles.companyLabel}>{company.label}</span>
            <span className={styles.companyBody}>{company.text}</span>
          </span>
          <span className={`${warm.link} ${styles.companyCta}`}>
            {company.cta} <Arrow />
          </span>
        </Link>
      </div>

      <section aria-labelledby="home-methods" className={styles.methods}>
        <h2
          id="home-methods"
          className={`${warm.title} ${styles.methodsTitle}`}
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
            sizes="(min-width: 768px) 480px, 100vw"
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
        {/* Mobil: die Methoden als Karussell mit drei Feldern */}
        <Carousel
          label={methods.title}
          className={styles.methodsCarousel}
          cardClassName={styles.methodGroup}
          hint={methods.swipeHint}
          items={methods.groups.map((group) => ({
            key: group.number,
            content: (
              <>
                <span className={styles.methodGroupNumber}>{group.number}</span>
                <span className={styles.methodGroupTitle}>{group.title}</span>
                <ul>
                  {group.items.map((item) => (
                    <li key={item} className={styles.methodGroupItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ),
          }))}
        />
        <Link href="/kontakt" className={`${warm.link} ${styles.methodsCta}`}>
          {methods.cta}
        </Link>
      </section>

      <div className={styles.performance}>
        <div className={styles.performancePhoto}>
          <Image
            src={runningPhoto}
            alt="Annika Matthaei beim Laufen"
            placeholder="blur"
            sizes="(min-width: 768px) 260px, 50vw"
            className={styles.performanceImage}
          />
        </div>
        <div className={styles.performanceBody}>
          <p className={styles.performanceText}>{performance.text}</p>
          <Link href={performance.href} className={warm.link}>
            {performance.cta}
          </Link>
        </div>
      </div>

      <section aria-labelledby="home-process" className={styles.process}>
        <h2 id="home-process" className={warm.title}>
          {ablauf.title}
        </h2>
        <ProcessTabs
          tabs={ablauf.tabs}
          photo={
            <Image
              src={processPortrait}
              alt="Annika Matthaei vor einem Whiteboard"
              placeholder="blur"
              sizes="(min-width: 768px) 400px, 100vw"
              className={styles.processImage}
            />
          }
          cta={
            <Link
              href="/kontakt"
              className={`${warm.button} ${styles.processCta}`}
            >
              {ablauf.cta}
            </Link>
          }
        />
      </section>

      <section aria-labelledby="home-stats" className={styles.stats}>
        <h2 id="home-stats" className={warm.title}>
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

      <Closing
        id="home-contact"
        title={contact.title}
        text={contact.text}
        cta={contact.cta}
        variant="link"
      />

      <HomeStickyCta label={hero.cta} startId="home-hero-cta" visibleAtStart />
    </div>
  )
}
