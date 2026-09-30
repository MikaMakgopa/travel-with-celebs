import Link from 'next/link';

export default function FeaturedCard({ post }) {
  if (!post) return null;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 mb-12 group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Large Feature Image */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[350px] overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
          />
          <span className="absolute top-4 left-4 bg-[#0B132B] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded shadow-lg">
            ⭐ Top Lead Story
          </span>
        </div>

        {/* Story Details Panel */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-bold uppercase tracking-widest mb-3">
              <span>{post.category}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">📍 {post.destination}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B] group-hover:text-[#D4AF37] transition duration-200 leading-snug mb-4">
              <Link href={`/article/${post.id}`}>
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="inline-block bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded text-xs font-medium mb-6">
              Featured Spotlight: <strong className="font-semibold">{post.celebrity}</strong>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div>
              <span className="font-semibold text-gray-800 block">{post.author}</span>
              <span className="text-gray-400 text-[11px]">{post.date}</span>
            </div>
            <Link 
              href={`/article/${post.id}`} 
              className="gold-bg text-[#0B132B] font-bold text-xs px-4 py-2 rounded uppercase tracking-wider hover:bg-yellow-400 transition"
            >
              Read Full Story
            </Link>
          </div>

        </div>

      </div>
    </article>
  );
}