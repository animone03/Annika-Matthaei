import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../public/images/annika-sessel.jpeg'
import contactPortrait from '../../../public/images/annika-lachend.webp'

import { Arrow } from '@/components/ui/arrow'
import { Signature } from '@/components/ui/signature'
import {
  approaches,
  audiences,
  contact,
  facts,
  growth,
  hero,
  marquee,
  method,
  stats,
} from '@/content/startseite'

import { HomeStickyCta } from './home-sticky-cta'
import styles from './home-page.module.css'

const marqueeText = marquee.map((word) => `${word}  ·  `).join('')

const number = (index: number) => String(index + 1).padStart(2, '0')

type HomePageContentProps = {
  email?: string | null
}

export function HomePageContent({ email }: HomePageContentProps) {
  return (
    <div data-home data-frame-page className={styles.page}>
      <section aria-labelledby="home-title" className={styles.hero}>
        {/* Die Headline steht als zwei Wörter links und rechts vom Foto. Für
            Screenreader und Suchmaschinen gibt es sie einmal am Stück. */}
        <h1 id="home-title" className={styles.srOnly}>
          Fit for growth.
        </h1>
        <div className={styles.heroStage}>
          <div className={`${styles.heroCell} ${styles.heroCellFirst}`}>
            <span aria-hidden="true" className={styles.heroWord}>
              Fit for
            </span>
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src={heroPortrait}
              alt="Annika Matthaei im Sessel"
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 300px, 340px"
              className={styles.portrait}
            />
            <div className={styles.signature}>
              <Signature part="first" label="" className={styles.firstName} />
              <Signature part="last" label="" className={styles.lastName} />
            </div>
          </div>
          <div className={`${styles.heroCell} ${styles.heroCellLast}`}>
            <span aria-hidden="true" className={styles.heroWord}>
              Growth.
            </span>
          </div>
        </div>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <p className={styles.intro}>{hero.intro}</p>
          <Link id="home-hero-cta" href="/kontakt" className={styles.button}>
            {hero.cta}
          </Link>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

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

      <section aria-labelledby="home-growth" className={styles.growth}>
        <h2 id="home-growth" className={styles.growthTitle}>
          {growth.title}
        </h2>
        <ul className={styles.growthList}>
          {growth.items.map((item) => (
            <li key={item.question} className={styles.growthItem}>
              <h3 className={styles.growthQuestion}>{item.question}</h3>
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="home-audiences"
        className={`${styles.split} ${styles.audiences}`}
      >
        <h2 id="home-audiences" className={styles.label}>
          {audiences.label}
        </h2>
        <ul>
          {audiences.items.map((item, index) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.audienceRow}>
                <span className={styles.audienceNumber}>{number(index)}</span>
                <span className={styles.audienceText}>
                  <span className={styles.audienceTitle}>{item.title}</span>
                  <span className={styles.audienceSub}>{item.text}</span>
                </span>
                <Arrow className={styles.audienceArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-method" className={styles.method}>
        <div className={styles.split}>
          <p className={styles.label}>{method.label}</p>
          <div className={styles.sectionHead}>
            <h2 id="home-method" className={styles.methodTitle}>
              {method.title}
            </h2>
            <p className={styles.sectionText}>{method.text}</p>
          </div>
        </div>
        <ol className={styles.steps}>
          {method.steps.map((step) => (
            <li key={step.letter} className={styles.step}>
              <span aria-hidden="true" className={styles.stepLetter}>
                {step.letter}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="home-approaches"
        className={`${styles.split} ${styles.approaches}`}
      >
        <p className={styles.label}>{approaches.label}</p>
        <div className={styles.approachesBody}>
          <div className={styles.sectionHead}>
            <h2 id="home-approaches" className={styles.approachesTitle}>
              {approaches.title}
            </h2>
            <p className={styles.sectionText}>{approaches.text}</p>
          </div>
          <ul className={styles.approachList}>
            {approaches.items.map((item) => (
              <li key={item} className={styles.approach}>
                <Arrow className={styles.approachArrow} />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/kontakt" className={styles.button}>
            {approaches.cta}
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="home-stats"
        className={`${styles.split} ${styles.stats}`}
      >
        <h2 id="home-stats" className={styles.label}>
          {stats.label}
        </h2>
        <ul className={styles.statList}>
          {stats.items.map((stat) => (
            <li key={stat.value} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
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
        <Image
          src={contactPortrait}
          alt="Annika Matthaei lachend"
          placeholder="blur"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 240px, 220px"
          className={styles.contactPortrait}
        />
        <div className={styles.contactBody}>
          <h2 id="home-contact-title" className={styles.contactTitle}>
            {contact.title}
          </h2>
          <p className={styles.contactText}>{contact.text}</p>
          <Link href="/kontakt" className={styles.contactButton}>
            {contact.cta} <Arrow />
          </Link>
        </div>
      </section>

      <HomeStickyCta email={email} label={hero.cta} startId="home-hero-cta" />
    </div>
  )
}
