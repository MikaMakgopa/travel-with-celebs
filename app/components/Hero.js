import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-[#0B132B] text-white overflow-hidden">
      {/* Background Image with Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      
      {/* Dark Subtle Gradient Layer for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          
          {/* Editorial Sub-badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full gold-bg animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Exclusive Travel & Celebrity News
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Where Celebrity Life <br />
            <span className="italic font-normal gold-accent">Meets the World.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed font-light max-w-2xl">
            Step inside the high-flying escapes of global icons. From private island sanctuaries in the Maldives to high-fashion escapes in Paris and vibrant culture in Cape Town, we bring you inside the jet-set lifestyle.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a 
              href="#recent-stories" 
              className="gold-bg text-[#0B132B] hover:bg-yellow-400 font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded shadow-lg transition duration-300 text-center"
            >
              Explore Stories
            </a>
            
            <Link 
              href="/destinations" 
              className="bg-transparent hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded border border-white/30 backdrop-blur-sm transition duration-300 text-center"
            >
              Browse Destinations
            </Link>
          </div>

          {/* Quick Stats / Trending Hotspots Footer Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-gray-400">
            <div>
              <span className="block text-white font-bold font-serif text-lg">100+</span>
              <span>Celebrity Travel Guides</span>
            </div>
            <div>
              <span className="block text-white font-bold font-serif text-lg">Top 20</span>
              <span>Global Luxury Destinations</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-white font-bold font-serif text-lg">Daily</span>
              <span>Editorial Updates</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}