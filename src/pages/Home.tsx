import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import { getBlogPosts, getProducts } from '../services/contentService';
import { BlogPost, Product } from '../types';
import { useSEO } from '../hooks/useSEO';

const HERO_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?auto=format&fit=crop&q=80&w=2000',
    subtitle: 'Welcome to the Journal',
    title: 'SIT WITH ME',
    linkText: 'Explore the Stories',
    linkPath: '/blog'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000',
    subtitle: 'Fashion & Style',
    title: 'CURATED ELEGANCE',
    linkText: 'View Lookbook',
    linkPath: '/lookbook'
  },
  {
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000',
    subtitle: 'Wellness & Living',
    title: 'INTENTIONAL DAYS',
    linkText: 'Read Wellness',
    linkPath: '/blog?category=Wellness'
  }
];

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useSEO({
    title: 'Sit With Me – Lifestyle, Fashion & Intentional Living',
    description: 'Sit With Me is a lifestyle journal and curated shop celebrating intentional living, effortless fashion, travel, and wellness. Explore stories, style, and slow living.',
    canonical: '/',
    keywords: 'lifestyle blog, fashion journal, intentional living, slow fashion, wellness, quiet luxury',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Sit With Me – Home',
      url: 'https://sitwithme.com/',
      description: 'A lifestyle journal and curated shop celebrating intentional living, effortless fashion, and wellness.',
      isPartOf: { '@type': 'WebSite', name: 'Sit With Me', url: 'https://sitwithme.com' }
    }
  });

  useEffect(() => {
    getBlogPosts().then(setPosts);
    getProducts().then(setProducts);
  }, []);

  const renderHeroItem = (item: typeof HERO_ITEMS[0]) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={item.image} 
          alt={`Sit With Me – ${item.subtitle}`}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative z-10 text-center px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-[0.5em] mb-6 block text-white/80"
        >
          {item.subtitle}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-9xl font-serif leading-[0.85] mb-8 text-white"
        >
          {item.title.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to={item.linkPath} className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition-opacity text-white">
            {item.linkText}
          </Link>
        </motion.div>
      </div>
    </div>
  );

  const renderBlogPost = (post: BlogPost) => {
    if (!post) return null;
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="relative group overflow-hidden rounded-sm"
        style={{ width: '100%', maxWidth: '480px', height: '600px', display: 'block' }}
      >
        {/* Portrait Image */}
        <img
          src={post.image}
          alt={`${post.title} – ${post.category} article on Sit With Me`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient overlay — stronger at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-500" />

        {/* Text — anchored to bottom of card */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 text-white">
          <span className="text-[10px] uppercase tracking-[0.35em] mb-3 block opacity-70">
            {post.category}
          </span>
          <h2 className="text-2xl font-serif mb-3 leading-snug line-clamp-3">
            {post.title}
          </h2>
          <p className="text-xs opacity-75 mb-5 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest border-b border-white/60 pb-1 group-hover:border-white transition-colors opacity-80 group-hover:opacity-100">
            <span>Read Story</span>
            <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    );
  };

  const renderProduct = (product: Product) => {
    if (!product) return null;
    return (
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        <div className="aspect-[4/5] overflow-hidden rounded-sm">
          <img 
            src={product.image} 
            alt={`${product.name} – ${product.category} available in the Sit With Me shop`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>
        <div className="text-left">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-4 block">{product.category}</span>
          <h3 className="text-3xl font-serif mb-4">{product.name}</h3>
          <p className="text-2xl font-light mb-8">₦{product.price}</p>
          <a 
            href={product.stripeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ink text-white px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-ink/80 transition-colors"
          >
            View in Shop
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20">
      {/* Hero Section Carousel */}
      <section aria-label="Featured stories" className="relative h-[90vh] overflow-hidden">
        <Carousel 
          items={HERO_ITEMS} 
          renderItem={renderHeroItem} 
          autoPlayInterval={6000}
          className="h-full"
        />
      </section>

      {/* Latest Blog Posts Carousel */}
      <section aria-label="Latest journal posts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-serif mb-2">Latest from the Journal</h2>
            <p className="text-ink/60 text-sm">Stories of life, style, and intentionality.</p>
          </div>
          <Link to="/blog" className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity mb-2">
            View All
          </Link>
        </div>
        {/* Height accounts for 600px portrait card + nav dots */}
        <Carousel 
          items={posts} 
          renderItem={renderBlogPost} 
          className="h-[660px]"
        />
      </section>

      {/* Shop Teaser Carousel */}
      <section aria-label="Featured shop items" className="py-32 bg-sand/20">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink/40 mb-4 block">Curated Collection</span>
          <h2 className="text-5xl font-serif mb-4">The Shop</h2>
          <div className="w-12 h-px bg-ink/20 mx-auto mb-8" />
        </div>
        <Carousel 
          items={products} 
          renderItem={renderProduct} 
          className="h-[500px]"
        />
        <div className="text-center mt-16">
          <Link to="/shop" className="text-xs uppercase tracking-widest border-b border-ink pb-1 hover:opacity-50 transition-opacity">
            Visit the Full Shop
          </Link>
        </div>
      </section>

      {/* About Snippet */}
      <section aria-label="About Sit With Me" className="py-32 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000" 
                alt="Sit With Me founder – a space for quiet, intentional moments"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sand -z-10 rounded-sm" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-ink/40 mb-6 block">Our Story</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight">A space for the <br /> quiet moments.</h2>
            <p className="text-ink/70 leading-relaxed mb-10">
              Sit With Me was born out of a desire to slow down and appreciate the beauty in the everyday. 
              We believe that the things we surround ourselves with—and the stories we tell—shape our experience of the world.
            </p>
            <Link to="/about" className="inline-flex items-center space-x-3 text-xs uppercase tracking-widest group">
              <span className="border-b border-ink pb-1 group-hover:opacity-50 transition-opacity">Learn More</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
