import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: {
    default: 'Travel With Celebs | Where Celebrity Life Meets the World',
    template: '%s | Travel With Celebs',
  },
  description: 'Exclusive celebrity travel stories, luxury destination guides, hotel reviews, and editorial news from around the globe.',
  keywords: ['Celebrity Travel', 'Luxury Travel', 'Celebrity News', 'Cape Town', 'Dubai', 'St Tropez', 'Resorts'],
  authors: [{ name: 'Travel With Celebs Editorial Team' }],
  metadataBase: new URL('http://localhost:3000'),
  
  // OpenGraph metadata for WhatsApp, Facebook, iMessage previews
  openGraph: {
    title: 'Travel With Celebs | Luxury Travel & Celebrity News',
    description: 'Step inside the high-flying escapes of global icons. Elite travel guides and celebrity stories.',
    url: 'http://localhost:3000',
    siteName: 'Travel With Celebs',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Travel With Celebs Cover Visual',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter/X Card formatting
  twitter: {
    card: 'summary_large_image',
    title: 'Travel With Celebs',
    description: 'Where celebrity life meets the world.',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop'],
  },

  // Search Engine Bot instructions
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}