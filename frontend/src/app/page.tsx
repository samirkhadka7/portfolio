import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { HelpGrid } from '@/components/HelpGrid';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { Skills } from '@/components/Skills';
import { Stats } from '@/components/Stats';
import { fetchSiteContent } from '@/lib/content';

export default async function Home() {
  const content = await fetchSiteContent();
  const { site } = content;

  return (
    <>
      <Navbar brand={site.brand} navLinks={site.navLinks} />
      <main className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <Hero site={site} />
        <About aboutStats={site.aboutStats} />
        <Skills categories={content.skills} />
        <Projects projects={content.projects} />
        <Services services={content.services} />
        <HelpGrid items={content.help} />
        <Stats
          githubStats={site.githubStats}
          topLanguages={site.topLanguages}
          timeline={content.timeline}
        />
        <Contact site={site} />
      </main>
      <Footer brand={site.brand} />
    </>
  );
}
