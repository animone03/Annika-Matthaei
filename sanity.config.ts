import { presentationTool } from 'sanity/presentation'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'contactPage',
  'legalPage',
])

export default defineConfig({
  name: 'default',
  title: 'Website Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (previous, context) =>
      singletonTypes.has(context.schemaType)
        ? previous.filter(
            ({ action }) => action !== 'duplicate' && action !== 'delete',
          )
        : previous,
  },
})
