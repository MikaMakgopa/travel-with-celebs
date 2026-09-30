'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0B132B] text-white sticky top-0 z-50 shadow-md">
      {/* Top Editorial Ticker Bar */}
      <div className="bg-[#1C2541] text-xs py-2 px-4 border-b border-gray-800 text-center tracking-wider text-gray-300">
        <span className="text-[#D4AF37] font-semibold uppercase mr-2">Trending Spotlight:</span>
        Zendaya in Venice • Burna Boy in St. Tropez • Rihanna’s Barbados Luxury Retreat
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl tracking-widest text-white font-bold uppercase">
              Travel With Celebs
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-sans">
              Luxury Travel & Celebrity News
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-sm tracking-wide">
            <Link href="/" className="hover:text-[#D4AF37] transition duration-200">
              Home
            </Link>
            <Link href="/news" className="hover:text-[#D4AF37] transition duration-200">
              Celebrity News
            </Link>
            <Link href="/destinations" className="hover:text-[#D4AF37] transition duration-200">
              Destinations
            </Link>
            <Link href="/lifestyle" className="hover:text-[#D4AF37] transition duration-200">
              Hotels & Resorts
            </Link>
            <Link href="/about" className="hover:text-[#D4AF37] transition duration-200">
              About
            </Link>
          </div>

          {/* Action Button / Admin Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/admin" 
              className="bg-[#D4AF37] text-[#0B132B] hover:bg-yellow-500 font-semibold text-xs px-4 py-2.5 rounded tracking-wider uppercase transition duration-200"
            >
              Admin Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-gray-800 space-y-3 font-medium text-sm">
            <Link href="/" className="block text-gray-200 hover:text-[#D4AF37] py-1">Home</Link>
            <Link href="/news" className="block text-gray-200 hover:text-[#D4AF37] py-1">Celebrity News</Link>
            <Link href="/destinations" className="block text-gray-200 hover:text-[#D4AF37] py-1">Destinations</Link>
            <Link href="/lifestyle" className="block text-gray-200 hover:text-[#D4AF37] py-1">Hotels & Resorts</Link>
            <Link href="/about" className="block text-gray-200 hover:text-[#D4AF37] py-1">About</Link>
            <Link href="/admin" className="inline-block mt-2 bg-[#D4AF37] text-[#0B132B] font-semibold text-xs px-4 py-2 rounded uppercase">
              Admin Portal
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}