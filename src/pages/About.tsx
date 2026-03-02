export default function About() {
  return (
    <div className="pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif mb-8">Our Story</h1>
          <p className="text-xl font-serif italic text-ink/60">A journey of intentionality and style.</p>
        </header>

        <div className="aspect-video overflow-hidden rounded-sm mb-20">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2000" 
            alt="Founder" 
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
              <p className="text-sm">graceokeafor7@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
