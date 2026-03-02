import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  schema?: object;
}

const BASE_URL = 'https://sitwithme.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  keywords,
  schema,
}: SEOProps) {
  useEffect(() => {
    // ── Title ──────────────────────────────────────────────
    document.title = title;

    // ── Helper to set/create a meta tag ───────────────────
    const setMeta = (selector: string, content: string, attr = 'content') => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector
          .replace('[', '')
          .replace(']', '')
          .split('=')
          .map(s => s.replace(/"/g, ''));
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    // ── Helper to set/create a <link> tag ─────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // ── Standard meta ──────────────────────────────────────
    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);

    // ── Canonical ──────────────────────────────────────────
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${window.location.pathname}`;
    setLink('canonical', canonicalUrl);

    // ── Open Graph ─────────────────────────────────────────
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:type"]', ogType);

    // ── Twitter Card ───────────────────────────────────────
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    // ── Per-page JSON-LD schema ────────────────────────────
    if (schema) {
      const existingScript = document.getElementById('page-schema');
      if (existingScript) existingScript.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-schema';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // ── Cleanup: remove page-level schema on unmount ───────
    return () => {
      const pageSchema = document.getElementById('page-schema');
      if (pageSchema) pageSchema.remove();
    };
  }, [title, description, canonical, ogImage, ogType, keywords, schema]);
}
