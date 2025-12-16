import { Github, Linkedin, Twitter, Users2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Team = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();

  const team = [
    {
      name: "Lucas Oliveira",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      bio: "10+ anos em desenvolvimento de software e gestão de equipes.",
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
    {
      name: "Marina Santos",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
      bio: "Especialista em arquitetura de sistemas e cloud computing.",
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
    {
      name: "Rafael Costa",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
      bio: "Full-stack developer apaixonado por código limpo.",
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
    {
      name: "Juliana Mendes",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
      bio: "Criando experiências digitais memoráveis há 7 anos.",
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
  ];

  return (
    <section className="section-padding bg-secondary relative overflow-hidden noise">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

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
            <Users2 size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Nossa Equipe
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Quem faz a <span className="text-gradient">mágica acontecer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Uma equipe apaixonada por tecnologia e comprometida com a excelência
            em cada projeto.
          </p>
        </div>

        {/* Team grid */}
        <div ref={gridAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group glass-dark border-gradient rounded-2xl overflow-hidden card-hover transition-all duration-500 ${
                gridAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                
                {/* Social links overlay */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[
                    { icon: Linkedin, href: member.social.linkedin },
                    { icon: Github, href: member.social.github },
                    { icon: Twitter, href: member.social.twitter },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/40 transition-colors duration-300"
                    >
                      <social.icon size={18} className="text-primary-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
