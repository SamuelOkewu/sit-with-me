import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Twitter, Facebook, Share2 } from 'lucide-react';
import { getBlogPostBySlug } from '../services/contentService';
import { BlogPost } from '../types';

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getBlogPostBySlug(slug).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-32 flex items-center justify-center min-h-[60vh]">
        <p className="text-ink/40 font-serif italic">Loading story...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-32 text-center">
        <h1 className="text-4xl font-serif mb-8">Story not found</h1>
        <Link to="/blog" className="text-xs uppercase tracking-widest border-b border-ink pb-1">
          Back to Journal
        </Link>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnPinterest = () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(post.image)}&description=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors mb-12">
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </Link>

        <header className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4 block">{post.category}</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-between border-y border-ink/5 py-6">
            <span className="text-sm italic font-serif text-ink/60">{post.date}</span>
            
            {/* Social Share Buttons */}
            <div className="flex items-center space-x-6">
              <span className="text-[10px] uppercase tracking-widest text-ink/40">Share</span>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={shareOnTwitter}
                  className="text-ink/60 hover:text-ink transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter size={18} />
                </button>
                <button 
                  onClick={shareOnFacebook}
                  className="text-ink/60 hover:text-ink transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button 
                  onClick={shareOnPinterest}
                  className="text-ink/60 hover:text-ink transition-colors"
                  title="Share on Pinterest"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="aspect-video overflow-hidden rounded-sm mb-16">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <article className="prose prose-lg max-w-none prose-serif">
          <div className="text-xl leading-relaxed text-ink/80 italic mb-12 font-serif">
            {post.excerpt}
          </div>
          <div className="text-ink/70 leading-relaxed space-y-8">
            {/* In a real app, this would be rendered from Portable Text if using Sanity */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-3xl font-serif text-ink mt-12 mb-6">The Essence of Style</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <blockquote className="border-l-2 border-ink pl-8 italic text-2xl font-serif my-12 text-ink/90">
              "Style is a way to say who you are without having to speak."
            </blockquote>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </div>
        </article>

        <footer className="mt-24 pt-12 border-t border-ink/5 flex justify-center">
           <div className="flex items-center space-x-8">
              <span className="text-xs uppercase tracking-widest text-ink/40">Share this story</span>
              <div className="flex items-center space-x-6">
                <button onClick={shareOnTwitter} className="hover:opacity-50 transition-opacity"><Twitter size={20} /></button>
                <button onClick={shareOnFacebook} className="hover:opacity-50 transition-opacity"><Facebook size={20} /></button>
                <button onClick={shareOnPinterest} className="hover:opacity-50 transition-opacity"><Share2 size={20} /></button>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
}
