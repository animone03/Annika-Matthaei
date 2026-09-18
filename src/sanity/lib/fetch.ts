import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'
import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'

import { client } from './client'
import { isSanityConfigured } from './env'
import { fetchPreview } from './live'
import { requireReadToken } from './token'

export const SANITY_CONTENT_TAG = 'sanity-content'

type QueryOptions = {
  params?: QueryParams
  stega?: boolean
  publishedOnly?: boolean
}

async function fetchPublished<const QueryString extends string>(
  query: QueryString,
  params: QueryParams,
) {
  'use cache'

  cacheLife('max')
  cacheTag(SANITY_CONTENT_TAG)

  const data = await client.fetch(query, params, {
    perspective: 'published',
    stega: false,
  })

  return { data }
}

export async function fetchSanity<const QueryString extends string>(
  query: QueryString,
  { params = {}, stega = true, publishedOnly = false }: QueryOptions = {},
) {
  if (!isSanityConfigured) return null

  if (publishedOnly) return fetchPublished(query, params)

  const { isEnabled } = await draftMode()

  if (!isEnabled) return fetchPublished(query, params)

  requireReadToken()
  return fetchPreview({
    query,
    params,
    perspective: 'drafts',
    stega,
  })
}
