import { defineArrayMember, defineField, defineType } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Galerie',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [defineArrayMember({ type: 'editorialImage' })],
      validation: (rule) => rule.required().min(2).max(12),
    }),
  ],
  preview: {
    select: { images: 'images' },
    prepare: ({ images }) => ({
      title: 'Galerie',
      subtitle: `${Array.isArray(images) ? images.length : 0} Bilder`,
    }),
  },
})
