import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { connection } from 'next/server'

import { client } from '@/sanity/lib/client'
import { requireReadToken } from '@/sanity/lib/token'

export async function GET(request: Request) {
  await connection()

  const handler = defineEnableDraftMode({
    client: client.withConfig({ token: requireReadToken() }),
  })

  return handler.GET(request)
}
