// src/components/ui/ShopCarousel.tsx
// Auto-slides every 3 seconds. Clicking a product takes you to Stripe checkout.

"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: any;
  description: string;
  stripePaymentLink: string;
  category: string;
  inStock: boolean;
}

interface ShopCarouselProps {
  products: Product[];
}

export default function ShopCarousel({ products }: ShopCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400">
        Products coming soon. Stay tuned!
      </div>
    );
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {products.map((product) => (
          <div key={product._id} className="flex-none w-[75vw] sm:w-[38vw] lg:w-[24vw] group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

              {/* Product Image */}
              <div className="relative h-72 w-full bg-stone-100 overflow-hidden">
                {product.image ? (
                  <Image
                    src={urlFor(product.image).width(500).height(600).url()}
                    alt={product.image.alt || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                    <span className="text-stone-400 text-sm">No image</span>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <span className="text-stone-700 text-sm font-medium uppercase tracking-widest">
                      Sold Out
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-700 text-xs uppercase tracking-widest px-3 py-1 rounded-full capitalize">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-serif text-base text-stone-800 mb-1 group-hover:text-stone-600 transition-colors">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-xs text-stone-400 mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-stone-800 font-medium">
                    ₦{product.price?.toLocaleString()}
                  </span>

                  {/* Buy Button → Goes to Stripe */}
                  {product.inStock ? (
                    <a
                      href={product.stripePaymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-stone-800 hover:bg-stone-700 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-colors"
                    >
                      Buy Now
                    </a>
                  ) : (
                    <span className="text-stone-400 text-xs uppercase tracking-widest">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
