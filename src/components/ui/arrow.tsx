type ArrowProps = { className?: string }

// Schriftpfeil ↗ wie in den Vorlagen (10b). Übernimmt Textfarbe und
// Schriftgröße und ist reine Dekoration.
export function Arrow({ className }: ArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={className ? `arrow ${className}` : 'arrow'}
    >
      ↗
    </span>
  )
}
