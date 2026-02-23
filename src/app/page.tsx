import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ToolsGrid from "./components/ToolsGrid";
import Quiz from "./components/Quiz";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <ToolsGrid />
      <Quiz />
      <About />
      <Footer />
    </main>
  );
}
