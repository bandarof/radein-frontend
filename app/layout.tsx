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
          style={{ backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2F16fe0aa9fbed403f8fb856fe14742033%2Fbdd633678bab4619a59587e2a6bf411a?format=webp&width=800")' }}
          aria-hidden="true"
        />

        {/* Navbar component (handles mobile menu) */}
        <Navbar />

        {/* Main content area */}
        <main className="pt-24">{children}</main>

        {/* ADD THE FOOTER BACK - I removed this earlier */}
        <footer className="p-6 text-center text-gray-500 border-t border-gray-700">
          © {new Date().getFullYear()} Bander Radein
        </footer>
      </body>
    </html>
  );
}
