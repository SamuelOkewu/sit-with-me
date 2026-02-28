import { BlogPost, Product } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Slow Living in a Fast World',
    excerpt: 'Finding peace in the small moments of daily life, from the first cup of coffee to the evening sunset.',
    content: 'Full content here...',
    date: 'Oct 24, 2023',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1000',
    slug: 'art-of-slow-living'
  },
  {
    id: '2',
    title: 'Autumn Wardrobe Essentials',
    excerpt: 'Transitioning your style with layers, textures, and the perfect oversized scarf.',
    content: 'Full content here...',
    date: 'Oct 20, 2023',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000',
    slug: 'autumn-wardrobe-essentials'
  },
  {
    id: '3',
    title: 'Hidden Gems of the Mediterranean',
    excerpt: 'A journey through the lesser-known coastal towns that offer authentic charm and quiet beauty.',
    content: 'Full content here...',
    date: 'Oct 15, 2023',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1000',
    slug: 'hidden-gems-mediterranean'
  },
  {
    id: '4',
    title: 'Morning Rituals for a Grounded Day',
    excerpt: 'How setting a morning intention can transform your entire outlook and productivity.',
    content: 'Full content here...',
    date: 'Oct 10, 2023',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    slug: 'morning-rituals'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Signature Silk Scarf',
    price: 85,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600',
    stripeUrl: 'https://buy.stripe.com/mock_scarf',
    category: 'Accessories'
  },
  {
    id: 'p2',
    name: 'Oversized Cotton T-Shirt',
    price: 45,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    stripeUrl: 'https://buy.stripe.com/mock_tshirt',
    category: 'Apparel'
  },
  {
    id: 'p3',
    name: 'Cashmere Blend Wrap',
    price: 120,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=600',
    stripeUrl: 'https://buy.stripe.com/mock_wrap',
    category: 'Accessories'
  },
  {
    id: 'p4',
    name: 'Minimalist Tote Bag',
    price: 65,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    stripeUrl: 'https://buy.stripe.com/mock_tote',
    category: 'Accessories'
  }
];
