import { Youtube, Instagram, MessageCircle, Mail, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-sand/30 border-t border-ink/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif mb-6 uppercase tracking-widest">Sit With Me</h2>
            <p className="text-ink/60 max-w-md leading-relaxed">
              A space for intentional living, curated style, and the stories that connect us. 
              Join our community as we explore the beauty in the everyday.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/blog" className="hover:opacity-50 transition-opacity">Journal</Link></li>
              <li><Link to="/shop" className="hover:opacity-50 transition-opacity">Shop</Link></li>
              <li><Link to="/about" className="hover:opacity-50 transition-opacity">Our Story</Link></li>
              <li><Link to="/contact" className="hover:opacity-50 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Connect</h3>
            <div className="flex space-x-6">
              <a href="mailto:graceokeafor7@gmail.com" className="hover:opacity-50 transition-opacity" title="Email">
                <Mail size={20} />
              </a>
              <a href="https://wa.me/2348062756974" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity" title="WhatsApp">
                <MessageCircle size={20} />
              </a>
              <a href="https://www.youtube.com/@SpiritWords" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity" title="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.instagram.com/thegraceokeafor" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity" title="Main Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.instagram.com/shoproyalmantles/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity" title="Shop Instagram">
                <ShoppingBag size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ink/5 pt-10 flex flex-col md:row justify-between items-center text-[10px] uppercase tracking-widest text-ink/40">
          <p>© 2026 Sit With Me. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-ink transition-colors">POWERED BY TYPSI INC®</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
