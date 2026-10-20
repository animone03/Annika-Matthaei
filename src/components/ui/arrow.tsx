type ArrowProps = { className?: string }

// Schriftpfeil ↗ wie in den Vorlagen (10b). Übernimmt Textfarbe und
// Schriftgröße und ist reine Dekoration. U+FE0E erzwingt die Textform,
// sonst zeigt iOS das blaue Emoji.
export function Arrow({ className }: ArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={className ? `arrow ${className}` : 'arrow'}
    >
      {'\u2197\uFE0E'}
    </span>
  )
}
