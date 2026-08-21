import React from 'react';
import { ShieldCheck, Award, Headphones, ThumbsUp } from 'lucide-react';

interface WarrantyCardProps {
  className?: string;
}

export const WarrantyCard: React.FC<WarrantyCardProps> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111111] via-[#1A1B26] to-[#0D0E15] text-white border border-[#2D2D3F] p-6 sm:p-8 luxury-shadow ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#6D5EF6] opacity-20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#6D5EF6] opacity-15 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 space-y-6 text-center">
        {/* EarCraft Brand Header */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#6D5EF6]/40 bg-white flex items-center justify-center shrink-0 shadow-sm">
              <img src="/logo.png" alt="EarCraft" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-white">
              Ear<span className="text-[#6D5EF6]">Craft</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 w-full max-w-xs">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#4B4B60] to-transparent flex-1" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#9D8CFF] font-display shrink-0">
              Crafted For Your Sound.
            </span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#4B4B60] to-transparent flex-1" />
          </div>
        </div>

        {/* 6 Months Warranty Main Badge */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="w-14 h-14 rounded-2xl bg-[#6D5EF6]/20 border border-[#6D5EF6]/40 flex items-center justify-center text-[#9D8CFF] shadow-inner shrink-0">
            <ShieldCheck className="w-8 h-8 text-[#9D8CFF]" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white font-display leading-tight">
              6 MONTHS <span className="text-[#9D8CFF]">WARRANTY</span>
            </h3>
          </div>
        </div>

        {/* Policy Description */}
        <p className="text-xs sm:text-sm text-[#A0A5B5] max-w-md mx-auto leading-relaxed">
          This product is covered under 6 months warranty against any manufacturing defects from the date of purchase.
        </p>

        {/* 3 Pillars Footer */}
        <div className="pt-5 border-t border-[#2D2D3F] grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center text-center space-y-2 p-1">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9D8CFF]">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-white font-display leading-tight">
              Quality<br />Assured
            </span>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-1 border-x border-[#2D2D3F]">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9D8CFF]">
              <Headphones className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-white font-display leading-tight">
              Dedicated<br />Support
            </span>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-1">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9D8CFF]">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-white font-display leading-tight">
              Designed<br />for You
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
