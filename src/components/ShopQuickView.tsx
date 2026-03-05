import { X, ExternalLink } from "lucide-react";
import { Product } from "../types";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ShopQuickView({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet — slides up on mobile, centered modal on sm+ */}
      <div className="relative z-10 w-full sm:max-w-2xl bg-paper dark:bg-[#1a1a1a] rounded-t-2xl sm:rounded-sm shadow-2xl animate-slideUp sm:animate-none">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-sand/50 dark:bg-white/10 hover:bg-sand dark:hover:bg-white/20 transition-colors"
        >
          <X size={16} className="dark:text-paper" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-t-2xl sm:rounded-l-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 dark:text-paper/40 mb-3">
              {product.category}
            </span>
            <h2 className="text-2xl font-serif mb-4 dark:text-paper">{product.name}</h2>
            <p className="text-3xl font-light mb-8 dark:text-paper">₦{product.price.toLocaleString()}</p>
            <a
              href={product.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-ink dark:bg-paper text-paper dark:text-ink px-8 py-4 text-xs uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
            >
              <span>Buy Now</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
