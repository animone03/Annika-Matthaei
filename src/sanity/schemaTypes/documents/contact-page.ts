import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Überschrift',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'introduction',
      title: 'Einleitung',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'body',
      title: 'Zusätzlicher Inhalt',
      type: 'portableText',
    }),
    defineField({ name: 'seo', title: 'Suchmaschinen & Teilen', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Kontakt' }) },
})
