import { defineType, defineField } from 'sanity'

export const djSchema = defineType({
  name: 'dj',
  title: 'DJs',
  type: 'document',
  fields: [
    defineField({ name: 'name',       title: 'DJ Name',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'bio',        title: 'Bio',      type: 'text',   rows: 3 }),
    defineField({ name: 'genre',      title: 'Genre (e.g. House, Afro Beats)', type: 'string' }),
    defineField({ name: 'isResident', title: 'Resident DJ?', type: 'boolean', initialValue: false }),
    defineField({ name: 'image',      title: 'Photo',    type: 'image',  options: { hotspot: true } }),
    defineField({
      name: 'upcomingDates', title: 'Upcoming Dates', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'date',      title: 'Date',       type: 'date'   },
        { name: 'eventName', title: 'Event Name', type: 'string' },
        { name: 'startTime', title: 'Start Time', type: 'string' },
      ]}],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'genre', media: 'image' } },
})
