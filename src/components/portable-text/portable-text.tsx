import {
  PortableText as PortableTextRenderer,
  type PortableTextComponentProps,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from '@portabletext/react'
import type { ComponentProps } from 'react'

import { SanityImage } from '@/components/sanity-image'
import type { SanityImageValue } from '@/sanity/lib/image'

type PortableTextValue = ComponentProps<typeof PortableTextRenderer>['value']

type CalloutValue = {
  _type: 'callout'
  tone?: 'note' | 'important'
  title?: string
  body?: PortableTextValue
}

type GalleryValue = {
  _type: 'gallery'
  images?: SanityImageValue[]
}

type LinkValue = {
  _type: 'link'
  href?: string
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-foreground/85 my-5 leading-8">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold tracking-tight sm:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent text-foreground/80 my-8 border-l-4 pl-6 text-xl leading-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkValue>) => {
      const href = value?.href || '#'
      return (
        <a
          className="text-accent font-medium underline decoration-2 underline-offset-4"
          href={href}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    editorialImage: ({
      value,
    }: PortableTextComponentProps<SanityImageValue>) => (
      <SanityImage
        image={value}
        className="my-10"
        sizes="(max-width: 768px) 100vw, 768px"
      />
    ),
    gallery: ({ value }: PortableTextComponentProps<GalleryValue>) => (
      <div className="my-10 grid gap-5 sm:grid-cols-2">
        {value.images?.map((image, index) => (
          <SanityImage
            key={`${image.asset?.url || 'image'}-${index}`}
            image={image}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ))}
      </div>
    ),
    callout: ({ value }: PortableTextComponentProps<CalloutValue>) => (
      <aside
        className={`my-8 rounded-[var(--radius)] border p-6 ${
          value.tone === 'important'
            ? 'border-accent bg-accent/10'
            : 'border-border bg-surface'
        }`}
      >
        {value.title ? <p className="font-semibold">{value.title}</p> : null}
        {value.body ? (
          <PortableTextRenderer value={value.body} components={components} />
        ) : null}
      </aside>
    ),
  },
}

type PortableTextProps = {
  value: PortableTextValue | null | undefined
  className?: string
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null

  return (
    <div className={`portable-text max-w-3xl ${className}`}>
      <PortableTextRenderer value={value} components={components} />
    </div>
  )
}
