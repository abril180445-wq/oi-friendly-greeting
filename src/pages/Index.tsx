import Header from "@/components/mobi/Header";
import Hero from "@/components/mobi/Hero";
import Clients from "@/components/mobi/Clients";
import About from "@/components/mobi/About";
import Services from "@/components/mobi/Services";
import Process from "@/components/mobi/Process";
import Technologies from "@/components/mobi/Technologies";
import Projects from "@/components/mobi/Projects";
import Team from "@/components/mobi/Team";
import Testimonials from "@/components/mobi/Testimonials";
import FAQ from "@/components/mobi/FAQ";
import Contact from "@/components/mobi/Contact";
import Footer from "@/components/mobi/Footer";
import WhatsAppButton from "@/components/mobi/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Clients />
        <About />
        <Services />
        <Process />
        <Technologies />
        <Projects />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
