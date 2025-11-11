import LinkedInEmbed from '../components/LinkedInEmbed';
import LinkedInProfile from '../components/LinkedInProfile';
import Hero from '../components/Hero';

export const metadata = {
  title: 'About — Bander Radein',
  description: 'About Bander Radein — web applications, AI and blockchain integrations',
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <section className="container mx-auto px-6 py-12 -mt-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">About</h2>
          <p className="mt-4 text-gray-300 text-lg">
            I build high-tech, modern web applications and integrate cutting-edge AI and blockchain solutions. I focus on
            delivering robust, maintainable systems with a great developer and user experience.
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
