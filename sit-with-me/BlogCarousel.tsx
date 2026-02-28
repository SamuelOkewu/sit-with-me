// src/components/ui/BlogCarousel.tsx
// Auto-slides every 3 seconds. Each card links to the full post.

"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { urlFor } from "@/lib/sanity";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage: any;
  categories: { title: string }[];
}

interface BlogCarouselProps {
  posts: Post[];
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  // emblaRef attaches to the carousel container
  // Autoplay delay is 3000ms = 3 seconds
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400">
        No posts yet. Check back soon!
      </div>
    );
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="flex-none w-[85vw] sm:w-[45vw] lg:w-[30vw] group"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

              {/* Post Cover Image */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                    <span className="text-stone-400 text-sm">No image</span>
                  </div>
                )}

                {/* Category Tag */}
                {post.categories?.[0] && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-700 text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                    {post.categories[0].title}
                  </span>
                )}
              </div>

              {/* Post Info */}
              <div className="p-5">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), "MMM d, yyyy")
                    : ""}
                </p>
                <h3 className="font-serif text-lg text-stone-800 leading-snug mb-2 group-hover:text-stone-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-block mt-4 text-xs uppercase tracking-widest text-stone-800 font-medium border-b border-stone-800 pb-0.5 group-hover:border-stone-400 group-hover:text-stone-400 transition-colors">
                  Read More →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
