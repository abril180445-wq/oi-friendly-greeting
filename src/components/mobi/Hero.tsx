import { ArrowRight, Code2, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-24"
      style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--secondary) / 0.95), hsl(var(--secondary) / 0.7)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">
              Desenvolvimento de Sistemas
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6 leading-tight">
              Transformamos suas{" "}
              <span className="text-primary">ideias</span> em{" "}
              <span className="text-primary">soluções digitais</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Somos especialistas em criar sistemas personalizados, aplicações web e mobile que impulsionam o seu negócio para o próximo nível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8">
                Conheça Nossos Projetos
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8"
              >
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden lg:grid grid-cols-1 gap-6">
            <div className="bg-secondary/80 backdrop-blur-sm border border-border/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                <Code2 className="text-primary" size={32} />
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary-foreground">80+</p>
                <p className="text-muted-foreground">Sistemas Entregues</p>
              </div>
            </div>
            <div className="bg-secondary/80 backdrop-blur-sm border border-border/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="text-primary" size={32} />
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary-foreground">200+</p>
                <p className="text-muted-foreground">Clientes Ativos</p>
              </div>
            </div>
            <div className="bg-secondary/80 backdrop-blur-sm border border-border/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                <Rocket className="text-primary" size={32} />
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary-foreground">8+</p>
                <p className="text-muted-foreground">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
