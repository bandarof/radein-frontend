import LinkedInEmbed from '../components/LinkedInEmbed';
import LinkedInProfile from '../components/LinkedInProfile';
import Hero from '../components/Hero';
import AboutBackground from '../components/AboutBackground';

export const metadata = {
  title: 'About — Bander Radein',
  description: 'About Bander Radein — web applications, AI and blockchain integrations',
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <AboutBackground />
      <section className="container mx-auto px-6 py-12 -mt-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">About</h2>
          <p className="mt-4 text-gray-300 text-lg">
            Results-driven business leader with a computer engineering technology degree and over 20 years of experience in cybersecurity, software development, and IT strategy with a hint of travel &amp; tourism. Proven success in client onboarding, automation, fintech advisory, and operational transformation, now forging into blockchain and AI. Fluent in Arabic and English, with a strong track record across the GCC and some parts of Europe. Passionate about elevating customer experiences, empowering support teams, and scaling high-performance service operations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">LinkedIn Profile</h3>
            <LinkedInProfile profileUrl="https://www.linkedin.com/in/bandarof/" />

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">LinkedIn Feed</h3>
              <LinkedInEmbed profileUrl="https://www.linkedin.com/in/bandarof/" />
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-md">
                <h4 className="font-semibold">Contact</h4>
                <p className="text-gray-400 mt-2">Email: hello@radein.com</p>
                <p className="text-gray-400">Location: Remote</p>
              </div>

              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-md">
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
    </main>
  );
}
