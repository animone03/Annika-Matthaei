'use client'

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { Timeline } from '@/components/warm/timeline'

import styles from './home-page.module.css'

type ProcessTab = {
  id: string
  label: string
  /** Mobil im Umschalter, z. B. „Für euch“ */
  shortLabel: string
  steps: { title: string; text: string }[]
}

type ProcessTabsProps = {
  tabs: ProcessTab[]
  photo: ReactNode
  cta: ReactNode
}

// „So läuft es ab“: zwei Reiter (Teams, Founder 1:1), Foto und Button bleiben
// gleich. Pfeiltasten, Pos1 und Ende wechseln den Reiter. Mobil ein
// Akkordeon mit Umschalter, immer genau ein Schritt offen (04_mobile, M1).
export function ProcessTabs({ tabs, photo, cta }: ProcessTabsProps) {
  const [active, setActive] = useState(0)
  const [openStep, setOpenStep] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  function select(index: number) {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  // Beim Wechsel des Reiters öffnet sich wieder Schritt 1.
  function switchTab(index: number) {
    setActive(index)
    setOpenStep(0)
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? active === last
          ? 0
          : active + 1
        : event.key === 'ArrowLeft'
          ? active === 0
            ? last
            : active - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    select(next)
  }

  return (
    <>
      <div role="tablist" aria-label="Ablauf für" className={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            id={`${baseId}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            className={styles.tab}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.processBody}>
        <div className={styles.processPhoto}>{photo}</div>
        <div className={styles.processMain}>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              id={`${baseId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              tabIndex={0}
              hidden={index !== active}
              className={styles.tabPanel}
            >
              <Timeline steps={tab.steps} />
            </div>
          ))}
          {cta}
        </div>
      </div>

      {/* Mobil: Umschalter und Akkordeon, ohne Foto */}
      <div className={styles.processMobile}>
        <div role="group" aria-label="Ablauf für" className={styles.switch}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={index === active}
              onClick={() => switchTab(index)}
              className={styles.switchButton}
            >
              {tab.shortLabel}
            </button>
          ))}
        </div>
        <div className={styles.steps}>
          {tabs[active].steps.map((step, index) => {
            const open = index === openStep
            const panelId = `${baseId}-step-${index}`
            return (
              <div key={step.title} className={styles.step}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenStep(index)}
                    className={styles.stepButton}
                  >
                    <span className={styles.stepNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <span aria-hidden="true" className={styles.stepSign}>
                      {open ? '–' : '+'}
                    </span>
                  </button>
                </h3>
                <p id={panelId} hidden={!open} className={styles.stepText}>
                  {step.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
