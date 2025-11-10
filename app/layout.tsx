// app/layout.tsx
import './globals.css';
import Navbar from './components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bander Radein',
  description: 'I create scalable web apps & blockchain-ready platforms that drive business growth',
  openGraph: {
    title: 'Bander Radein',
    description: 'I create scalable web apps & blockchain-ready platforms that drive business growth',
    images: [
      {
        url: '/profile.png',
        width: 400,
        height: 400,
        alt: 'Bander Radein',
      },
    ],
  },
  twitter: {
    card: 'summary', // smaller image preview
    title: 'Bander Radein',
    description: 'I create scalable web apps & blockchain-ready platforms that drive business growth',
    images: ['/profile.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-gray-100 bg-grid bg-radial-glow aurora`}>
        {/* Background elements (grid + aurora + radial glows via CSS) */}

        {/* Navbar component (handles mobile menu) */}
        <Navbar />

        {/* Main content area */}
        <main className="pt-24">{children}</main>

        <footer className="p-6 text-center text-gray-500 border-t border-gray-700">
          © {new Date().getFullYear()} Bander Radein
        </footer>
      </body>
    </html>
  );
}
