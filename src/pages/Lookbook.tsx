import { motion } from 'motion/react';

const LOOKBOOK_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
    title: 'Monochrome Zebra',
    caption: 'Bold patterns for a confident day.',
    shopUrl: 'https://buy.stripe.com/mock_scarf'
  },
  {
    url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1000',
    title: 'The Pink Silhouette',
    caption: 'Soft hues and effortless elegance.',
    shopUrl: 'https://buy.stripe.com/mock_tshirt'
  },
  {
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
    title: 'Urban Minimalist',
    caption: 'Classic black and white for the city streets.',
    shopUrl: 'https://buy.stripe.com/mock_tote'
  },
  {
    url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000',
    title: 'Denim Days',
    caption: 'Comfort meets style in every step.',
    shopUrl: 'https://buy.stripe.com/mock_tshirt'
  },
  {
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000',
    title: 'Navy Sophistication',
    caption: 'A timeless dress for any occasion.',
    shopUrl: 'https://buy.stripe.com/mock_wrap'
  },
  {
    url: 'https://images.unsplash.com/photo-1529139513402-5ad5a9c6ef19?auto=format&fit=crop&q=80&w=1000',
    title: 'Checkered Charm',
    caption: 'Playful patterns for a Sunday afternoon.',
    shopUrl: 'https://buy.stripe.com/mock_scarf'
  },
  {
    url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=1000',
    title: 'Royal Mantles',
    caption: 'The signature look of the season.',
    shopUrl: 'https://buy.stripe.com/mock_tshirt'
  }
];

export default function Lookbook() {
  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-6 block"
          >
            Visual Journey
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-serif mb-8"
          >
            Lookbook
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-serif italic text-ink/60 max-w-2xl mx-auto"
          >
            A curated collection of styles and moments that define our aesthetic.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {LOOKBOOK_IMAGES.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx % 2 * 0.2 }}
              className={`space-y-6 ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm group relative">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                
                {/* Shop the Look Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a 
                    href={item.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-ink px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-ink hover:text-white transition-colors"
                  >
                    Shop the Look
                  </a>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif">{item.title}</h3>
                  <p className="text-sm text-ink/60 italic">{item.caption}</p>
                </div>
                <a 
                  href={item.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-widest border-b border-ink/20 pb-1 hover:border-ink transition-colors"
                >
                  Shop
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-8">Follow our journey</p>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl font-serif hover:opacity-50 transition-opacity"
          >
            @sitwithme_journal
          </a>
        </div>
      </div>
    </div>
  );
}
