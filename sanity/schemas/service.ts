import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'Paste an emoji e.g. 👑 🍾 🎧 🥂',
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'e.g. BOOK VIP TABLE',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      description: 'e.g. #reservation or #dj',
    }),
    defineField({
      name: 'order',
      title: 'Display Order (1 = first)',
      type: 'number',
    }),
    defineField({
      name: 'active',
      title: 'Show on website?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
