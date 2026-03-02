# 🔍 Sit With Me – SEO Implementation Guide

## ✅ What Has Already Been Done (in this codebase)

### 1. `index.html` – Base SEO Tags
Every visit to your site loads these tags:
- Title tag with keywords
- Meta description
- Open Graph tags (WhatsApp/Facebook previews)
- Twitter card tags
- Canonical URL
- Website + Organization schema markup
- Preconnect to image CDNs for faster loading

### 2. `src/hooks/useSEO.ts` – Per-Page Dynamic SEO
Each page now calls `useSEO()` to set unique:
- Page title
- Meta description
- Canonical URL
- Open Graph image
- JSON-LD structured data (schema)

### 3. Pages Updated
| Page | Title | Description | Schema |
|------|-------|-------------|--------|
| Home | ✅ | ✅ | WebPage |
| Blog | ✅ | ✅ | Blog |
| Blog Post | ✅ | ✅ (uses post excerpt) | BlogPosting |
| Shop | ✅ | ✅ | ItemList + Product markup |
| Lookbook | ✅ | ✅ | CollectionPage |
| About | ✅ | ✅ | AboutPage |
| Contact | ✅ | ✅ | ContactPage |

### 4. `public/robots.txt`
Tells Google it's allowed to crawl your site.

### 5. `public/sitemap.xml`
Lists all your pages so Google finds them faster.

### 6. Image Improvements
- All images now have descriptive `alt` text
- `loading="lazy"` added to non-hero images (faster page load)
- `width` and `height` attributes added (prevents layout shifts)
- `<time>` tags with `dateTime` attributes on blog dates
- `<article>` semantic tags on blog cards and shop items

---

## 🚀 What YOU Need To Do Next

### STEP 1: Replace the domain name
Find and replace `https://sitwithme.com` with your actual domain in:
- `index.html`
- `public/sitemap.xml`
- `src/hooks/useSEO.ts` (the BASE_URL constant)

### STEP 2: Create your OG Image
See `public/OG_IMAGE_INSTRUCTIONS.md` for details.
Create a 1200×630px branded image and save as `public/og-image.jpg`.

### STEP 3: Register with Google Search Console
1. Go to https://search.google.com/search-console
2. Add your domain
3. Verify ownership (they'll give you a meta tag — add it to `index.html`)
4. Go to Sitemaps → submit `https://yourdomain.com/sitemap.xml`

### STEP 4: Register with Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Same process — submit your sitemap

### STEP 5: Create a Google Business Profile
1. Go to https://business.google.com
2. Add your business name, category, contact info
3. This makes you show up in Google Maps and local searches

### STEP 6: Add Google Analytics
Add this inside `<head>` in `index.html` (replace G-XXXXXXXXXX with your ID):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Get your ID at: https://analytics.google.com

---

## 📝 Update Sitemap When You Publish Blog Posts

Every time you publish a new blog post, add it to `public/sitemap.xml`:
```xml
<url>
  <loc>https://yourdomain.com/blog/your-post-slug</loc>
  <lastmod>2025-02-01</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 🔑 Keywords to Target

### Primary Keywords
- "lifestyle blog Nigeria"
- "intentional living blog"
- "fashion journal Africa"
- "quiet luxury fashion Nigeria"
- "slow fashion blog"

### Long-tail Keywords (easier to rank for)
- "how to build an intentional wardrobe"
- "effortless style tips for women"
- "wellness and lifestyle blog Nigeria"
- "curated fashion pieces for women"

---

## ⚡ Page Speed Tips
1. **Compress images** before uploading to Sanity – use https://squoosh.app
2. **Host on Vercel or Netlify** (both are free and very fast)
3. **Enable HTTPS** – your host should do this automatically
4. **Test your speed** at https://pagespeed.web.dev

---

## 🧪 Test Your SEO
| Tool | Link | What to Check |
|------|------|---------------|
| Rich Results Test | https://search.google.com/test/rich-results | Schema markup |
| Mobile-Friendly | https://search.google.com/test/mobile-friendly | Mobile SEO |
| PageSpeed Insights | https://pagespeed.web.dev | Load time |
| Meta Tag Tester | https://metatags.io | OG preview |
| Schema Validator | https://validator.schema.org | JSON-LD validity |

