import Image from 'next/image'

import {
  imageSource,
  type SanityImageValue,
  urlForImage,
} from '@/sanity/lib/image'

type SanityImageProps = {
  image: SanityImageValue | null | undefined
  className?: string
  sizes: string
  preload?: boolean
}

export function SanityImage({
  image,
  className = '',
  sizes,
  preload = false,
}: SanityImageProps) {
  if (!image) return null
  const source = imageSource(image)
  if (!source) return null

  const width = image.asset?.metadata?.dimensions?.width || 1600
  const height = image.asset?.metadata?.dimensions?.height || 900
  const src = urlForImage(source).width(Math.min(width, 2400)).url()

  return (
    <figure className={className}>
      <Image
        src={src}
        alt={image.alt || ''}
        width={width}
        height={height}
        quality={75}
        sizes={sizes}
        preload={preload}
        placeholder={image.asset?.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={image.asset?.metadata?.lqip || undefined}
        className="h-auto w-full rounded-[var(--radius)] object-cover"
      />
      {image.caption ? (
        <figcaption className="text-muted-foreground mt-3 text-sm leading-6">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
