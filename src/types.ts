export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: any;
  date: string;
  category: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Low-quality image placeholder (base64) from Sanity for blur-up effect. */
  lqip?: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  /** Optional short description shown in quick-view modal. */
  description?: string;
  stripeUrl: string;
  category: string;
}
