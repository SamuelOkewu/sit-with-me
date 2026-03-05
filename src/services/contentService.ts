import { sanityClient } from '../lib/sanity';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import { BlogPost, Product } from '../types';

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const IS_SANITY_CONFIGURED =
  !!PROJECT_ID && PROJECT_ID !== 'your-project-id' && PROJECT_ID.length > 5;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!IS_SANITY_CONFIGURED) return BLOG_POSTS;
  try {
    const query = `*[_type == "post"] | order(date desc) {
      "id": _id,
      title,
      excerpt,
      content,
      date,
      category,
      "image": mainImage.asset->url,
      "imageWidth":  mainImage.asset->metadata.dimensions.width,
      "imageHeight": mainImage.asset->metadata.dimensions.height,
      "lqip":        mainImage.asset->metadata.lqip,
      "slug": slug.current
    }`;
    const data = await sanityClient.fetch(query);
    return data?.length > 0 ? data : BLOG_POSTS;
  } catch {
    console.warn('Sanity connection failed. Falling back to local content.');
    return BLOG_POSTS;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!IS_SANITY_CONFIGURED) return PRODUCTS;
  try {
    const query = `*[_type == "product"] {
      "id": _id,
      name,
      price,
      description,
      "image": image.asset->url,
      stripeUrl,
      category
    }`;
    const data = await sanityClient.fetch(query);
    return data?.length > 0 ? data : PRODUCTS;
  } catch {
    console.warn('Sanity connection failed for products.');
    return PRODUCTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!IS_SANITY_CONFIGURED) return BLOG_POSTS.find(p => p.slug === slug);
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      "id": _id,
      title,
      excerpt,
      content,
      date,
      category,
      "image": mainImage.asset->url,
      "imageWidth":  mainImage.asset->metadata.dimensions.width,
      "imageHeight": mainImage.asset->metadata.dimensions.height,
      "lqip":        mainImage.asset->metadata.lqip,
      "slug": slug.current
    }`;
    const data = await sanityClient.fetch(query, { slug });
    return data || BLOG_POSTS.find(p => p.slug === slug);
  } catch {
    return BLOG_POSTS.find(p => p.slug === slug);
  }
}

/** Returns up to 3 posts in the same category, excluding the current slug. */
export async function getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  if (!IS_SANITY_CONFIGURED) {
    return BLOG_POSTS
      .filter(p => p.category === category && p.slug !== currentSlug)
      .slice(0, 3);
  }
  try {
    const query = `*[_type == "post" && category == $category && slug.current != $currentSlug] | order(date desc) [0..2] {
      "id": _id,
      title,
      excerpt,
      date,
      category,
      "image": mainImage.asset->url,
      "lqip":  mainImage.asset->metadata.lqip,
      "slug":  slug.current
    }`;
    const data = await sanityClient.fetch(query, { category, currentSlug });
    return data?.length > 0
      ? data
      : BLOG_POSTS.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 3);
  } catch {
    return BLOG_POSTS.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 3);
  }
}
