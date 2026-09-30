'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sampleDestinations } from '../data/destinations';
import { samplePosts } from '../data/posts';
import ArticleCard from '../components/ArticleCard';

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState('all');

  // Filter posts based on selected destination dropdown/buttons
  const filteredPosts = selectedDestination === 'all' 
    ? samplePosts 
    : samplePosts.filter(post => 
        post.destination.toLowerCase().includes(selectedDestination.toLowerCase())
      );

  return (
    <div className="bg-[#F8F5F0] min-h-screen pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B132B] text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b-4 border-[#D4AF37]">
        <div className="max-w-4xl mx-auto">
          <span className="gold-accent text-xs font-bold uppercase tracking-[0.3em]">
            Global Jet-Set Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-2 mb-4">
            Celebrity Destinations
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore the world's most exclusive cities, island retreats, and cultural capitals frequented by global icons.
          </p>
        </div>
      </section>

      {/* 2. DESTINATION VISUAL CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest gold-accent">Featured Hotspots</span>
          <h2 className="font-serif text-3xl font-bold text-[#0B132B] mt-1">Explore By Region</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleDestinations.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => setSelectedDestination(dest.name)}
              className="group relative h-80 rounded-xl overflow-hidden shadow-md cursor-pointer border border-gray-200"
            >
              {/* Background Image */}
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/40 to-transparent"></div>

              {/* Top Tagline Badge */}
              <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                {dest.region} • {dest.country}
              </span>

              {/* Destination Content */}
              <div className="absolute bottom-0 p-6 text-white w-full">
                <span className="gold-accent text-xs font-semibold block uppercase tracking-wider mb-1">
                  {dest.tagline}
                </span>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {dest.name}
                </h3>
                <p className="text-gray-300 text-xs line-clamp-2 mb-3 leading-relaxed">
                  {dest.description}
                </p>

                {/* Popularity Badge */}
                <div className="pt-3 border-t border-white/20 flex justify-between items-center text-[11px] text-gray-300">
                  <span>Spotted: <strong className="text-white">{dest.popularWith.join(', ')}</strong></span>
                  <span className="gold-accent font-bold group-hover:translate-x-1 transition">Filter →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FILTERED STORIES FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category & Destination Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0B132B]">
              {selectedDestination === 'all' 
                ? "All Destination Stories" 
                : `Stories Spotted in ${selectedDestination}`}
            </h3>
            <p className="text-xs text-gray-500">
              Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <button
              onClick={() => setSelectedDestination('all')}
              className={`px-4 py-2 rounded-full transition ${
                selectedDestination === 'all' 
                  ? 'gold-bg text-[#0B132B] font-bold' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Show All
            </button>
            {sampleDestinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedDestination(dest.name)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedDestination === dest.name 
                    ? 'gold-bg text-[#0B132B] font-bold' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Display */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-200">
            <p className="text-gray-500 italic">
              No celebrity stories currently filed under "{selectedDestination}". Publish new articles from the Admin Portal in Stage 9!
            </p>
            <button 
              onClick={() => setSelectedDestination('all')}
              className="mt-4 gold-bg text-[#0B132B] text-xs font-bold px-6 py-2 rounded uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

    </div>
  );
}