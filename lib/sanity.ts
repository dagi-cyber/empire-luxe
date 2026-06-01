import { createClient } from '@sanity/client'
import imageUrlBuilder  from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kvulwnb8',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production',
  apiVersion:'2024-01-01',
  useCdn:    false,
  token:     process.env.SANITY_API_TOKEN,
})
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: Record<string, unknown>) => builder.image(source)

export async function getEvents() {
  return sanityClient.fetch(
    `*[_type == "event" && isFeatured == true] | order(date asc) {
      _id, title, date, startTime, endTime, djName, description, eventType, image
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getLiquorItems(category?: string) {
  const filter = category
    ? `*[_type == "liquorItem" && category == $category && available == true]`
    : `*[_type == "liquorItem" && available == true]`
  return sanityClient.fetch(
    filter + ` | order(name asc) { _id, name, description, price, category, tags, image }`,
    { category },
    { next: { revalidate: 3600 } }
  )
}

export async function getFoodItems(category?: string) {
  const filter = category
    ? `*[_type == "foodItem" && category == $category && available == true]`
    : `*[_type == "foodItem" && available == true]`
  return sanityClient.fetch(
    filter + ` | order(name asc) { _id, name, description, price, category, isChefSpecial, isLateNight, image }`,
    { category },
    { next: { revalidate: 3600 } }
  )
}

export async function getDJs() {
  return sanityClient.fetch(
    `*[_type == "dj"] | order(isResident desc, name asc) {
      _id, name, bio, genre, isResident, image, upcomingDates
    }`,
    {},
    { next: { revalidate: 86400 } }
  )
}

export async function getGalleryImages(category?: string) {
  const filter = category
    ? `*[_type == "galleryImage" && category == $category]`
    : `*[_type == "galleryImage"]`
  return sanityClient.fetch(
    filter + ` | order(order asc) { _id, image, caption, category }`,
    { category },
    { next: { revalidate: 86400 } }
  )
}
export async function getServices() {
  return sanityClient.fetch(
    `*[_type == "service" && active == true] | order(order asc) {
      _id, title, description, icon, ctaText, ctaLink, order
    }`,
    {},
    { next: { revalidate: 86400 } }
  )
}
