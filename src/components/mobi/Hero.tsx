import { ArrowRight, Code2, Users, Rocket, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      {/* Animated Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px]"
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up backdrop-blur-sm">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">
                Desenvolvimento de Sistemas
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-[1.1] animate-fade-up animation-delay-100">
              Transformamos suas{" "}
              <span className="text-gradient relative">
                ideias
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M2 6C50 2 150 2 198 6"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-draw-line"
                  />
                </svg>
              </span>{" "}
              em{" "}
              <span className="text-gradient">soluções digitais</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up animation-delay-200">
              Somos especialistas em criar sistemas personalizados, aplicações
              web e mobile que impulsionam o seu negócio para o próximo nível.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up animation-delay-300">
              <Button
                size="lg"
                className="btn-premium text-primary-foreground font-semibold text-lg px-8 h-14 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  Conheça Nossos Projetos
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold text-lg px-8 h-14 rounded-xl transition-all duration-300 backdrop-blur-sm"
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
                className="glass-dark rounded-2xl p-6 flex items-center gap-5 card-hover animate-fade-up group"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500">
                  <stat.icon className="text-primary" size={28} />
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
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

        {/* Mobile stats */}
        <div className="grid grid-cols-3 gap-4 mt-16 lg:hidden">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-dark rounded-xl p-4 text-center animate-fade-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <p className="font-heading text-2xl font-bold text-gradient">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-7 h-12 border-2 border-primary/50 rounded-full flex justify-center pt-2 hover:border-primary transition-colors duration-300">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
