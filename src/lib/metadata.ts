import type { Metadata } from 'next'

import {
  imageSource,
  type SanityImageValue,
  urlForImage,
} from '@/sanity/lib/image'

import { absoluteUrl } from './site-url'

type SeoValue = {
  title?: string | null
  description?: string | null
  noIndex?: boolean | null
  socialImage?: SanityImageValue | null
} | null

type MetadataInput = {
  title: string
  description?: string | null
  path: string
  seo?: SeoValue
  fallbackImage?: SanityImageValue | null
  absoluteTitle?: boolean
}

function socialImage(image?: SanityImageValue | null) {
  if (!image) return null
  const source = imageSource(image)
  if (!source) return null

  return {
    url: urlForImage(source).width(1200).height(630).url(),
    width: 1200,
    height: 630,
    alt: image.alt || '',
  }
}

export function buildMetadata({
  title,
  description,
  path,
  seo,
  fallbackImage,
  absoluteTitle = false,
}: MetadataInput): Metadata {
  const resolvedTitle = seo?.title || title
  const resolvedDescription = seo?.description || description || undefined
  const canonical = absoluteUrl(path)
  const image = socialImage(seo?.socialImage || fallbackImage)

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: canonical,
      title: resolvedTitle,
      description: resolvedDescription,
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: resolvedTitle,
      description: resolvedDescription,
      images: image ? [image.url] : [],
    },
  }
}
