'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SocialLinks from './SocialLinks';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (open && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <header className="p-4 md:p-6 flex justify-between items-center bg-transparent backdrop-blur-xl fixed w-full z-50 site-header">
      <div className="flex items-center space-x-3">
        <img
          src="/profile.png"
          alt="Bander Radein"
          className="w-9 h-9 rounded-full border-2 border-cyan-400/70 shadow-sm"
        />
        <h1 className="text-2xl font-semibold tracking-wide text-cyan-400">Bander Radein</h1>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6 items-center">
        <Link className="nav-link" href="/">Home</Link>
        <Link className="nav-link" href="/about">About</Link>
        <Link className="nav-link" href="/portfolio">Portfolio</Link>
        <Link className="nav-link" href="/blog">Blog</Link>
        <Link className="nav-link" href="/contact">Contact</Link>
      </nav>

      {/* Social links (desktop) */}
      <div className="hidden md:flex items-center ml-4">
        <SocialLinks />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden relative" ref={menuRef}>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="p-2 rounded-md bg-gray-800/50 hover:bg-gray-800/70"
        >
          <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {/* Mobile dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 border border-gray-800 rounded-md shadow-lg py-2 z-50">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setOpen(false)}>About</Link>
            <Link href="/portfolio" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setOpen(false)}>Portfolio</Link>
            <Link href="/blog" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
}
