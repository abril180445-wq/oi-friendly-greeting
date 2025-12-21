import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Large floating blobs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-float-slow"
        style={{
          top: "10%",
          left: "10%",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] animate-float-slower"
        style={{
          top: "50%",
          right: "5%",
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
          transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full bg-violet-500/6 blur-[80px] animate-float"
        style={{
          bottom: "20%",
          left: "20%",
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: `${3 + (i % 4) * 2}px`,
            height: `${3 + (i % 4) * 2}px`,
            left: `${10 + i * 7}%`,
            top: `${15 + (i % 5) * 18}%`,
            animation: `floatParticle ${6 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Subtle light streaks */}
      <div
        className="absolute w-[2px] h-[100px] bg-gradient-to-b from-transparent via-primary/20 to-transparent rotate-45 animate-streak"
        style={{ top: "20%", left: "30%" }}
      />
      <div
        className="absolute w-[2px] h-[80px] bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent -rotate-12 animate-streak-slow"
        style={{ top: "60%", right: "25%" }}
      />
      <div
        className="absolute w-[2px] h-[60px] bg-gradient-to-b from-transparent via-primary/15 to-transparent rotate-[30deg] animate-streak-slower"
        style={{ bottom: "30%", left: "60%" }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute w-4 h-4 rounded-full bg-primary/40 shadow-[0_0_20px_8px_hsl(var(--primary)/0.3)] animate-pulse-glow"
        style={{ top: "25%", right: "15%" }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-cyan-400/40 shadow-[0_0_15px_6px_rgba(34,211,238,0.2)] animate-pulse-glow"
        style={{ top: "70%", left: "12%", animationDelay: "1s" }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-violet-400/40 shadow-[0_0_12px_4px_rgba(167,139,250,0.2)] animate-pulse-glow"
        style={{ bottom: "25%", right: "30%", animationDelay: "2s" }}
      />
    </div>
  );
};

export default FloatingElements;
