// src/lib/sanity.ts
// This file connects your Next.js app to Sanity CMS

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Use CDN for faster reads (set to false if you need real-time data)
});

// This helper lets you generate image URLs from Sanity image objects
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// ─── GROQ Queries (how we fetch data from Sanity) ────────────────────────────

// Fetch the 6 most recent blog posts for the homepage carousel
export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...6] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  categories[]->{ title }
}`;

// Fetch all blog posts for the blog listing page
export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  categories[]->{ title }
}`;

// Fetch a single blog post by slug (for the individual post page)
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  publishedAt,
  mainImage,
  body,
  categories[]->{ title },
  author->{ name, image, bio }
}`;

// Fetch all products for the shop carousel
export const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  price,
  image,
  description,
  stripePaymentLink,
  category
}`;
