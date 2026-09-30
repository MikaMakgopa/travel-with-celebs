import Link from 'next/link';

export default function ArticleCard({ post }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col border border-gray-100 group">
      
      {/* Image Container with Hover Zoom Effect */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 gold-bg text-[#0B132B] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
          {post.category}
        </span>
      </div>

      {/* Article Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          
          {/* Destination & Celebrity Info Tag */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2 font-medium">
            <span className="gold-accent font-semibold">📍 {post.destination}</span>
            <span>•</span>
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px]">
              {post.celebrity}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-[#0B132B] group-hover:text-[#D4AF37] transition duration-200 leading-snug mb-3">
            <Link href={`/article/${post.id}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        </div>

        {/* Card Footer Meta */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
          <span>By {post.author}</span>
          <span>{post.readTime}</span>
        </div>

      </div>
    </article>
  );
}