import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { SANITY_CONTENT_TAG } from '@/sanity/lib/fetch'

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret)
    return new Response('Webhook secret is not configured.', { status: 500 })

  const { isValidSignature, body } = await parseBody(request, secret, true)
  if (!isValidSignature)
    return new Response('Invalid signature.', { status: 401 })
  if (!body) return new Response('Invalid payload.', { status: 400 })

  revalidateTag(SANITY_CONTENT_TAG, 'max')
  return Response.json({ revalidated: true })
}
