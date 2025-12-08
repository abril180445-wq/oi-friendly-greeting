import { ArrowRight, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Residencial Aurora",
      location: "São Paulo, SP",
      type: "Residencial",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 2,
      title: "Edifício Corporate Tower",
      location: "Campinas, SP",
      type: "Comercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 3,
      title: "Condomínio Verde Vale",
      location: "Ribeirão Preto, SP",
      type: "Residencial",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      status: "Em andamento",
    },
    {
      id: 4,
      title: "Shopping Center Mall",
      location: "Santos, SP",
      type: "Comercial",
      image: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 5,
      title: "Residencial Parque das Flores",
      location: "Sorocaba, SP",
      type: "Residencial",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      status: "Lançamento",
    },
    {
      id: 6,
      title: "Centro Empresarial Nova Era",
      location: "São José dos Campos, SP",
      type: "Comercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      status: "Em andamento",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-500/20 text-green-400";
      case "Em andamento":
        return "bg-primary/20 text-primary";
      case "Lançamento":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section id="projetos" className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase">
            Nossos Projetos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
            Obras que <span className="text-primary">transformam</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça alguns dos projetos que realizamos com excelência e dedicação,
            sempre superando as expectativas dos nossos clientes.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-secondary border border-border/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Building size={14} />
                    {project.type}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-semibold"
                >
                  Ver detalhes
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8"
          >
            Ver Todos os Projetos
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
