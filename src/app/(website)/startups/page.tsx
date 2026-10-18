import type { Metadata } from 'next'
import Link from 'next/link'

import heroPortrait from '../../../../public/images/fotos/portrait-whiteboard.jpg'
import whyPortrait from '../../../../public/images/fotos/portrait-lachend.jpg'
import founderImage from '../../../../public/images/fotos/thema-founder.jpg'
import leadershipImage from '../../../../public/images/fotos/thema-leadership.jpg'
import resilienceImage from '../../../../public/images/fotos/thema-resilienz.jpg'

import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import styles from '@/components/sections/startups-page.module.css'
import { Arrow } from '@/components/ui/arrow'
import { LongExposureFilters } from '@/components/ui/long-exposure-filters'
import { Carousel } from '@/components/warm/carousel'
import { Closing } from '@/components/warm/closing'
import { ImageCard } from '@/components/warm/image-card'
import { themeCrops } from '@/components/warm/theme-crops'
import warm from '@/components/warm/warm.module.css'
import { WarmHero } from '@/components/warm/warm-hero'
import { WhyMe } from '@/components/warm/why-me'
import {
  changes,
  contact,
  faq,
  fit,
  hero,
  journey,
  offers,
  quotes,
  stat,
  themes,
  why,
} from '@/content/startups'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Coaching für Startups & Founder – Annika Matthaei',
  description:
    'Mentale Fitness für Founder-Teams: Founder 1:1, Founders in Sync und Lead with Clarity. Über EXIST finanzierbar.',
  path: '/startups',
  absoluteTitle: true,
})

const themeImages = {
  founder: founderImage,
  leadership: leadershipImage,
  resilienz: resilienceImage,
}

const toneClass = {
  sand: styles.offerSand,
  coal: styles.offerCoal,
  stone: styles.offerStone,
}

