'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'

import { inquiryRecipient, type InquiryState } from '@/lib/inquiry'
import { sendInquiry } from '@/lib/inquiry-action'

import styles from './startups-page.module.css'

const topics = [
  'Gründungscoaching',
  'Co-Founder',
  'Leadership & Team',
  'EXIST',
  'Noch unklar',
]

const initialState: InquiryState = { status: 'idle' }
const sendStartupInquiry = sendInquiry.bind(null, 'coaching-startups')

function StartupContactFormBody({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(
    sendStartupInquiry,
    initialState,
  )
  const startedRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const errors = state.status === 'invalid' ? (state.errors ?? {}) : {}

  useEffect(() => {
    if (state.status === 'sent' || state.status === 'unavailable') {
      resultRef.current?.focus()
    }
  }, [state.status])

  if (state.status === 'sent') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
        className={styles.formNotice}
      >
        <p className={styles.formNoticeTitle}>
          Danke, ich melde mich bei euch.
        </p>
        <button type="button" className={styles.resetButton} onClick={onReset}>
          Neue Anfrage
        </button>
      </div>
    )
  }

  if (state.status === 'unavailable') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
        className={styles.formNotice}
      >
        <p className={styles.formNoticeTitle}>
          Das Formular ist noch nicht freigeschaltet.
        </p>
        <p>
          Schreib mir bitte direkt eine E-Mail an{' '}
          <a href={`mailto:${inquiryRecipient}`} className={styles.inlineLink}>
            {inquiryRecipient}
          </a>
          . Ich melde mich bei euch.
        </p>
        <button type="button" className={styles.resetButton} onClick={onReset}>
          Zurück zum Formular
        </button>
      </div>
    )
  }

  const errorList = Object.values(errors)

  return (
    <form
      onFocusCapture={() => {
        // Startzeit für die Mindest-Ausfüllzeit (Spam-Schutz)
        if (startedRef.current && !startedRef.current.value) {
          startedRef.current.value = String(Date.now())
        }
      }}
      className={styles.form}
      action={formAction}
    >
      {state.status === 'error' || errorList.length ? (
        <p role="alert" className={styles.formAlert}>
          {errorList.length
            ? errorList.join(' ')
            : 'Das hat leider nicht geklappt. Versucht es bitte noch einmal.'}
        </p>
      ) : null}
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
      {/* Spam-Schutz: für Menschen unsichtbar */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="gestartet" defaultValue="" />
      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? (
          'Wird gesendet …'
        ) : (
          <>
            Anfrage senden <span aria-hidden="true">↗︎</span>
          </>
        )}
      </button>
    </form>
  )
}

export function StartupContactForm() {
  const [round, setRound] = useState(0)
  return (
    <StartupContactFormBody
      key={round}
      onReset={() => setRound((value) => value + 1)}
    />
  )
}
