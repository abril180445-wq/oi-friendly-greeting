import Header from "@/components/mobi/Header";
import Hero from "@/components/mobi/Hero";
import About from "@/components/mobi/About";
import Services from "@/components/mobi/Services";
import Technologies from "@/components/mobi/Technologies";
import Projects from "@/components/mobi/Projects";
import Testimonials from "@/components/mobi/Testimonials";
import Contact from "@/components/mobi/Contact";
import Footer from "@/components/mobi/Footer";
import WhatsAppButton from "@/components/mobi/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
