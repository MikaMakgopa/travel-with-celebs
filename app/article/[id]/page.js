'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { getStoredPosts } from '../../data/postsStore';
import ArticleCard from '../../components/ArticleCard';

export default function ArticlePage({ params }) {
  // Unwrap Next.js URL parameters
  const resolvedParams = use(params);
  const postId = resolvedParams.id;

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read stored articles from browser memory & update dynamic tab title
  useEffect(() => {
    const posts = getStoredPosts();
    setAllPosts(posts);
    const foundPost = posts.find((item) => item.id === postId);
    setPost(foundPost || null);

    // DYNAMIC TITLE UPDATE: Updates browser tab text to headline
    if (foundPost) {
      document.title = `${foundPost.title} | Travel With Celebs`;
    } else {
      document.title = 'Story Not Found | Travel With Celebs';
    }

    setLoading(false);
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <p className="text-gray-500 font-serif text-lg">Loading luxury story...</p>
      </div>
    );
  }

  // Fallback view if post is truly not found
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#0B132B]">Story Not Found</h1>
        <p className="mt-4 text-gray-600">The article you are looking for does not exist or has been moved.</p>
        <Link href="/" className="inline-block mt-6 gold-bg text-[#0B132B] font-bold px-6 py-3 rounded uppercase text-xs">
          Return to Home
        </Link>
      </div>
    );
  }

  // Filter related stories (excluding current story)
  const relatedPosts = allPosts.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <article className="bg-[#F8F5F0] min-h-screen pb-20">
      
      {/* 1. ARTICLE HEADER SECTION */}
      <header className="bg-[#0B132B] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D4AF37]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Category & Destination Badges */}
          <div className="flex items-center justify-center space-x-3 mb-6 flex-wrap gap-y-2">
            <span className="gold-bg text-[#0B132B] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded">
              {post.category || 'Celebrity Travel'}
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="gold-accent text-xs font-semibold tracking-wider uppercase">
              📍 {post.destination || 'Global Destination'}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            {post.title}
          </h1>

          {/* Celebrity Spotlight Banner */}
          <div className="mt-6 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2">
            <p className="text-xs text-gray-200">
              Celebrity Focus: <strong className="gold-accent text-sm font-semibold ml-1">{post.celebrity}</strong>
            </p>
          </div>

          {/* Author & Reading Meta */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center space-x-6 text-xs text-gray-300">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Written By</span>
              <span className="font-semibold text-white">{post.author || 'Editorial Team'}</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Published</span>
              <span>{post.date || 'Recent'}</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Reading Time</span>
              <span>{post.readTime || '4 min read'}</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. FEATURED COVER IMAGE */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="relative h-[300px] sm:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <img
            src={post.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. MAIN ARTICLE BODY CONTAINER */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
        
        {/* Social Sharing Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between mb-10 text-xs">
          <span className="font-semibold text-[#0B132B] uppercase tracking-wider">Share Story:</span>
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-[#0B132B] hover:text-white px-3 py-1.5 rounded transition font-medium">
              X / Twitter
            </button>
            <button className="bg-gray-100 hover:bg-[#0B132B] hover:text-white px-3 py-1.5 rounded transition font-medium">
              Facebook
            </button>
            <button className="bg-gray-100 hover:bg-[#0B132B] hover:text-white px-3 py-1.5 rounded transition font-medium">
              WhatsApp
            </button>
          </div>
        </div>

        {/* Article Excerpt Callout */}
        {post.excerpt && (
          <p className="font-serif text-xl sm:text-2xl text-gray-800 leading-relaxed italic border-l-4 border-[#D4AF37] pl-6 my-8">
            "{post.excerpt}"
          </p>
        )}

        {/* Article Body Content */}
        <div className="space-y-6 text-gray-700 text-base leading-relaxed font-normal">
          {post.content ? (
            <p className="whitespace-pre-line">{post.content}</p>
          ) : (
            <>
              <p>
                When it comes to high-end escapes, few locations capture the essence of luxury like <strong className="text-[#0B132B]">{post.destination}</strong>. Known for offering privacy away from the flashing lights of paparazzi, this hotspot has quickly become the ultimate sanctuary for global icons like <strong className="text-[#0B132B]">{post.celebrity}</strong>.
              </p>

              <h2 className="font-serif text-2xl font-bold text-[#0B132B] pt-4">
                An Unmatched Private Retreat
              </h2>

              <p>
                From private charter jets touching down at sunrise to secluded villa sanctuaries overlooking breathtaking coastlines, every detail of this journey is tailored for elite comfort. Bespoke concierge teams were on standby around the clock to curate custom culinary experiences, private yacht charters, and helicopter tours.
              </p>
            </>
          )}
        </div>

        {/* Tags Footer */}
        <div className="mt-10 pt-6 border-t border-gray-300 flex items-center space-x-2 text-xs flex-wrap gap-y-2">
          <span className="font-bold text-[#0B132B] uppercase tracking-wider">Tags:</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{post.celebrity}</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{post.destination}</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{post.category}</span>
        </div>

      </div>

      {/* 4. RELATED STORIES SECTION */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-gray-300">
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Keep Reading</span>
            <h3 className="font-serif text-3xl font-bold text-[#0B132B]">More Celebrity Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <ArticleCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}

    </article>
  );
}