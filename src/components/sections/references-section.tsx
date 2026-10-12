import Image from 'next/image'

import { Container } from '@/components/ui/container'

const references = [
  {
    name: 'Möbel Ehrmann',
    src: '/images/logos/ehrmann-black.svg',
    width: 738,
    height: 246,
    className: 'w-36 sm:w-48',
  },
  {
    name: 'Peek & Cloppenburg',
    src: '/images/logos/peek-cloppenburg-black.svg',
    width: 751,
    height: 105,
    className: 'w-40 sm:w-64',
  },
  {
    name: 'Performance One',
    src: '/images/logos/performance-one-black.svg',
    width: 738,
    height: 261,
    className: 'w-36 sm:w-52',
  },
  {
    name: 'claida ai',
    src: '/images/logos/claida-black.svg',
    width: 164,
    height: 40,
    className: 'w-40 sm:w-56',
  },
]

export function ReferencesSection() {
  return (
    <section aria-label="Referenzen" className="py-12 sm:py-20">
      <Container>
        <h2 className="editorial-label">03 / Referenzen</h2>
        <ul className="mt-12 grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-12 lg:grid-cols-4">
          {references.map((reference) => (
            <li
              key={reference.name}
              className="flex w-full items-center justify-center"
            >
              <Image
                src={reference.src}
                alt={reference.name}
                width={reference.width}
                height={reference.height}
                unoptimized
                className={`h-auto max-h-12 max-w-full object-contain ${reference.className}`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
