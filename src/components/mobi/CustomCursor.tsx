import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Não mostrar em dispositivos touch
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Cursor mira - centro */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isPointer ? 1.3 : 1})`,
        }}
      >
        {/* Ponto central */}
        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
      </div>

      {/* Círculo externo da mira */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.4 : 1}) rotate(${isClicking ? '45deg' : '0deg'})`,
        }}
      >
        <div className={`w-8 h-8 rounded-full border-2 border-primary/80 transition-all duration-200 ${
          isClicking ? 'border-primary' : ''
        }`}>
          {/* Linhas da mira - horizontal */}
          <div className="absolute top-1/2 left-0 w-2 h-0.5 bg-primary/80 -translate-y-1/2 -translate-x-1" />
          <div className="absolute top-1/2 right-0 w-2 h-0.5 bg-primary/80 -translate-y-1/2 translate-x-1" />
          {/* Linhas da mira - vertical */}
          <div className="absolute left-1/2 top-0 w-0.5 h-2 bg-primary/80 -translate-x-1/2 -translate-y-1" />
          <div className="absolute left-1/2 bottom-0 w-0.5 h-2 bg-primary/80 -translate-x-1/2 translate-y-1" />
        </div>
      </div>

      {/* Glow effect */}
      <div
        className={`fixed pointer-events-none z-[9997] transition-all duration-300 ease-out ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className={`w-16 h-16 rounded-full bg-primary/30 blur-xl transition-all duration-300 ${
            isPointer ? 'scale-150 bg-primary/40' : ''
          }`}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
