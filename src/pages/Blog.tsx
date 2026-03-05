import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { getBlogPosts } from '../services/contentService';
import { BlogPost } from '../types';
import { cn } from '../lib/utils';
import { useSEO } from '../hooks/useSEO';

function estimateReadTime(content: any): number {
  let text = '';
  if (typeof content === 'string') text = content;
  else if (Array.isArray(content)) {
    content.forEach((block: any) => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        block.children.forEach((c: any) => { if (c.text) text += c.text + ' '; });
      }
    });
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Lifestyle', 'Fashion', 'Travel', 'Wellness'];

  useSEO({
    title: 'The Journal – Lifestyle, Fashion & Wellness Stories | Sit With Me',
    description: 'Explore the Sit With Me journal – stories on intentional living, effortless fashion, travel destinations, and wellness.',
    canonical: '/blog',
    keywords: 'lifestyle blog, fashion stories, wellness articles, travel journal, intentional living blog',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'The Sit With Me Journal',
      url: 'https://sitwithme.com/blog',
    },
  });

  useEffect(() => { getBlogPosts().then(setPosts); }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-40 pb-32 dark:bg-[#111110] dark:text-paper min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif mb-8">The Journal</h1>
          <div className="max-w-md mx-auto mb-12 relative">
            <input
              type="search"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blog posts"
              className="w-full bg-transparent border-b border-ink/10 dark:border-paper/10 py-3 px-4 focus:outline-none focus:border-ink dark:focus:border-paper transition-colors text-center font-serif italic dark:text-paper dark:placeholder-paper/40"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper">
                Clear
              </button>
            )}
          </div>
          <nav aria-label="Blog categories">
            <div className="flex flex-wrap justify-center gap-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={cn(
                    'text-xs uppercase tracking-[0.2em] pb-1 border-b transition-all',
                    activeCategory === cat
                      ? 'border-ink dark:border-paper text-ink dark:text-paper'
                      : 'border-transparent text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredPosts.map((post) => {
            const readTime = estimateReadTime(post.content);
            return (
              <article key={post.id}>
                <Link to={`/blog/${post.slug}`} className="group">
                  {/* Blog card image with LQIP blur-up */}
                  <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6 relative bg-sand/10 dark:bg-white/5">
                    {post.lqip && (
                      <img
                        src={post.lqip}
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                      />
                    )}
                    <img
                      src={post.image}
                      alt={`${post.title} – ${post.category} on Sit With Me`}
                      className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      width="400"
                      height="500"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40 mb-3 block">{post.category}</span>
                  <h2 className="text-2xl font-serif mb-4 group-hover:opacity-60 transition-opacity">{post.title}</h2>
                  <p className="text-sm text-ink/60 dark:text-paper/60 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <time className="text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40" dateTime={post.date}>{post.date}</time>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40">
                      <Clock size={10} />
                      {readTime} min read
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
