'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'

import {
  inquiryRecipient,
  readInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryState,
} from '@/lib/inquiry'
import { sendInquiry } from '@/lib/inquiry-action'
import { Signature } from '@/components/ui/signature'

import styles from './contact-page.module.css'

// slug = Wert für die Vorauswahl per /kontakt?thema=…
// TODO: „EXIST“ später ggf. „Gründungscoaching“ (Inhaltskonzept v3, Abschnitt 8)
export const contactTopics = [
  { slug: 'startup-coaching', label: 'Startup-Coaching' },
  { slug: 'co-founder', label: 'Co-Founder' },
  { slug: 'exist', label: 'EXIST' },
  { slug: 'leadership', label: 'Leadership & Teams' },
  { slug: 'unklar', label: 'Noch unklar' },
]

const initialState: InquiryState = { status: 'idle' }
const sendContactInquiry = sendInquiry.bind(null, 'kontakt')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({
  id,
  label,
  error,
  optional,
  wide,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`${styles.field} ${optional ? styles.fieldOptional : ''} ${
        wide ? styles.fieldWide : ''
      } ${error ? styles.fieldError : ''}`}
    >
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-fehler`} className={styles.errorText}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

// „Worum geht es?“: Einzelauswahl, ein zweiter Klick hebt sie wieder auf.
// Pfeiltasten wechseln das Thema.
function TopicPicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (slug: string | null) => void
}) {
  const labelId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = contactTopics.findIndex((topic) => topic.slug === value)

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = contactTopics.length - 1
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? index === 0
            ? last
            : index - 1
          : null
    if (next === null) return
    event.preventDefault()
    onChange(contactTopics[next].slug)
    refs.current[next]?.focus()
  }

  return (
    <div className={styles.topics}>
      <span id={labelId} className={styles.fieldLabel}>
        Worum geht es?
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className={styles.chipList}
      >
        {contactTopics.map((topic, index) => {
          const checked = topic.slug === value
          return (
            <button
              key={topic.slug}
              ref={(element) => {
                refs.current[index] = element
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked || (selectedIndex < 0 && index === 0) ? 0 : -1}
              onClick={() => onChange(checked ? null : topic.slug)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={styles.chip}
            >
              {topic.label}
            </button>
          )
        })}
      </div>
      <input
        type="hidden"
        name="thema"
        value={contactTopics[selectedIndex]?.label ?? ''}
      />
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
  const [topic, setTopic] = useState<string | null>(
    () =>
      contactTopics.find((item) => preselected.includes(item.slug))?.slug ??
      null,
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [clientErrors, setClientErrors] = useState<InquiryErrors>({})
  const startedRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const errors =
    state.status === 'invalid' ? (state.errors ?? {}) : clientErrors
  const ready = Boolean(name.trim()) && emailPattern.test(email.trim())
  const firstName = name.trim().split(/\s+/)[0]

  useEffect(() => {
    if (state.status === 'sent' || state.status === 'unavailable') {
      resultRef.current?.focus()
    }
  }, [state.status])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateInquiry(
      readInquiry(new FormData(event.currentTarget)),
      { messageRequired: false },
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
        <p className={styles.resultLabel}>Nachricht gesendet</p>
        <p className={styles.resultTitle}>
          {firstName ? `Danke, ${firstName}!` : 'Danke!'}
        </p>
        <p className={styles.resultText}>
          Ich melde mich innerhalb von zwei Werktagen, meist schneller.
        </p>
        <Signature
          part="first"
          label="Annika"
          className={styles.resultSignature}
        />
        <button type="button" className={styles.textLink} onClick={onReset}>
          Noch eine Nachricht
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
        <p className={styles.resultLabel}>Noch nicht freigeschaltet</p>
        <p className={styles.resultText}>
          Das Formular ist noch nicht freigeschaltet. Schreib mir bitte direkt
          an{' '}
          <a href={`mailto:${inquiryRecipient}`} className={styles.inlineLink}>
            {inquiryRecipient}
          </a>
          .
        </p>
        <button type="button" className={styles.textLink} onClick={onReset}>
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
          Das hat nicht geklappt. Schreib mir gern direkt an{' '}
          <a href={`mailto:${inquiryRecipient}`} className={styles.inlineLink}>
            {inquiryRecipient}
          </a>
          .
        </p>
      ) : null}

      <TopicPicker value={topic} onChange={setTopic} />

      <div className={styles.fieldGrid}>
        <Field id="kontakt-name" label="Name *" error={errors.name}>
          <input
            id="kontakt-name"
            data-field="name"
            name="name"
            placeholder="Vor- und Nachname"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'kontakt-name-fehler' : undefined}
          />
        </Field>
        <Field id="kontakt-email" label="E-Mail *" error={errors.email}>
          <input
            id="kontakt-email"
            data-field="email"
            name="email"
            type="email"
            placeholder="name@startup.de"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'kontakt-email-fehler' : undefined}
          />
        </Field>
        <Field id="kontakt-unternehmen" label="Unternehmen / Startup" optional>
          <input
            id="kontakt-unternehmen"
            name="unternehmen"
            placeholder="optional"
            autoComplete="organization"
          />
        </Field>
        <Field id="kontakt-telefon" label="Telefon" optional>
          <input
            id="kontakt-telefon"
            name="telefon"
            type="tel"
            placeholder="optional"
            autoComplete="tel"
          />
        </Field>
        <Field
          id="kontakt-nachricht"
          label="Deine Nachricht"
          error={errors.message}
          optional
          wide
        >
          <textarea
            id="kontakt-nachricht"
            data-field="message"
            name="nachricht"
            placeholder="Wo steht ihr gerade, was beschäftigt euch?"
            rows={5}
            aria-invalid={Boolean(errors.message)}
          />
        </Field>
      </div>

      {/* Spam-Schutz: für Menschen unsichtbar */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="gestartet" defaultValue="" />

      <div className={styles.formFoot}>
        <p className={styles.notice}>
          Mit dem Absenden stimmst du zu, dass ich deine Angaben zur Bearbeitung
          deiner Anfrage nutze. Mehr in der{' '}
          <Link href="/datenschutz" className={styles.inlineLink}>
            Datenschutzerklärung
          </Link>
          .
        </p>
        {/* Bleibt bedienbar, damit ein Klick die fehlenden Angaben zeigt */}
        <button
          type="submit"
          aria-disabled={!ready || pending}
          className={styles.submit}
          disabled={pending}
        >
          {pending ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
      </div>
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
