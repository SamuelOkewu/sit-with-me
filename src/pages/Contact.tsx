import { MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-40 pb-32">
      <div className="max-w-xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-serif mb-6">Get in Touch</h1>
          <p className="text-ink/60">We'd love to hear from you. Whether you have a question about our shop or just want to say hello.</p>
        </header>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-ink/40">Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-ink transition-colors"
              placeholder="Your Name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-ink/40">Email</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-ink transition-colors"
              placeholder="graceokeafor7@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-ink/40">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-ink transition-colors resize-none"
              placeholder="How can we help?"
            />
          </div>

          <button className="w-full bg-ink text-white py-5 text-xs uppercase tracking-[0.2em] hover:bg-ink/80 transition-colors">
            Send Message
          </button>
        </form>

        <div className="mt-20 pt-10 border-t border-ink/5 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-6">Or reach out directly via</p>
          <a 
            href="https://wa.me/2348062756974" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-emerald-500 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            <MessageCircle size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
