import { ArrowRight, Globe, Smartphone, Layers, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();

  const projects = [
    {
      id: 1,
      title: "Tefilin - Sistema de Gestão para Igrejas",
      client: "Igreja Assembleia de Deus",
      type: "Web App",
      image: "/images/project-tefilin.png",
      status: "Entregue",
      link: "https://wonder-stack.lovable.app/auth",
    },
    {
      id: 2,
      title: "Sistema ERP Completo",
      client: "Indústria Têxtil",
      type: "Web App",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 3,
      title: "App de Delivery",
      client: "Rede de Restaurantes",
      type: "Mobile App",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 4,
      title: "Plataforma E-commerce",
      client: "Loja de Moda",
      type: "Web App",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      status: "Em andamento",
    },
    {
      id: 5,
      title: "Sistema de Gestão Escolar",
      client: "Rede de Ensino",
      type: "Web App",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 6,
      title: "App Financeiro",
      client: "Fintech",
      type: "Mobile App",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
      status: "Lançamento",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Em andamento":
        return "bg-primary/20 text-primary border-primary/30";
      case "Lançamento":
        return "bg-violet-500/20 text-violet-400 border-violet-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section id="projetos" className="section-padding bg-secondary relative overflow-hidden noise">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Layers size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Nossos Projetos
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Soluções que <span className="text-gradient">transformam</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Conheça alguns dos sistemas e aplicações que desenvolvemos com
            excelência, sempre superando as expectativas dos nossos clientes.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={gridAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass-dark rounded-2xl overflow-hidden card-hover transition-all duration-500 ${
                gridAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ExternalLink className="text-primary" size={20} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Globe size={14} className="text-primary/70" />
                    {project.client}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Smartphone size={14} className="text-primary/70" />
                    {project.type}
                  </div>
                </div>
                {project.link ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-semibold text-sm group/btn"
                  >
                    Ver projeto
                    <ExternalLink
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </a>
                ) : (
                  <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn">
                    Ver detalhes
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            gridAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            size="lg"
            className="btn-premium text-primary-foreground font-semibold text-lg px-10 h-14 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              Ver Todos os Projetos
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