export default function StartupsPage() {
  return (
    <div data-warm-page data-startups-page className={warm.page}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
      <LongExposureFilters />

      <WarmHero
        id="startups-hero"
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
        cta={{ label: hero.cta, href: '/kontakt' }}
        note={hero.note}
        image={heroPortrait}
        alt="Annika Matthaei vor einem Whiteboard"
        photoSide="end"
        mobilePhoto={{ aspectRatio: '16 / 10', position: '52% 4%', zoom: 1.2 }}
      />

      <section
        aria-labelledby="startups-quotes"
        className={`${warm.section} ${styles.quotes}`}
      >
        <div className={styles.quotesHead}>
          <h2 id="startups-quotes" className={warm.title}>
            {quotes.title}
          </h2>
          <p className={styles.bridge}>{quotes.bridge}</p>
        </div>
        <ul className={styles.quoteList}>
          {quotes.items.map((quote) => (
            <li key={quote} className={styles.quote}>
              „{quote}“
            </li>
          ))}
        </ul>
        {/* Mobil: die Zitate als Karussell */}
        <Carousel
          label={quotes.title}
          className={styles.quotesCarousel}
          cardClassName={styles.quoteCard}
          items={quotes.items.map((quote, index) => ({
            key: quote,
            content: (
              <>
                <span aria-hidden="true" className={styles.quoteMark}>
                  „
                </span>
                <q className={styles.quoteText}>{quote}</q>
                <span className={styles.quoteCount}>
                  {index + 1} / {quotes.items.length}
                </span>
              </>
            ),
          }))}
        />
      </section>

      <section
        aria-labelledby="startups-stat"
        className={`${warm.band} ${styles.stat}`}
      >
        <p className={styles.statValue}>{stat.value}</p>
        <div className={styles.statBody}>
          <h2 id="startups-stat" className={styles.statClaim}>
            {stat.claim}
          </h2>
          <p className={styles.statText}>{stat.text}</p>
          <p className={styles.statSource}>{stat.source}</p>
        </div>
      </section>

      <section
        id="themen"
        aria-labelledby="startups-themes"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2 id="startups-themes" className={`${warm.title} ${warm.titleEnd}`}>
          {themes.title}
        </h2>
        <ul className={styles.themeList}>
          {themes.items.map((theme) => (
            <li key={theme.key} className={styles.theme}>
              <ImageCard
                image={themeImages[theme.key]}
                title={theme.title}
                lead={theme.claim}
                sizes="(min-width: 900px) 360px, 100vw"
                mobileCrop={themeCrops[theme.key]}
              />
              <ul className={`${warm.lines} ${styles.themePoints}`}>
                {theme.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {/* Mobil: die Punkte zum Aufklappen */}
              <details className={styles.themeMore}>
                <summary className={styles.themeSummary}>
                  Woran wir arbeiten
                  <span aria-hidden="true" className={styles.plus}>
                    +
                  </span>
                </summary>
                <ul className={warm.lines}>
                  {theme.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </details>
              <p className={styles.themeFocus}>{theme.focus}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="startups-offers"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2 id="startups-offers" className={warm.title}>
          {offers.title}
        </h2>
        <ul className={styles.offerList}>
          {offers.items.map((offer) => (
            <li key={offer.href}>
              <Link
                href={offer.href}
                className={`${styles.offer} ${toneClass[offer.tone]}`}
              >
                <span className={styles.offerLabel}>{offer.label}</span>
                <span className={styles.offerQuestion}>„{offer.question}“</span>
                <span className={styles.offerTags}>
                  {offer.tags.join(' · ')}
                </span>
                <span className={styles.offerTitle}>
                  {offer.title}
                  <Arrow className={styles.offerArrow} />
                </span>
                <span className={styles.offerText}>{offer.text}</span>
                <span className={styles.offerFormat}>{offer.format}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="startups-journey"
        className={`${warm.section} ${styles.stack}`}
      >
        <h2
          id="startups-journey"
          className={`${warm.title} ${warm.titleCenter}`}
        >
          {journey.title}
        </h2>
        <ol className={styles.stages}>
          {journey.stages.map((stage) => (
            <li key={stage.title} className={styles.stage}>
              <span className={warm.label}>{stage.label}</span>
              <h3 className={styles.stageTitle}>{stage.title}</h3>
              <p className={styles.stageText}>{stage.text}</p>
              <p className={styles.stageFriction}>
                <strong>Oft hakt es an:</strong> {stage.friction}
              </p>
              <p className={styles.stageOffers}>
                <span className={warm.srOnly}>Passende Angebote: </span>
                {stage.offers.join(' · ')}
              </p>
            </li>
          ))}
        </ol>
        <Link href={journey.exist.href} className={styles.exist}>
          <span className={styles.existText}>
            <span className={styles.existTitle}>{journey.exist.title}</span>
            <span className={styles.existBody}>{journey.exist.text}</span>
          </span>
          <span className={`${warm.link} ${styles.existCta}`}>
            {journey.exist.cta}
          </span>
        </Link>
      </section>

      <div className={`${warm.section} ${styles.outlook}`}>
        <section aria-labelledby="startups-changes">
          <h2 id="startups-changes" className={styles.outlookTitle}>
            {changes.title}
          </h2>
          <ul>
            {changes.items.map((item) => (
              <li key={item} className={styles.change}>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="startups-fit" className={styles.fit}>
          <h2 id="startups-fit" className={styles.outlookTitle}>
            {fit.title}
          </h2>
          <div className={`${styles.fitBox} ${styles.fitYes}`}>
            <h3 className={styles.fitTitle}>{fit.yes.title}</h3>
            <ul className={styles.fitList}>
              {fit.yes.items.map((item) => (
                <li key={item}>… {item}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.fitBox} ${styles.fitNo}`}>
            <h3 className={styles.fitTitle}>{fit.no.title}</h3>
            <ul className={styles.fitList}>
              {fit.no.items.map((item) => (
                <li key={item}>… {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <WhyMe
        id="startups-why"
        label={why.label}
        title={why.title}
        text={why.text}
        facts={why.facts}
        image={whyPortrait}
        alt="Annika Matthaei lachend"
        imagePosition="center 18%"
        mobileImage={{ position: '50% 18%', zoom: 1.15 }}
        photoSide="start"
      />

      <section
        aria-labelledby="startups-faq"
        className={`${warm.section} ${styles.faq}`}
      >
        <h2 id="startups-faq" className={warm.title}>
          {faq.title}
        </h2>
        <div className={styles.faqList}>
          {faq.items.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                {item.question}
                <span aria-hidden="true" className={styles.faqIcon}>
                  +
                </span>
              </summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <Closing
        id="startups-contact"
        title={contact.title}
        text={contact.text}
        cta={contact.cta}
        mobileCta={hero.cta}
      />

      <HomeStickyCta
        label={hero.cta}
        startId="startups-hero-cta"
        endSelector="#startups-contact"
      />
    </div>
  )
}
