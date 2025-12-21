const FloatingElements = () => {
  const blobs = [
    { top: "5%", left: "5%", delay: "0s" },
    { top: "5%", right: "5%", delay: "2s" },
    { top: "35%", left: "10%", delay: "4s" },
    { top: "35%", right: "10%", delay: "1s" },
    { top: "65%", left: "5%", delay: "3s" },
    { top: "65%", right: "5%", delay: "5s" },
  ];

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Uniform floating blobs */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute w-[300px] h-[300px] rounded-full bg-primary/8 blur-[100px] animate-float-uniform"
          style={{
            top: blob.top,
            left: blob.left,
            right: blob.right,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* Subtle floating particles - uniform sizes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary/25 animate-float-particle"
          style={{
            left: `${12 + i * 11}%`,
            top: `${20 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Glowing orbs - uniform */}
      <div
        className="absolute w-3 h-3 rounded-full bg-primary/30 shadow-[0_0_15px_5px_hsl(var(--primary)/0.2)] animate-pulse-slow"
        style={{ top: "20%", right: "20%" }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-primary/30 shadow-[0_0_15px_5px_hsl(var(--primary)/0.2)] animate-pulse-slow"
        style={{ top: "50%", left: "15%", animationDelay: "1.5s" }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-primary/30 shadow-[0_0_15px_5px_hsl(var(--primary)/0.2)] animate-pulse-slow"
        style={{ bottom: "30%", right: "25%", animationDelay: "3s" }}
      />
    </div>
  );
};

export default FloatingElements;
