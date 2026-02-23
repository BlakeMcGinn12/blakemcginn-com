import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import WorkflowShowcase from "./components/WorkflowShowcase";
import SkillsGrid from "./components/SkillsGrid";
import Pricing from "./components/Pricing";
import Security from "./components/Security";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <WorkflowShowcase />
      <SkillsGrid />
      <Pricing />
      <Security />
      <About />
      <Footer />
    </main>
  );
}
