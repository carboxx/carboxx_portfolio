import { Header } from '@/components/ui/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PersonalSection } from '@/components/sections/PersonalSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { SkillsGraph3DPure } from '@/components/sections/SkillsGraph3DPure';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PersonalSection />
        <SkillsSection />
        <SkillsGraph3DPure />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
