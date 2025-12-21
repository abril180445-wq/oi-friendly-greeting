import Header from "@/components/mobi/Header";
import Hero from "@/components/mobi/Hero";
import Clients from "@/components/mobi/Clients";
import About from "@/components/mobi/About";
import Services from "@/components/mobi/Services";
import Process from "@/components/mobi/Process";
import Technologies from "@/components/mobi/Technologies";
import Projects from "@/components/mobi/Projects";
import DeliveredSites from "@/components/mobi/DeliveredSites";
import Team from "@/components/mobi/Team";
import Testimonials from "@/components/mobi/Testimonials";
import FAQ from "@/components/mobi/FAQ";
import Contact from "@/components/mobi/Contact";
import Footer from "@/components/mobi/Footer";
import WhatsAppButton from "@/components/mobi/WhatsAppButton";
import ChatBot from "@/components/mobi/ChatBot";
import ScrollProgress from "@/components/mobi/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-15"
        >
          <source src="/videos/blog-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Clients />
        <About />
        <Services />
        <Process />
        <Technologies />
        <Projects />
        <DeliveredSites />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
};

export default Index;
