import { defineType, defineField } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'startTime', title: 'Start Time (e.g. 10PM)', type: 'string' }),
    defineField({ name: 'endTime', title: 'End Time (e.g. LATE)', type: 'string' }),
    defineField({ name: 'djName', title: 'DJ Name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'eventType', title: 'Event Type', type: 'string',
      options: { list: [
        { title: 'Weekly',  value: 'WEEKLY'  },
        { title: 'Special', value: 'SPECIAL' },
        { title: 'Monthly', value: 'MONTHLY' },
        { title: 'Guest',   value: 'GUEST'   },
      ]},
      validation: r => r.required(),
    }),
    defineField({ name: 'image', title: 'Event Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isFeatured', title: 'Show on Homepage?', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'title', subtitle: 'date', media: 'image' } },
})
