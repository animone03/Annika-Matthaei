import { defineField, defineType } from 'sanity'

export const contactTeaser = defineType({
  name: 'contactTeaser',
  title: 'Kontakt-Teaser',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Linktext',
      type: 'string',
      description: 'Das Ziel /kontakt bleibt durch die Anwendung festgelegt.',
      validation: (rule) => rule.required().max(50),
    }),
  ],
})
