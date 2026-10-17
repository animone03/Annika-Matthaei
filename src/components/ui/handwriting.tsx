// Handschriftliche Grafiken aus der Design-Übergabe, inline für currentColor.

const burgerPaths = [
  'M 14 19 C 10 15 10 8 15 5 C 21 1 27 4 34 8 C 43 14 48 14 56 15 C 69 17 75 22 89 19 C 105 16 117 13 131 16 C 145 18 156 17 169 13 C 180 10 184 3 191 5 C 199 7 203 16 199 23 C 194 31 185 29 176 27 C 160 24 148 23 134 24 C 118 25 103 28 88 27 C 74 26 65 28 54 25 C 44 22 38 21 32 24 C 25 29 18 27 14 19 Z',
  'M 16 70 C 10 67 10 59 14 55 C 20 49 28 52 36 55 C 45 59 54 60 67 58 C 83 55 91 56 103 59 C 116 63 125 63 138 60 C 154 57 166 59 176 51 C 183 46 191 46 197 51 C 204 56 204 67 199 73 C 192 80 182 78 174 75 C 160 70 153 68 141 69 C 128 70 119 73 107 71 C 91 68 85 68 70 70 C 55 72 45 68 36 70 C 27 74 21 75 16 70 Z',
  'M 15 120 C 8 115 10 108 15 102 C 23 92 30 88 39 91 C 47 94 48 102 57 102 C 66 103 75 96 84 99 C 91 102 93 108 103 106 C 116 103 125 104 138 107 C 153 110 162 105 175 99 C 185 94 192 97 198 105 C 205 113 201 122 195 125 C 186 130 180 124 171 122 C 160 119 154 117 143 118 C 131 119 122 122 111 119 C 100 116 93 119 83 116 C 72 113 68 112 57 115 C 47 117 39 123 31 127 C 23 131 17 126 15 120 Z',
]

type GraphicProps = { className?: string }

export function BurgerIcon({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 212 136"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      {burgerPaths.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </svg>
  )
}
