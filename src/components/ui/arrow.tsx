type ArrowProps = { className?: string }

// Pfeil ↗ als Linie (Variante A): so hoch wie die Großbuchstaben, Strich wie
// die Schrift daneben (globals.css). Farbe über currentColor, reine Dekoration.
export function Arrow({ className }: ArrowProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
      className={className ? `arrow ${className}` : 'arrow'}
    >
      <path d="M6 66 L66 6 M24 6 H66 V48" />
    </svg>
  )
}
