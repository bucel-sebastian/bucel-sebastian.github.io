import type { Metadata } from "next";
import "./home.css";
import { homeFontClass } from "./fonts";

import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Companies } from "./components/Companies";
import { GithubSection } from "./components/GithubSection";
import { Skills } from "./components/Skills";
import { NpmPackages } from "./components/NpmPackages";
import { Games } from "./components/Games";
import { ProofOfConcepts } from "./components/ProofOfConcepts";
import { LegacyProjects } from "./components/LegacyProjects";
import { Certifications } from "./components/Certifications";
import { SkillBadges } from "./components/SkillBadges";
import { Volunteering } from "./components/Volunteering";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Ion-Sebastian Bucel — Portfolio",
  description: "Placeholder description for this portfolio page.",
};

/**
 * `/home` — portfolio route.
 * Everything is scoped under the `.home` wrapper (colours, type, tokens) so the
 * existing `/` route renders exactly as before.
 */
export default function HomePage() {
  return (
    <div className={`home ${homeFontClass}`}>
      <a className="hs-skip-link" href="#home-main">
        Skip to content
      </a>

      {/* Safety net for browsers without `@media (scripting: none)` support —
          keep in sync with the no-script block at the bottom of home.css. */}
      <noscript>
        <style>{`
          .hs-nav, .hs-reveal, .hs-hero__eyebrow, .hs-line, .hs-hero__sub,
          .hs-hero__actions, .hs-hero__cue {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

      {/* <Nav /> */}

      <div id="home-main" tabIndex={-1} className="hs-main">
        <Hero />
        <Highlights />
        <About />
        <Projects />
        <Services />
        <Companies />
        <GithubSection />
        <Skills />
        <NpmPackages />
        <Games />
        <ProofOfConcepts />
        <LegacyProjects />
        <Certifications />
        <SkillBadges />
        <Volunteering />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
