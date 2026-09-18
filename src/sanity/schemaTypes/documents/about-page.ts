import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Über mich',
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
    defineField({ name: 'portrait', title: 'Porträt', type: 'editorialImage' }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactTeaser',
      title: 'Kontakt-Teaser',
      type: 'contactTeaser',
    }),
    defineField({ name: 'seo', title: 'Suchmaschinen & Teilen', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Über mich' }) },
})
