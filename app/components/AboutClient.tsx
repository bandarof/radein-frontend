'use client';

import { useState } from 'react';
import LinkedInProfile from './LinkedInProfile';
import LinkedInEmbed from './LinkedInEmbed';

export default function AboutClient() {
  const defaultText = `Results-driven business leader with a computer engineering technology degree and over 20 years of experience in cybersecurity, software development, and IT strategy with a hint of travel & tourism. Proven success in client onboarding, automation, fintech advisory, and operational transformation, now forging into blockchain and AI. Fluent in Arabic and English, with a strong track record across the GCC and some parts of Europe. Passionate about elevating customer experiences, empowering support teams, and scaling high-performance service operations.`;

  return (
    <section className="container mx-auto px-6 py-12 -mt-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold pop-in delay-100">About</h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2 pop-in delay-300">
          <h3 className="text-xl font-semibold mb-4 pop-in delay-350">LinkedIn Profile</h3>
          <div className="pop-in delay-400">
            <LinkedInProfile profileUrl="https://www.linkedin.com/in/bandarof/" initialSummary={defaultText} />
          </div>

          <div className="mt-8 pop-in delay-450">
            <h3 className="text-xl font-semibold mb-4">LinkedIn Feed</h3>
            <LinkedInEmbed profileUrl="https://www.linkedin.com/in/bandarof/" />
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="sticky top-28 space-y-4">
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-md pop-in delay-500">
              <h4 className="font-semibold">Contact</h4>
              <p className="text-gray-400 mt-2">Email: hello@radein.com</p>
              <p className="text-gray-400">Location: Remote</p>
            </div>

            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-md pop-in delay-600">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="mt-2 space-y-2 text-gray-400">
                <li><a href="/portfolio" className="hover:text-white">Portfolio</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
