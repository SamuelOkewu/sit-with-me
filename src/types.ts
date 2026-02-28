export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stripeUrl: string;
  category: string;
}
