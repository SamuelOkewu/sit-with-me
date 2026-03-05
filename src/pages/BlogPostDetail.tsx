import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Twitter, Facebook, Share2, Copy, Check, Clock } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getBlogPostBySlug, getRelatedPosts } from '../services/contentService';
import { BlogPost } from '../types';
import { useSEO } from '../hooks/useSEO';
import { useReadingProgress } from '../hooks/useReadingProgress';
import ReadingProgressBar from '../components/ReadingProgressBar';

// ── Helpers ──────────────────────────────────────────────────────────────────

function estimateReadTime(content: any): number {
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (Array.isArray(content)) {
    // Portable Text blocks
    content.forEach((block: any) => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        block.children.forEach((child: any) => {
          if (child.text) text += child.text + ' ';
        });
      }
    });
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function LoadingSEO() {
  useSEO({ title: 'Loading Story... | Sit With Me Journal', description: 'Reading a story from the Sit With Me lifestyle journal.' });
  return null;
}

function PostSEO({ post }: { post: BlogPost }) {
  useSEO({
    title: `${post.title} – Sit With Me Journal`,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
    // Pass ?w=1200&h=630&fit=crop for correct Open Graph dimensions
    ogImage: post.image ? `${post.image}?w=1200&h=630&fit=crop` : post.image,
    ogType: 'article',
    keywords: `${post.category.toLowerCase()}, ${post.title.toLowerCase()}, sit with me, lifestyle blog`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      url: `https://sitwithme.com/blog/${post.slug}`,
      author: { '@type': 'Organization', name: 'Sit With Me', url: 'https://sitwithme.com' },
      publisher: {
        '@type': 'Organization',
        name: 'Sit With Me',
        logo: { '@type': 'ImageObject', url: 'https://sitwithme.com/logo.png' },
      },
      articleSection: post.category,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://sitwithme.com/blog/${post.slug}` },
    },
  });
  return null;
}

// ── Share helpers ─────────────────────────────────────────────────────────────
const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [featuredIsPortrait, setFeaturedIsPortrait] = useState<boolean | null>(null);
  const featuredImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getBlogPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
      if (data) {
        getRelatedPosts(data.category, data.slug).then(setRelated);
        if (data.imageWidth != null && data.imageHeight != null) {
          setFeaturedIsPortrait(data.imageHeight > data.imageWidth);
        }
      }
    });
  }, [slug]);

  const handleFeaturedLoad = () => {
    setImgLoaded(true);
    if (featuredIsPortrait !== null) return;
    if (featuredImgRef.current) {
      const { naturalWidth: w, naturalHeight: h } = featuredImgRef.current;
      setFeaturedIsPortrait(h > w);
    }
  };

  // Reading progress shown via ReadingProgressBar (fixed at top of page)
  useReadingProgress(); // keeps the hook alive so the bar updates

  const readTime = post ? estimateReadTime(post.content) : 0;

  if (loading) {
    return (
      <>
        <LoadingSEO />
        <div className="pt-40 pb-32 flex items-center justify-center min-h-[60vh]">
          <p className="text-ink/40 dark:text-paper/40 font-serif italic">Loading story...</p>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-32 text-center">
        <h1 className="text-4xl font-serif mb-8 dark:text-paper">Story not found</h1>
        <Link to="/blog" className="text-xs uppercase tracking-widest border-b border-ink dark:border-paper pb-1 dark:text-paper">
          Back to Journal
        </Link>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleNativeShare = async () => {
    try { await navigator.share({ title: shareTitle, url: shareUrl }); } catch {}
  };
  const shareOnTwitter = () =>
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareOnFacebook = () =>
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = shareUrl; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ShareButtons = ({ size = 18 }: { size?: number }) => (
    <div className="flex items-center gap-4 flex-wrap">
      {canNativeShare && (
        <button onClick={handleNativeShare} aria-label="Share" title="Share" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors">
          <Share2 size={size} />
        </button>
      )}
      <button onClick={shareOnTwitter} aria-label="Share on Twitter" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors">
        <Twitter size={size} />
      </button>
      <button onClick={shareOnFacebook} aria-label="Share on Facebook" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors">
        <Facebook size={size} />
      </button>
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest border border-ink/20 dark:border-paper/20 hover:border-ink/50 dark:hover:border-paper/50 px-3 py-1.5 rounded-full text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-all duration-200"
      >
        {copied ? <><Check size={11} /><span>Copied!</span></> : <><Copy size={11} /><span>Copy link</span></>}
      </button>
    </div>
  );

  return (
    <>
      <PostSEO post={post} />
      {/* Reading progress bar — fixed at very top of viewport */}
      <ReadingProgressBar />

      <div className="pt-40 pb-32 dark:bg-[#111110] dark:text-paper min-h-screen transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper transition-colors mb-12">
            <ArrowLeft size={14} />
            <span>Back to Journal</span>
          </Link>

          <header className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-ink/40 dark:text-paper/40 mb-4 block">{post.category}</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-4 border-y border-ink/5 dark:border-paper/10 py-6">
              <div className="flex items-center gap-5">
                <time className="text-sm italic font-serif text-ink/60 dark:text-paper/60" dateTime={post.date}>{post.date}</time>
                {/* Estimated read time */}
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40">
                  <Clock size={11} />
                  {readTime} min read
                </span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40">Share</span>
                <ShareButtons size={17} />
              </div>
            </div>
          </header>

          {/* ── Featured image: blur-up LQIP + auto-orient portrait/landscape ── */}
          <div className="mb-16 overflow-hidden rounded-sm bg-sand/10 dark:bg-white/5 flex items-center justify-center max-h-[78vh]">
            {post.lqip && (
              <img
                src={post.lqip}
                aria-hidden="true"
                className={`absolute w-full h-full object-cover blur-xl scale-110 transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}
              />
            )}
            <img
              ref={featuredImgRef}
              src={post.image}
              alt={`Featured image for: ${post.title}`}
              onLoad={handleFeaturedLoad}
              referrerPolicy="no-referrer"
              className={
                featuredIsPortrait === true
                  ? `h-full max-h-[78vh] w-auto object-contain transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`
                  : `w-full h-auto object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`
              }
            />
          </div>

          {/* Article body */}
          <article className="prose prose-lg max-w-none">
            <div className="text-xl leading-relaxed text-ink/80 dark:text-paper/80 italic mb-12 font-serif">
              {post.excerpt}
            </div>

            

            <div className="text-ink/70 dark:text-paper/70 leading-relaxed space-y-8">
              {Array.isArray(post.content)
                ? <PortableText value={post.content} />
                : <p>{post.content}</p>
              }
            </div>
          </article>

          {/* Footer share */}
          <footer className="mt-24 pt-12 border-t border-ink/5 dark:border-paper/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <span className="text-xs uppercase tracking-widest text-ink/40 dark:text-paper/40">Share this story</span>
              <ShareButtons size={20} />
            </div>
          </footer>

          {/* ── Related posts ── */}
          {related.length > 0 && (
            <section className="mt-24" aria-label="Related stories">
              <h2 className="text-2xl font-serif mb-10 text-center">More from {post.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-sand/10 dark:bg-white/5 relative">
                      {rp.lqip && (
                        <img
                          src={rp.lqip}
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                        />
                      )}
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-2 block">{rp.category}</span>
                    <h3 className="text-lg font-serif group-hover:opacity-60 transition-opacity dark:text-paper line-clamp-2">{rp.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
