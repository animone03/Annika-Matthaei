import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

import portrait from '../../../../public/images/annika-profil.webp'

import {
  ContactForm,
  ContactFormWithTopics,
} from '@/components/sections/contact-form'
import styles from '@/components/sections/contact-page.module.css'
import { inquiryRecipient } from '@/lib/inquiry'
import { buildMetadata } from '@/lib/metadata'
import { linkedInUrl } from '@/lib/social'
import { getSiteSettings } from '@/sanity/lib/repository'
import { Arrow } from '@/components/ui/arrow'

export const metadata: Metadata = buildMetadata({
  title: 'Kontakt – Annika Matthaei | Coaching & Consulting',
  description:
    'Erstgespräch zu Startup-Coaching, Co-Founder-Themen oder Leadership anfragen.',
  path: '/kontakt',
  absoluteTitle: true,
})

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const linkedIn = linkedInUrl(settings?.socialLinks)

  return (
    <div data-frame-page data-contact-page className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.label}>Kontakt</p>
        <h1 className={styles.title}>Lass uns sprechen.</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.photo}>
          <Image
            src={portrait}
            alt="Annika Matthaei im Profil"
            preload
            placeholder="blur"
            sizes="(min-width: 768px) 360px, 140px"
            className={styles.photoImage}
          />
        </div>

        <p className={styles.text}>
          Ob Gründungsteam, Co-Founder oder Führungsrolle, erzähl mir kurz,
          worum es geht. Ich melde mich innerhalb von zwei Werktagen für ein
          unverbindliches Kennenlernen.
        </p>

        <ul className={styles.direct} aria-label="Direktkontakt">
          <li>
            <a href={`mailto:${inquiryRecipient}`} className={styles.directRow}>
              <span className={styles.directValue}>
                <span className={styles.directLabel}>E-Mail</span>
                {inquiryRecipient}
              </span>
              <Arrow />
            </a>
          </li>
          <li>
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener"
              className={styles.directRow}
            >
              <span className={styles.directValue}>
                <span className={styles.directLabel}>LinkedIn</span>
                Annika Matthaei
              </span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href="tel:+491727732006" className={styles.directRow}>
              <span className={styles.directValue}>
                <span className={styles.directLabel}>Telefon</span>
                0172 773 2006
              </span>
              <Arrow />
            </a>
          </li>
          <li>
            <div className={styles.directRow}>
              <span className={styles.directValue}>
                <span className={styles.directLabel}>Ort</span>
                Online &amp; vor Ort
              </span>
            </div>
          </li>
        </ul>

        <section aria-label="Kontaktformular" className={styles.formColumn}>
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithTopics />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
