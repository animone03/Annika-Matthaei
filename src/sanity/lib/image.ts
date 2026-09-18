import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url'

import { client } from './client'

const builder = createImageUrlBuilder(client)

export type SanityImageValue = {
  asset?: {
    url?: string | null
    metadata?: {
      dimensions?: {
        width?: number | null
        height?: number | null
      } | null
      lqip?: string | null
    } | null
  } | null
  alt?: string | null
  caption?: string | null
  crop?: { top: number; bottom: number; left: number; right: number } | null
  hotspot?: { x: number; y: number; height: number; width: number } | null
}

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}

export function imageSource(value: SanityImageValue): SanityImageSource | null {
  if (!value.asset?.url) return null

  return {
    asset: { url: value.asset.url },
    crop: value.crop || undefined,
    hotspot: value.hotspot || undefined,
  }
}
