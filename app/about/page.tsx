import LinkedInEmbed from '../components/LinkedInEmbed';
import LinkedInProfile from '../components/LinkedInProfile';
import Hero from '../components/Hero';
import AboutBackground from '../components/AboutBackground';
import AboutParticles from '../components/AboutParticles';
import AboutClient from '../components/AboutClient';

export const metadata = {
  title: 'About — Bander Radein',
  description: 'About Bander Radein — web applications, AI and blockchain integrations',
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <AboutBackground />
      <AboutParticles />
      <AboutClient />
    </main>
  );
}
