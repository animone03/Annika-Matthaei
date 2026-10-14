'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'

import {
  inquiryRecipient,
  readInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryState,
} from '@/lib/inquiry'
import { sendInquiry } from '@/lib/inquiry-action'

import styles from './contact-page.module.css'

// slug = Wert für die Vorauswahl per /kontakt?thema=…
export const contactTopics = [
  { slug: 'startup-coaching', label: 'Startup-Coaching' },
  { slug: 'co-founder', label: 'Co-Founder' },
  { slug: 'exist', label: 'EXIST' },
  { slug: 'leadership', label: 'Leadership & Teams' },
  { slug: 'marketing', label: 'Marketing' },
  { slug: 'unklar', label: 'Noch unklar' },
]

const initialState: InquiryState = { status: 'idle' }
const sendContactInquiry = sendInquiry.bind(null, 'kontakt')

function Field({
  error,
  children,
}: {
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ''}`}>
      {children}
      {error ? <p className={styles.errorText}>{error}</p> : null}
    </div>
  )
}

function ContactFormBody({
  preselected,
  onReset,
}: {
  preselected: string[]
  onReset: () => void
}) {
  const [state, formAction, pending] = useActionState(
    sendContactInquiry,
    initialState,
  )
  const [clientErrors, setClientErrors] = useState<InquiryErrors>({})
  const startedRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const errors =
    state.status === 'invalid' ? (state.errors ?? {}) : clientErrors

  useEffect(() => {
    if (state.status === 'sent' || state.status === 'unavailable') {
      resultRef.current?.focus()
    }
  }, [state.status])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateInquiry(
      readInquiry(new FormData(event.currentTarget)),
      {
        messageRequired: true,
      },
    )
    setClientErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      event.preventDefault()
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${first}"]`)
        ?.focus()
    }
  }

  if (state.status === 'sent') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
        className={styles.result}
      >
        <p className={styles.resultTitle}>Danke! Ich melde mich bei dir.</p>
        <p className={styles.resultText}>
          Innerhalb von zwei Werktagen – meist schneller.
        </p>
        <button type="button" className={styles.resultLink} onClick={onReset}>
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
        className={styles.result}
      >
        <p className={styles.resultTitle}>
          Das Formular ist noch nicht freigeschaltet.
        </p>
        <p className={styles.resultText}>
          Schreib mir bitte direkt an{' '}
          <a href={`mailto:${inquiryRecipient}`} className={styles.inlineLink}>
            {inquiryRecipient}
          </a>
          . Ich melde mich bei dir.
        </p>
        <button type="button" className={styles.resultLink} onClick={onReset}>
          Zurück zum Formular
        </button>
      </div>
    )
  }

  return (
    <form
      onFocusCapture={() => {
        // Startzeit für die Mindest-Ausfüllzeit (Spam-Schutz)
        if (startedRef.current && !startedRef.current.value) {
          startedRef.current.value = String(Date.now())
        }
      }}
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className={styles.form}
    >
      {state.status === 'error' ? (
        <p role="alert" className={styles.formAlert}>
          Das hat leider nicht geklappt. Versuch es bitte noch einmal oder
          schreib mir an{' '}
          <a href={`mailto:${inquiryRecipient}`} className={styles.inlineLink}>
            {inquiryRecipient}
          </a>
          .
        </p>
      ) : null}

      <fieldset className={styles.topics}>
        <legend className={styles.formLabel}>
          Worum geht es? (Mehrfach möglich)
        </legend>
        <div className={styles.chipList}>
          {contactTopics.map((topic) => (
            <label key={topic.slug} className={styles.chip}>
              <input
                type="checkbox"
                name="themen"
                value={topic.label}
                defaultChecked={preselected.includes(topic.slug)}
              />
              <span>{topic.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.fieldGrid}>
        <Field error={errors.name}>
          <label className={styles.srOnly} htmlFor="kontakt-name">
            Name
          </label>
          <input
            id="kontakt-name"
            data-field="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field error={errors.email}>
          <label className={styles.srOnly} htmlFor="kontakt-email">
            E-Mail
          </label>
          <input
            id="kontakt-email"
            data-field="email"
            name="email"
            type="email"
            placeholder="E-Mail"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field>
          <label className={styles.srOnly} htmlFor="kontakt-unternehmen">
            Unternehmen / Startup (optional)
          </label>
          <input
            id="kontakt-unternehmen"
            name="unternehmen"
            placeholder="Unternehmen / Startup (optional)"
            autoComplete="organization"
          />
        </Field>
        <Field>
          <label className={styles.srOnly} htmlFor="kontakt-telefon">
            Telefon (optional)
          </label>
          <input
            id="kontakt-telefon"
            name="telefon"
            type="tel"
            placeholder="Telefon (optional)"
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field error={errors.message}>
        <label className={styles.srOnly} htmlFor="kontakt-nachricht">
          Was beschäftigt dich gerade?
        </label>
        <textarea
          id="kontakt-nachricht"
          data-field="message"
          name="nachricht"
          placeholder="Was beschäftigt dich gerade?"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <div>
        <label className={styles.consent}>
          <input
            type="checkbox"
            name="datenschutz"
            data-field="consent"
            required
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            Ich bin einverstanden, dass meine Angaben zur Bearbeitung der
            Anfrage gespeichert werden.{' '}
            <Link href="/datenschutz" className={styles.inlineLink}>
              Datenschutz
            </Link>
          </span>
        </label>
        {errors.consent ? (
          <p className={styles.errorText}>{errors.consent}</p>
        ) : null}
      </div>

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

function useTopicPreselection() {
  const searchParams = useSearchParams()
  return searchParams.getAll('thema').flatMap((value) => value.split(','))
}

export function ContactFormWithTopics() {
  const preselected = useTopicPreselection()
  return <ContactForm preselected={preselected} />
}

export function ContactForm({ preselected = [] }: { preselected?: string[] }) {
  const [round, setRound] = useState(0)
  return (
    <ContactFormBody
      key={round}
      preselected={preselected}
      onReset={() => setRound((value) => value + 1)}
    />
  )
}
