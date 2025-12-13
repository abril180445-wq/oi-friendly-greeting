import { CheckCircle, Target, Eye, Heart, Zap } from "lucide-react";

const About = () => {
  const features = [
    "Equipe de desenvolvedores experientes",
    "Metodologias ágeis (Scrum/Kanban)",
    "Código limpo e documentado",
    "Suporte técnico contínuo",
    "Entregas dentro do prazo",
    "Tecnologias modernas e escaláveis",
  ];

  const values = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Desenvolver soluções tecnológicas inovadoras que transformem negócios e impulsionem resultados.",
    },
    {
      icon: Eye,
      title: "Visão",
      description:
        "Ser referência em desenvolvimento de sistemas, reconhecidos pela excelência técnica e inovação.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Inovação, qualidade, transparência, comprometimento com o cliente e melhoria contínua.",
    },
  ];

  return (
    <section id="sobre" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full dots-pattern opacity-50" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Sobre Nós
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conheça a <span className="text-gradient">Rorschach Motion</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Há mais de 8 anos criando soluções digitais que transformam a forma
            como empresas operam e crescem no mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border-gradient">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Equipe Rorschach Motion"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-card hidden md:block animate-pulse-glow">
              <p className="font-heading text-4xl font-bold text-gradient">8+</p>
              <p className="text-muted-foreground text-sm font-medium">
                Anos de experiência
              </p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-primary/30 rounded-2xl hidden md:block" />
          </div>

          {/* Content */}
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Por que escolher a Rorschach Motion?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nossa equipe é formada por especialistas apaixonados por
              tecnologia. Cada projeto que desenvolvemos carrega nossa marca de
              qualidade, inovação e atenção aos detalhes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-primary" size={14} />
                  </div>
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group glass border-gradient rounded-2xl p-8 text-center card-hover"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <value.icon className="text-primary" size={28} />
              </div>
              <h4 className="font-heading text-xl font-bold text-foreground mb-4">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
