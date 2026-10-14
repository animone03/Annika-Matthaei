import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../../public/images/annika-lachend.webp'

import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import styles from '@/components/sections/about-page.module.css'
import { SkillsMarquee } from '@/components/sections/skills-marquee'
import {
  IWanna,
  IWannaSeeYouGrow,
  SeeYouGrow,
} from '@/components/ui/handwriting'
import { Signature } from '@/components/ui/signature'
import { inquiryRecipient } from '@/lib/inquiry'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Über mich – Annika Matthaei | Systemischer Coach & Marketing',
  description:
    'Systemischer & psychologischer Business Coach und Marketing-Strategin mit 13 Jahren Erfahrung in Konzern, Mittelstand und Startup, davon 9 in Führung.',
  path: '/ueber-mich',
  absoluteTitle: true,
})

const lead =
  'Ich liebe es, wenn Menschen über sich hinauswachsen, Teams in ihren Flow finden und aus einer mutigen Idee etwas Reales wird.'

const introText =
  'Wenn ihr gemeinsam etwas schafft, das vorher unmöglich schien. Genau dabei möchte ich euch begleiten. Ich bringe viel Energie, Kreativität und Empathie mit. Ich denke in Möglichkeiten, frage nach und freue mich, wenn eure Projekte erfolgreich umgesetzt werden.'

// Aktuellste Station zuerst. Bei Selbstständigkeit steht die Tätigkeit in der Mitte, sonst die Firma.
const stations = [
  {
    period: 'Seit 2026',
    title: 'Systemisches Coaching',
    detail: 'Selbstständig',
  },
  {
    period: 'Seit 2025',
    title: 'Marketing-Beratung & Markenentwicklung',
    detail: 'Selbstständig',
  },
  {
    period: '2022 – 2026',
    title: 'Ehrmann Wohn- und Einrichtungs GmbH',
    detail: 'Abteilungsleiterin · Aufbau der Abteilung Nachhaltigkeit',
  },
  {
    period: '2019 – 2021',
    title: 'Performance One AG',
    detail: 'Beraterin Digitales Marketing',
  },
  {
    period: '2013 – 2018',
    title: 'Peek & Cloppenburg',
    detail:
      'Stellv. Abteilungsleiterin & Abteilungsleiterin · Wien / Düsseldorf',
  },
]

const education = [
  {
    title: 'Systemischer & psychologischer Business Coach',
    detail: 'DACTE · 2026',
  },
  {
    title: 'Sustainability Management Expert',
    detail:
      'Leuphana Universität Lüneburg · MBA-Programm Sustainability Management · 2021 – 2026',
  },
  {
    title: 'Master of Arts Kommunikationswissenschaft',
    detail: 'FOM Hochschule für Ökonomie & Management · 2018 – 2020',
  },
  {
    title: 'Bachelor of Arts Business Administration',
    detail: 'FOM Hochschule für Ökonomie & Management · 2013 – 2017',
  },
]

const skills = [
  'Systemisches Coaching',
  'Training & Weiterbildung',
  'Moderation & Keynotes',
  '(Agiles) Projektmanagement',
  'Change & Veränderungsprozesse',
  'Kompetenter Umgang mit AI',
]

// Mobil laufen die Kompetenzen in zwei Reihen (px/s, negativ = nach rechts).
const skillRows = [
  { items: skills.slice(0, 3), speed: 9 },
  { items: skills.slice(3), speed: -7 },
]

const stance = [
  {
    title: 'Systemisch',
    text: 'Ich schaue auf das ganze System: Menschen, Beziehungen und Dynamiken.',
  },
  {
    title: 'Agil',
    text: 'In kleinen Schritten vorankommen – ausprobieren, lernen, anpassen.',
  },
  {
    title: 'Positive Psychologie',
    text: 'An Stärken ansetzen, nicht nur an Problemen.',
  },
]

export default function AboutPage() {
  return (
    <div data-frame-page data-about-page className={styles.page}>
      <section aria-labelledby="about-title" className={styles.hero}>
        <h1 id="about-title" className={styles.srOnly}>
          I wanna see you grow – Über Annika Matthaei
        </h1>
        <p className={styles.heroLabel}>Über mich</p>
        <div className={styles.heroGrid}>
          <IWanna className={styles.iWanna} />
          <div className={styles.passepartout}>
            <Image
              src={portrait}
              alt="Annika Matthaei, lachend"
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 280px, 100vw"
              className={styles.portrait}
            />
          </div>
          <SeeYouGrow className={styles.seeYouGrow} />
        </div>
        <IWannaSeeYouGrow className={styles.heroMobileClaim} />
      </section>

      <section aria-labelledby="about-intro" className={styles.intro}>
        <h2 id="about-intro" className={styles.label}>
          Ich bin Annika.
        </h2>
        <div className={styles.introBody}>
          <p className={styles.lead}>{lead}</p>
          <p className={styles.introText}>{introText}</p>
          <div className={styles.signatureRow}>
            <Signature part="first" className={styles.signature} />
            <span className={styles.signatureNote}>— München, 2026</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-stance" className={styles.stance}>
        <h2 id="about-stance" className={styles.labelPlain}>
          Wie ich arbeite
        </h2>
        <ul className={styles.stanceList}>
          {stance.map((item) => (
            <li key={item.title} className={styles.stanceItem}>
              <span className={styles.stanceTitle}>{item.title}</span>
              <span className={styles.stanceText}>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-skills" className={styles.skills}>
        <h2 id="about-skills" className={styles.label}>
          Kompetenzen
        </h2>
        {/* Desktop sichtbar, mobil nur für Screenreader (dort laufen die Reihen). */}
        <ul className={styles.skillList}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>
        <SkillsMarquee rows={skillRows} />
      </section>

      <section aria-labelledby="about-education" className={styles.education}>
        <h2 id="about-education" className={styles.label}>
          Ausbildung &amp; Zertifizierungen
        </h2>
        <ul className={styles.educationList}>
          {education.map((entry) => (
            <li key={entry.title} className={styles.educationItem}>
              <span className={styles.educationTitle}>{entry.title}</span>
              <span className={styles.educationDetail}>{entry.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-stations" className={styles.stations}>
        <h2 id="about-stations" className={styles.labelOnDark}>
          Stationen
        </h2>
        <ol className={styles.stationList}>
          {stations.map((station) => (
            <li key={station.period + station.title} className={styles.station}>
              <span className={styles.stationPeriod}>{station.period}</span>
              <span className={styles.stationTitle}>{station.title}</span>
              <span className={styles.stationDetail}>{station.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="about-contact"
        aria-labelledby="about-contact-title"
        className={styles.cta}
      >
        <h2 id="about-contact-title" className={styles.ctaTitle}>
          Let’s grow!
        </h2>
        <div className={styles.ctaBody}>
          <p>
            Im unverbindlichen Kennenlernen finden wir heraus, ob wir
            zusammenpassen.
          </p>
          <Link href="/kontakt" className={styles.underlineLink}>
            Kennenlernen <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </section>

      <HomeStickyCta
        email={inquiryRecipient}
        startId="about-title"
        endSelector="#about-contact a"
      />
    </div>
  )
}
