// src/app/page.tsx
// The homepage — Hero banner + latest blog posts + shop products (both auto-sliding)

import { client, LATEST_POSTS_QUERY, ALL_PRODUCTS_QUERY } from "@/lib/sanity";
import BlogCarousel from "@/components/ui/BlogCarousel";
import ShopCarousel from "@/components/ui/ShopCarousel";
import Link from "next/link";

// Fetch data from Sanity every time the page loads
async function getData() {
  const [posts, products] = await Promise.all([
    client.fetch(LATEST_POSTS_QUERY),
    client.fetch(ALL_PRODUCTS_QUERY),
  ]);
  return { posts, products };
}

export default async function HomePage() {
  const { posts, products } = await getData();

  return (
    <>
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative h-[85vh] flex items-center justify-center bg-stone-900 overflow-hidden">
        {/* Background image — replace with your client's photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/hero-image.jpg')" }}
        />
        <div className="relative text-center text-white px-4 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-300 mb-6">
            Welcome to
          </p>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
            The Brand
          </h1>
          <p className="text-stone-300 text-lg font-light leading-relaxed mb-10 max-w-md mx-auto">
            Stories, style, and things worth loving — curated just for you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-stone-900 px-8 py-3 text-xs uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              Read the Blog
            </Link>
            <Link
              href="/shop"
              className="border border-white text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LATEST BLOG POSTS CAROUSEL ────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
              From the Blog
            </p>
            <h2 className="font-serif text-4xl text-stone-800">Latest Posts</h2>
          </div>
          <Link
            href="/blog"
            className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 transition-colors border-b border-stone-300 pb-0.5 hidden sm:block"
          >
            View All Posts →
          </Link>
        </div>

        {/* Blog cards slide left every 3 seconds */}
        <BlogCarousel posts={posts} />

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800"
          >
            View All Posts →
          </Link>
        </div>
      </section>

      {/* ─── DIVIDER ──────────────────────────────────────────────── */}
      <div className="border-t border-stone-200 mx-4 sm:mx-8 lg:mx-16" />

      {/* ─── SHOP SECTION CAROUSEL ────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
              The Shop
            </p>
            <h2 className="font-serif text-4xl text-stone-800">Shop the Edit</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 transition-colors border-b border-stone-300 pb-0.5 hidden sm:block"
          >
            View All Products →
          </Link>
        </div>

        {/* Product cards slide left every 3 seconds */}
        <ShopCarousel products={products} />
      </section>

      {/* ─── SOCIAL SECTION ──────────────────────────────────────── */}
      <section className="bg-stone-900 text-white py-20 px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
          Join the community
        </p>
        <h2 className="font-serif text-4xl mb-4">Let's Stay Connected</h2>
        <p className="text-stone-400 mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Follow along on Instagram for daily inspiration, subscribe on YouTube for in-depth videos,
          and reach out on WhatsApp for personal styling help.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 text-xs uppercase tracking-widest transition-colors"
          >
            Instagram
          </a>
          <a
            href={process.env.NEXT_PUBLIC_YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 text-xs uppercase tracking-widest transition-colors"
          >
            YouTube
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 text-xs uppercase tracking-widest transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </>
  );
}
