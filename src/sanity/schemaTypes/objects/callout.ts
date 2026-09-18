import { defineArrayMember, defineField, defineType } from 'sanity'

export const callout = defineType({
  name: 'callout',
  title: 'Hinweis',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Bedeutung',
      type: 'string',
      initialValue: 'note',
      options: {
        layout: 'radio',
        list: [
          { title: 'Hinweis', value: 'note' },
          { title: 'Wichtig', value: 'important' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Überschrift',
      type: 'string',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', tone: 'tone' },
    prepare: ({ title, tone }) => ({
      title: title || 'Hinweis',
      subtitle: tone === 'important' ? 'Wichtig' : 'Hinweis',
    }),
  },
})
