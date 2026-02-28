import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../services/contentService';
import { BlogPost } from '../types';
import { cn } from '../lib/utils';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Lifestyle', 'Fashion', 'Travel', 'Wellness'];

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif mb-8">The Journal</h1>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12 relative">
            <input 
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-ink/10 py-3 px-4 focus:outline-none focus:border-ink transition-colors text-center font-serif italic"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-xs uppercase tracking-[0.2em] pb-1 border-b transition-all",
                  activeCategory === cat ? "border-ink text-ink" : "border-transparent text-ink/40 hover:text-ink"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-3 block">{post.category}</span>
              <h2 className="text-2xl font-serif mb-4 group-hover:opacity-60 transition-opacity">{post.title}</h2>
              <p className="text-sm text-ink/60 line-clamp-2 leading-relaxed mb-6">{post.excerpt}</p>
              <span className="text-[10px] uppercase tracking-widest text-ink/40">{post.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
