import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Timeline } from './components/sections/Timeline';
import { Contact } from './components/sections/Contact';
import { Marquee } from './components/motion/Marquee';
import { Butterflies } from './components/motion/Butterflies';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee
          text="Design & Developpement"
          className="marquee--section"
        />
        <About />
        <Skills />
        <Marquee
          text="Projets & Realisations"
          className="marquee--section marquee--reverse"
        />
        <Projects />
        <Services />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Butterflies />
    </>
  );
}

export default App;
