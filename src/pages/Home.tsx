import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import { getBlogPosts, getProducts } from '../services/contentService';
import { BlogPost, Product } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBlogPosts().then(setPosts);
    getProducts().then(setProducts);
  }, []);
  const renderBlogPost = (post: BlogPost) => {
    if (!post) return null;
    return (
      <Link to={`/blog/${post.slug}`} className="relative w-full h-[600px] flex items-center justify-center group overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block opacity-80">{post.category}</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">{post.title}</h2>
          <p className="text-sm md:text-base opacity-90 mb-8 line-clamp-2">{post.excerpt}</p>
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest border-b border-white pb-1 group-hover:opacity-70 transition-opacity">
            <span>Read Story</span>
            <ArrowRight size={14} />
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
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-left">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-4 block">{product.category}</span>
          <h3 className="text-3xl font-serif mb-4">{product.name}</h3>
          <p className="text-2xl font-light mb-8">${product.price}</p>
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
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-paper/10" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs uppercase tracking-[0.5em] mb-6 block"
          >
            Welcome to the Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-6xl md:text-9xl font-serif leading-[0.85] mb-8"
          >
            SIT WITH <br /> ME
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/blog" className="text-xs uppercase tracking-widest border-b border-ink pb-1 hover:opacity-50 transition-opacity">
              Explore the Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-serif mb-2">Latest from the Journal</h2>
            <p className="text-ink/60 text-sm">Stories of life, style, and intentionality.</p>
          </div>
          <Link to="/blog" className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity mb-2">
            View All
          </Link>
        </div>
        <Carousel 
          items={posts} 
          renderItem={renderBlogPost} 
          className="h-[600px]"
        />
      </section>

      {/* Shop Teaser Carousel */}
      <section className="py-32 bg-sand/20">
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
      <section className="py-32 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000" 
                alt="About" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
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
