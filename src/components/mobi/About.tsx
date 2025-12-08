import { CheckCircle, Target, Eye, Heart } from "lucide-react";

const About = () => {
  const features = [
    "Equipe altamente qualificada",
    "Materiais de primeira qualidade",
    "Compromisso com prazos",
    "Atendimento personalizado",
    "Garantia em todos os serviços",
    "Suporte pós-entrega",
  ];

  const values = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Construir com excelência, entregando projetos que superam expectativas e transformam a vida das pessoas.",
    },
    {
      icon: Eye,
      title: "Visão",
      description:
        "Ser reconhecida como a construtora mais confiável e inovadora do mercado brasileiro.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Ética, transparência, qualidade, compromisso com o cliente e respeito ao meio ambiente.",
    },
  ];

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase">
            Sobre Nós
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conheça a <span className="text-primary">Mobi Construtora</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Há mais de duas décadas construindo sonhos e transformando espaços
            com qualidade, inovação e compromisso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="Equipe Mobi Construtora"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg hidden md:block">
              <p className="text-4xl font-bold">20+</p>
              <p className="text-sm font-medium">Anos de experiência</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Por que escolher a Mobi Construtora?
            </h3>
            <p className="text-muted-foreground mb-8">
              Nossa trajetória é marcada por projetos de sucesso, clientes
              satisfeitos e um compromisso inabalável com a qualidade. Cada obra
              que realizamos carrega nossa assinatura de excelência e atenção
              aos detalhes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary shrink-0" size={20} />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <value.icon className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-bold text-card-foreground mb-4">
                {value.title}
              </h4>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
