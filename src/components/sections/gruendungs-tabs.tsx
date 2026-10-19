'use client'

import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import type { GruendungsTab } from '@/content/gruendungscoaching'

import styles from './gruendungscoaching.module.css'

type TabContextValue = {
  active: GruendungsTab
  select: (tab: GruendungsTab) => void
  baseId: string
}

const TabContext = createContext<TabContextValue>({
  active: 'team',
  select: () => {},
  baseId: '',
})

// ?fuer=beratung öffnet den Reiter „Für Gründungsberatungen“ (Link für
// Hochschulen). Auf dem Server und ohne Parameter: „Für Gründungsteams“.
const subscribe = () => () => {}
function useTabFromUrl(): GruendungsTab {
  return useSyncExternalStore(
    subscribe,
    () =>
      new URLSearchParams(window.location.search).get('fuer') === 'beratung'
        ? 'uni'
        : 'team',
    () => 'team',
  )
}

export function GruendungsTabsProvider({ children }: { children: ReactNode }) {
  const fromUrl = useTabFromUrl()
  const [picked, setPicked] = useState<GruendungsTab | null>(null)
  const baseId = useId()

  return (
    <TabContext.Provider
      value={{ active: picked ?? fromUrl, select: setPicked, baseId }}
    >
      {children}
    </TabContext.Provider>
  )
}

type TabListProps = {
  tabs: { id: GruendungsTab; label: string; title: string }[]
}

// Zwei Reiter über die volle Breite. Pfeiltasten, Pos1 und Ende wechseln.
export function GruendungsTabList({ tabs }: TabListProps) {
  const { active, select, baseId } = useContext(TabContext)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = tabs.findIndex((tab) => tab.id === active)
    const last = tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    select(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label="Angebot für" className={styles.tabList}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={(element) => {
            refs.current[index] = element
          }}
          id={`${baseId}-tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={tab.id === active}
          aria-controls={`${baseId}-panel-${tab.id}`}
          tabIndex={tab.id === active ? 0 : -1}
          onClick={() => select(tab.id)}
          onKeyDown={onKeyDown}
          className={styles.tab}
        >
          <span className={styles.tabLabel}>{tab.label}</span>
          <span className={styles.tabTitle}>{tab.title}</span>
        </button>
      ))}
    </div>
  )
}

// Inhalt eines Reiters (direkt unter den Reitern)
export function GruendungsTabPanel({
  tab,
  children,
}: {
  tab: GruendungsTab
  children: ReactNode
}) {
  const { active, baseId } = useContext(TabContext)
  return (
    <div
      id={`${baseId}-panel-${tab}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${tab}`}
      hidden={tab !== active}
    >
      {children}
    </div>
  )
}

// Weitere Teile, die je Reiter wechseln: Hero-Button, Fragen, Abschluss
export function ForTab({
  tab,
  children,
}: {
  tab: GruendungsTab
  children: ReactNode
}) {
  const { active } = useContext(TabContext)
  return <div hidden={tab !== active}>{children}</div>
}
