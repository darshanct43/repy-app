
import React from 'react';
import { LOGO_SVG } from '../constants';

const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-white z-[1000] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-500/5 blur-[80px] animate-pulse rounded-full" />
        <div className="relative w-56 h-56 animate-bounce-slow">
           <div className="w-full h-full scale-110 drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
        </div>
      </div>
      
      <div className="text-center space-y-3 px-10 relative z-10">
        <h1 className="text-7xl font-black text-[#2D3A82] tracking-tighter italic uppercase">REPY</h1>
        <div className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full mb-4" />
        <p className="text-slate-500 font-bold text-lg italic tracking-tight opacity-90 max-w-[280px] mx-auto leading-relaxed">
          "Why queue when I'm here?"
        </p>
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 relative z-10 w-full px-12">
        <button 
          onClick={onComplete}
          className="w-full py-6 bg-[#2D3A82] text-white font-black text-xl rounded-[32px] hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest"
        >
          Get Started
        </button>
        <p className="text-slate-300 text-[8px] font-black uppercase tracking-[0.4em]">Powered by REPY Intelligence</p>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
