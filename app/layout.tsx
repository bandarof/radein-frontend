// app/layout.tsx
import './globals.css';
import Navbar from './components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bander Radein',
  description: 'Personal Portfolio & Career Profile',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-gray-100`}>
        {/* Background elements */}
        <div
          className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url("https://25bcdd03f32a4e2a8d98c81f6ad235f0-d829844a97b7411f96185a08a.fly.dev/bg.png")' }}
          aria-hidden="true"
        />

        {/* Navbar component (handles mobile menu) */}
        <Navbar />

        {/* Main content area where Builder.io pages will render */}
        <main className="pt-24">{children}</main>

        {/* ADD THE FOOTER BACK - I removed this earlier */}
        <footer className="p-6 text-center text-gray-500 border-t border-gray-700">
          © {new Date().getFullYear()} Bander Radein
        </footer>
      </body>
    </html>
  );
}
