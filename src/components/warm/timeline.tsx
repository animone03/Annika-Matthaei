import styles from './timeline.module.css'

type TimelineProps = {
  steps: { title: string; text: string }[]
}

const number = (index: number) => String(index + 1).padStart(2, '0')

// Schritte als Zeitleiste („So läuft es ab“, „So arbeiten wir“)
export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className={styles.steps}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <span aria-hidden="true" className={styles.number}>
            {number(index)}
          </span>
          <span className={styles.body}>
            <span className={styles.title}>{step.title}</span>
            <span className={styles.text}>{step.text}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
