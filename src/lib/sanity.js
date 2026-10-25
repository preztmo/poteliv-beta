import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4nyh6llz',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-10-24',
  useCdn: false,
})

const imageBuilder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return imageBuilder.image(source)
}

export const articlesQuery = `*[_type == "article"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  intro,
  photo
}`

export const articleByIdQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  intro,
  content,
  photo
}`
