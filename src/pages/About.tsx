import { useSEO } from '../hooks/useSEO';

export default function About() {
  useSEO({
    title: 'Our Story – Sit With Me | Intentional Living & Style',
    description: 'Learn the story behind Sit With Me – a digital sanctuary born from a desire to slow down, celebrate style, and live with intention. Discover our values and philosophy.',
    canonical: '/about',
    keywords: 'about sit with me, intentional living, slow fashion, quiet luxury lifestyle, our story',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Our Story – Sit With Me',
      url: 'https://sitwithme.com/about',
      description: 'The story behind Sit With Me – a digital sanctuary for intentional living.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Sit With Me',
        foundingDate: '2023',
        email: 'graceokeafor7@gmail.com',
        description: 'A lifestyle journal and curated shop for intentional living, style, and wellness.'
      }
    }
  });

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif mb-8">Our Story</h1>
          <p className="text-xl font-serif italic text-ink/60">A journey of intentionality and style.</p>
        </header>

        <div className="aspect-video overflow-hidden rounded-sm mb-20">
          <img 
            src="/2.jpg?auto=format&fit=crop&q=70&w=2000" 
            alt="Founder of Sit With Me – lifestyle journal and curated shop"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-8 text-lg leading-relaxed text-ink/80">
            <p>
              Welcome to Sit With Me. This space was created as a digital sanctuary—a place to celebrate the beauty of a life lived with intention. 
              In a world that often feels like it's moving too fast, we believe in the power of slowing down, noticing the light, and curating a world that reflects our truest selves.
            </p>
            <p>
              What started as a personal journal has grown into a community of like-minded individuals who appreciate the intersection of style, travel, and wellness. 
              Whether it's the perfect linen shirt for a summer afternoon or a quiet corner in a Mediterranean village, we are here to share the stories that inspire us.
            </p>
            <p>
              Our shop is an extension of this philosophy. Every item is hand-selected or designed to bring a touch of effortless elegance to your daily life. 
              We hope you find something here that resonates with you.
            </p>
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-ink/40">Our Values</h3>
              <ul className="space-y-4 text-sm uppercase tracking-widest">
                <li>Intentionality</li>
                <li>Authenticity</li>
                <li>Effortless Style</li>
                <li>Quiet Luxury</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-ink/40">Contact</h3>
              <p className="text-sm">
                <a href="mailto:graceokeafor7@gmail.com" className="hover:opacity-60 transition-opacity">
                  graceokeafor7@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
