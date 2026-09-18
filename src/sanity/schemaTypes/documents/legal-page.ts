import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Rechtliche Seite',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Überschrift',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'updatedAt', title: 'Stand', type: 'date' }),
    defineField({ name: 'seo', title: 'Suchmaschinen & Teilen', type: 'seo' }),
  ],
})
