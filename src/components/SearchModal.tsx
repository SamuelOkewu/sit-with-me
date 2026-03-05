import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogPosts, getProducts } from "../services/contentService";
import { BlogPost, Product } from "../types";
import { cn } from "../lib/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

type Result =
  | { type: "post"; data: BlogPost }
  | { type: "product"; data: Product };

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Preload data once
  useEffect(() => {
    getBlogPosts().then(setAllPosts);
    getProducts().then(setAllProducts);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Search — debounced
  const search = useCallback(
    (q: string) => {
      const lower = q.toLowerCase().trim();
      if (!lower) { setResults([]); return; }
      const posts: Result[] = allPosts
        .filter(p => p.title.toLowerCase().includes(lower) || p.excerpt.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower))
        .slice(0, 5)
        .map(data => ({ type: "post", data }));
      const products: Result[] = allProducts
        .filter(p => p.name.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower))
        .slice(0, 3)
        .map(data => ({ type: "product", data }));
      setResults([...posts, ...products]);
    },
    [allPosts, allProducts]
  );

  useEffect(() => {
    const t = setTimeout(() => search(query), 200);
    return () => clearTimeout(t);
  }, [query, search]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl bg-paper dark:bg-[#1a1a1a] rounded-sm shadow-2xl overflow-hidden">
        {/* Input row */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-ink/10 dark:border-white/10">
          <Search size={18} className="text-ink/40 dark:text-paper/40 flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search stories, products…"
            className="flex-1 bg-transparent focus:outline-none text-base font-serif italic dark:text-paper placeholder-ink/30 dark:placeholder-paper/30"
          />
          <button onClick={onClose} className="text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-ink/5 dark:divide-white/5">
            {results.map((r, i) =>
              r.type === "post" ? (
                <li key={i}>
                  <Link
                    to={`/blog/${r.data.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-5 px-6 py-4 hover:bg-sand/30 dark:hover:bg-white/5 transition-colors group"
                  >
                    <img src={r.data.image} alt="" className="w-14 h-14 object-cover rounded-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-0.5">{r.data.category}</p>
                      <p className="text-sm font-serif truncate dark:text-paper">{r.data.title}</p>
                    </div>
                    <ArrowRight size={14} className="text-ink/20 group-hover:text-ink dark:group-hover:text-paper transition-colors flex-shrink-0" />
                  </Link>
                </li>
              ) : (
                <li key={i}>
                  <a
                    href={r.data.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-5 px-6 py-4 hover:bg-sand/30 dark:hover:bg-white/5 transition-colors group"
                  >
                    <img src={r.data.image} alt="" className="w-14 h-14 object-cover rounded-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-0.5">{r.data.category} · Shop</p>
                      <p className="text-sm font-serif truncate dark:text-paper">{r.data.name}</p>
                    </div>
                    <span className="text-sm font-light text-ink/60 dark:text-paper/60 flex-shrink-0">₦{r.data.price}</span>
                  </a>
                </li>
              )
            )}
          </ul>
        )}

        {query.trim() && results.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-serif italic text-ink/40 dark:text-paper/40">No results for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="px-6 py-6 text-center">
            <p className="text-xs uppercase tracking-widest text-ink/30 dark:text-paper/30">Start typing to search…</p>
          </div>
        )}
      </div>
    </div>
  );
}
