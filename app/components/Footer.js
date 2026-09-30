import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] text-gray-300 pt-16 pb-12 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl text-white font-bold tracking-widest uppercase">
              Travel With Celebs
            </h3>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed">
              Where celebrity life meets the world. Delivering elite travel guides, luxury resort reviews, and exclusive celebrity travel news.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-[#D4AF37]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/news" className="hover:text-white transition">Celebrity Travel Stories</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition">Global Destinations</Link></li>
              <li><Link href="/lifestyle" className="hover:text-white transition">Hotels & Resorts</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & About */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-[#D4AF37]">
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact & Editorial Desk</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-[#D4AF37]">
              Follow The Journey
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Join our global community for daily luxury travel inspiration.
            </p>
            <div className="flex space-x-3 text-xs">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-[#1C2541] hover:bg-[#D4AF37] hover:text-[#0B132B] p-2.5 rounded transition">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="bg-[#1C2541] hover:bg-[#D4AF37] hover:text-[#0B132B] p-2.5 rounded transition">
                TikTok
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-[#1C2541] hover:bg-[#D4AF37] hover:text-[#0B132B] p-2.5 rounded transition">
                X / Twitter
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Travel With Celebs. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for modern luxury editorial media.</p>
        </div>

      </div>
    </footer>
  );
}