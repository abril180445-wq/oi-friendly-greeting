import Header from "@/components/mobi/Header";
import Hero from "@/components/mobi/Hero";
import About from "@/components/mobi/About";
import Projects from "@/components/mobi/Projects";
import Contact from "@/components/mobi/Contact";
import Footer from "@/components/mobi/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
