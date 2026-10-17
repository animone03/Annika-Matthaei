'use client'

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import styles from './home-page.module.css'

type ProcessTab = {
  id: string
  label: string
  steps: { title: string; text: string }[]
}

type ProcessTabsProps = {
  tabs: ProcessTab[]
  photo: ReactNode
  cta: ReactNode
}

const number = (index: number) => String(index + 1).padStart(2, '0')

// „So läuft es ab“: zwei Reiter (Teams, Founder 1:1), Foto und Button bleiben
// gleich. Pfeiltasten, Pos1 und Ende wechseln den Reiter.
export function ProcessTabs({ tabs, photo, cta }: ProcessTabsProps) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  function select(index: number) {
    setActive(index)
    tabRefs.current[index]?.focus()
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
              <ol className={styles.steps}>
                {tab.steps.map((step, stepIndex) => (
                  <li key={step.title} className={styles.step}>
                    <span aria-hidden="true" className={styles.stepNumber}>
                      {number(stepIndex)}
                    </span>
                    <span className={styles.stepBody}>
                      <span className={styles.stepTitle}>{step.title}</span>
                      <span className={styles.stepText}>{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          {cta}
        </div>
      </div>
    </>
  )
}
