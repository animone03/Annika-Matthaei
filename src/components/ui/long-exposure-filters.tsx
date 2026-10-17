// Belichtungseffekt (Design-System 10b): waagerechter Schleier wie bei einer
// Langzeitbelichtung. Einmal pro Seite einbinden, dann per CSS nutzen:
//   filter: url(#longexp2) contrast(0.92) brightness(1.04);
// Der Bild-Container braucht overflow: hidden.
//   longexp  – leicht, Reserve
//   longexpM – mittel, Laufbild im Streifen „Leistungssport“
//   longexp2 – stark, für Themenkarten
export function LongExposureFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute' }}
    >
      <filter id="longexp" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9 1.5" result="b" />
        <feOffset in="b" dx="6" dy="0" result="o" />
        <feColorMatrix
          in="o"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .5 0"
          result="g"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation=".6" result="s" />
        <feMerge>
          <feMergeNode in="s" />
          <feMergeNode in="g" />
        </feMerge>
      </filter>
      <filter id="longexpM" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="11 1.8" result="b" />
        <feOffset in="b" dx="7" dy="0" result="o" />
        <feColorMatrix
          in="o"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .5 0"
          result="g"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation=".8" result="s" />
        <feMerge>
          <feMergeNode in="s" />
          <feMergeNode in="g" />
        </feMerge>
      </filter>
      <filter id="longexp2" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="16 2.5" result="b" />
        <feOffset in="b" dx="10" dy="0" result="o" />
        <feColorMatrix
          in="o"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .65 0"
          result="g"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="s" />
        <feMerge>
          <feMergeNode in="s" />
          <feMergeNode in="g" />
        </feMerge>
      </filter>
    </svg>
  )
}
