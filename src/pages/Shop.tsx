import { useState, useEffect } from 'react';
import { getProducts } from '../services/contentService';
import { Product } from '../types';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif mb-8">The Collection</h1>
          <p className="text-xl font-serif italic text-ink/60">Curated pieces for an intentional wardrobe.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <a 
                  href={product.stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 left-6 right-6 bg-white py-4 text-[10px] uppercase tracking-[0.2em] text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ink hover:text-white"
                >
                  Add to Cart
                </a>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-2 block">{product.category}</span>
                  <h2 className="text-xl font-serif">{product.name}</h2>
                </div>
                <p className="text-lg font-light">₦{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
