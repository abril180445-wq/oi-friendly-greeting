import { ArrowRight, Code2, Users, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const stats = [
    { icon: Code2, value: "80+", label: "Sistemas Entregues" },
    { icon: Users, value: "200+", label: "Clientes Ativos" },
    { icon: Rocket, value: "8+", label: "Anos de Experiência" },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden animated-gradient noise"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse animation-delay-500" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
              <Sparkles size={16} className="text-primary" />
              <span className="text-primary font-medium text-sm tracking-wide">
                Desenvolvimento de Sistemas
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-[1.1] animate-fade-up animation-delay-100">
              Transformamos suas{" "}
              <span className="text-gradient">ideias</span> em{" "}
              <span className="text-gradient">soluções digitais</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up animation-delay-200">
              Somos especialistas em criar sistemas personalizados, aplicações
              web e mobile que impulsionam o seu negócio para o próximo nível.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up animation-delay-300">
              <Button
                size="lg"
                className="btn-premium text-primary-foreground font-semibold text-lg px-8 h-14 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Conheça Nossos Projetos
                  <ArrowRight size={20} />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold text-lg px-8 h-14 rounded-xl transition-all duration-300"
              >
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden lg:flex flex-col gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-dark rounded-2xl p-6 flex items-center gap-5 card-hover animate-fade-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border border-primary/20">
                  <stat.icon className="text-primary" size={28} />
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
