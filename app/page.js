'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FeaturedCard from './components/FeaturedCard';
import ArticleCard from './components/ArticleCard';
import { getStoredPosts } from './data/postsStore';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  // Separate featured lead story from regular grid stories
  const featuredPost = posts.find((post) => post.isFeatured) || posts[0];
  const gridPosts = posts.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="bg-[#F8F5F0] min-h-screen">
      
      {/* Hero Header */}
      <Hero />

      {/* Main Editorial Feed */}
      <section id="recent-stories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section Heading */}
        <div className="border-b border-gray-300 pb-4 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Editorial Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mt-1">
              Trending Celebrity Travel
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Updated live from our global media desk
          </p>
        </div>

        {/* Lead Story (Featured Card) */}
        {featuredPost && <FeaturedCard post={featuredPost} />}

        {/* Category Header for Secondary Grid */}
        <div className="mt-16 mb-8">
          <h3 className="font-serif text-2xl font-bold text-[#0B132B] flex items-center">
            <span>More Stories & Guides</span>
            <span className="ml-4 flex-grow h-px bg-gray-300"></span>
          </h3>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>

      </section>

    </div>
  );
}