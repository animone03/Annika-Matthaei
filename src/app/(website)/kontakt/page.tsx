import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

import portrait from '../../../../public/images/fotos/portrait-lachend.jpg'

import {
  ContactForm,
  ContactFormWithTopics,
} from '@/components/sections/contact-form'
import styles from '@/components/sections/contact-page.module.css'
import { Signature } from '@/components/ui/signature'
import warm from '@/components/warm/warm.module.css'
import { inquiryRecipient } from '@/lib/inquiry'
import { buildMetadata } from '@/lib/metadata'
import { linkedInUrl } from '@/lib/social'
import { getSiteSettings } from '@/sanity/lib/repository'

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
  const direct = [
    {
      label: 'E-Mail',
      value: inquiryRecipient,
      href: `mailto:${inquiryRecipient}`,
    },
    { label: 'Telefon', value: '0172 773 2006', href: 'tel:+491727732006' },
    {
      label: 'LinkedIn',
      value: '/in/annikamatthaei',
      href: linkedIn,
      external: true,
    },
    { label: 'Ort', value: 'Online & vor Ort' },
  ]

  return (
    <div data-warm-page data-contact-page className={warm.page}>
      <div className={styles.layout}>
        <header className={styles.head}>
          {/* Mobil: Foto oben, unten weich in den Wandton ausgeblendet */}
          <div className={styles.headPhoto}>
            <Image
              src={portrait}
              alt=""
              placeholder="blur"
              sizes="100vw"
              className={styles.photoImage}
            />
          </div>
          <p className={styles.eyebrow}>Kontakt</p>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Lass uns</span>{' '}
            <span className={styles.titleLine}>sprechen.</span>
          </h1>
          <p className={styles.intro}>
            Erzähl mir kurz, wo ihr gerade steht. Ich melde mich innerhalb von
            zwei Werktagen, und wir finden einen Termin für das kostenlose
            Kennenlernen
            <span className={warm.desktopOnly}> (30 Min., online)</span>.
          </p>
          <p className={styles.headNote}>30 Min. · online · unverbindlich</p>
        </header>

        <section aria-label="Kontaktformular" className={styles.formArea}>
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithTopics />
          </Suspense>
        </section>

        <aside className={styles.aside}>
          <div className={styles.photo}>
            <Image
              src={portrait}
              alt="Annika Matthaei lachend"
              placeholder="blur"
              sizes="(min-width: 768px) 400px, 100vw"
              className={styles.photoImage}
            />
          </div>
          <div>
            <h2 className={styles.directTitle}>Direkter Kontakt</h2>
            <ul className={styles.direct}>
              {direct.map((item) => {
                const content = (
                  <>
                    <span className={styles.directLabel}>{item.label}</span>
                    <span className={styles.directValue}>{item.value}</span>
                  </>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={styles.directRow}
                        {...(item.external
                          ? { target: '_blank', rel: 'me noopener' }
                          : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={styles.directRow}>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <div className={styles.signoff}>
          <p className={styles.signoffText}>
            Ich freue mich <br />
            auf euch.
          </p>
          <Signature
            part="first"
            label="Annika"
            className={styles.signoffSignature}
          />
        </div>
      </div>
    </div>
  )
}
