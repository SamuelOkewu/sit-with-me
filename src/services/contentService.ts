import { sanityClient } from '../lib/sanity';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import { BlogPost, Product } from '../types';

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const IS_SANITY_CONFIGURED = !!PROJECT_ID && PROJECT_ID !== 'your-project-id' && PROJECT_ID.length > 5;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!IS_SANITY_CONFIGURED) {
    return BLOG_POSTS;
  }

  try {
    const query = `*[_type == "post"] | order(date desc) {
      "id": _id,
      title,
      excerpt,
      content,
      date,
      category,
      "image": mainImage.asset->url,
      "slug": slug.current
    }`;
    const data = await sanityClient.fetch(query);
    // If Sanity returns an empty array (no posts yet), still show mock data for better DX
    return data && data.length > 0 ? data : BLOG_POSTS;
  } catch (error) {
    // Log a more helpful warning instead of a full error
    console.warn('Sanity connection failed. Falling back to local content. Check your Project ID and CORS settings at sanity.io/manage');
    return BLOG_POSTS;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!IS_SANITY_CONFIGURED) {
    return PRODUCTS;
  }

  try {
    const query = `*[_type == "product"] {
      "id": _id,
      name,
      price,
      "image": image.asset->url,
      stripeUrl,
      category
    }`;
    const data = await sanityClient.fetch(query);
    return data && data.length > 0 ? data : PRODUCTS;
  } catch (error) {
    console.warn('Sanity connection failed for products. Falling back to local content.');
    return PRODUCTS;
  }
}
