type ArrowProps = { className?: string }

// Handgemalter Pfeil im Stil des Logos. Übernimmt Textfarbe und Schriftgröße
// (CSS-Maske, siehe .arrow in globals.css) und ist reine Dekoration.
export function Arrow({ className }: ArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={className ? `arrow ${className}` : 'arrow'}
    />
  )
}
