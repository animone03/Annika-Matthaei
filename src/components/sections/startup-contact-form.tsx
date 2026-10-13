'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import styles from './startups-page.module.css'

const topics = [
  'Gründungscoaching',
  'Co-Founder',
  'Leadership & Team',
  'EXIST',
  'Noch unklar',
]

const email = 'annika.matthaei@googlemail.com'

// TODO: Versand per Server Action anbinden (inkl. Honeypot gegen Spam).
// Bis dahin verschickt das Formular nichts und verweist nach dem Prüfen der
// Eingaben auf die E-Mail-Adresse.
export function StartupContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.formNotice} role="status">
        <p className={styles.formNoticeTitle}>
          Das Formular ist noch nicht freigeschaltet.
        </p>
        <p>
          Schreib mir bitte direkt eine E-Mail an{' '}
          <a href={`mailto:${email}`} className={styles.inlineLink}>
            {email}
          </a>
          . Ich melde mich bei euch.
        </p>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => setSubmitted(false)}
        >
          Zurück zum Formular
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.chips}>
        <legend className={styles.formLabel}>
          Worum geht es? (Mehrfach möglich)
        </legend>
        <div className={styles.chipList}>
          {topics.map((topic) => (
            <label key={topic} className={styles.chip}>
              <input type="checkbox" name="themen" value={topic} />
              <span>{topic}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span className={styles.srOnly}>Name</span>
          <input name="name" placeholder="Name" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>E-Mail</span>
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label className={`${styles.field} ${styles.desktopOnly}`}>
        <span className={styles.srOnly}>Startup / Unternehmen (optional)</span>
        <input
          name="unternehmen"
          placeholder="Startup / Unternehmen (optional)"
          autoComplete="organization"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.srOnly}>Was beschäftigt euch?</span>
        <textarea
          name="nachricht"
          placeholder="Was beschäftigt euch?"
          rows={4}
        />
      </label>
      <label className={styles.consent}>
        <input type="checkbox" name="datenschutz" required />
        <span>
          Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage
          gespeichert werden.{' '}
          <Link href="/datenschutz" className={styles.inlineLink}>
            Datenschutz
          </Link>
        </span>
      </label>
      <button type="submit" className={styles.submit}>
        Anfrage senden <span aria-hidden="true">↗︎</span>
      </button>
    </form>
  )
}
