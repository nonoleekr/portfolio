import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Certifications } from "@/components/sections/certifications";
import { GitHubStats } from "@/components/sections/github-stats";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <GitHubStats />
      <Contact />
    </>
  );
}
