import React, { useState } from 'react';
import { GraduationCap, X } from 'lucide-react';
import diplomaImage from '@/assets/diploma-senai.jpg';

const DiplomaFrame = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Framed diploma on wall */}
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {/* Wall texture background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-800 rounded-2xl opacity-90" />
        
        {/* Wall pattern overlay */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative p-6 md:p-8">
          {/* Hanging wire effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6">
            <svg viewBox="0 0 80 24" className="w-full h-full">
              <path 
                d="M10 0 Q40 20 70 0" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1.5"
                opacity="0.5"
              />
              <circle cx="40" cy="10" r="3" fill="hsl(var(--muted-foreground))" opacity="0.5" />
            </svg>
          </div>

          {/* Frame with shadow */}
          <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-3 md:p-4 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_15px_50px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:-translate-y-1">
            {/* Inner frame border */}
            <div className="bg-gradient-to-br from-amber-700 to-amber-600 p-1 rounded">
              {/* Gold inner border */}
              <div className="bg-gradient-to-br from-yellow-600/30 via-yellow-500/20 to-yellow-600/30 p-0.5 rounded">
                {/* Diploma image */}
                <div className="relative overflow-hidden rounded bg-white">
                  <img 
                    src={diplomaImage} 
                    alt="Diploma SENAI - Técnico em Desenvolvimento de Sistemas"
                    className="w-full h-auto max-w-[280px] md:max-w-[320px] object-contain"
                  />
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Frame corner ornaments */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-yellow-600/50 rounded-tl" />
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-yellow-600/50 rounded-tr" />
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-yellow-600/50 rounded-bl" />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-yellow-600/50 rounded-br" />
          </div>

          {/* Light effect on wall */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-yellow-500/5 to-transparent blur-xl pointer-events-none" />
        </div>

        {/* Caption */}
        <div className="relative text-center pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <GraduationCap size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">Técnico em Desenvolvimento de Sistemas</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">SENAI - Dr. Celso Charuri • 2025</p>
        </div>
      </div>

      {/* Modal for full view */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-2xl w-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-4 md:p-6 rounded-xl shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <X size={16} />
            </button>
            
            <div className="bg-gradient-to-br from-amber-700 to-amber-600 p-2 rounded-lg">
              <div className="bg-gradient-to-br from-yellow-600/30 via-yellow-500/20 to-yellow-600/30 p-1 rounded">
                <img 
                  src={diplomaImage} 
                  alt="Diploma SENAI - Técnico em Desenvolvimento de Sistemas"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="font-heading font-bold text-lg text-white">Técnico em Desenvolvimento de Sistemas</h3>
              <p className="text-amber-200/80 text-sm">SENAI - Dr. Celso Charuri • Curitiba/PR</p>
              <p className="text-amber-200/60 text-xs mt-1">Conclusão: Outubro de 2025</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiplomaFrame;