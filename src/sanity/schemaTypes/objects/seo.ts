import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Suchmaschinen & Teilen',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO-Titel',
      type: 'string',
      description: 'Optional. Ohne Wert wird der Seitentitel verwendet.',
      validation: (rule) =>
        rule
          .max(70)
          .warning('Der Titel könnte in Suchergebnissen gekürzt werden.'),
    }),
    defineField({
      name: 'description',
      title: 'SEO-Beschreibung',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule
          .max(170)
          .warning(
            'Die Beschreibung könnte in Suchergebnissen gekürzt werden.',
          ),
    }),
    defineField({
      name: 'socialImage',
      title: 'Vorschaubild',
      type: 'editorialImage',
    }),
    defineField({
      name: 'noIndex',
      title: 'Nicht indexieren',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
