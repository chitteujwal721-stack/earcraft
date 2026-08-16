import React from 'react';
import { Hammer, Flame, Gem, Sparkles, ShieldCheck } from 'lucide-react';

export const CraftsmanshipTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Solid 18K Gold Metallurgy',
      desc: '100% recycled Italian solid gold melted at 1,064°C, formulated without toxic nickel trace alloys.',
      icon: Flame,
    },
    {
      step: '02',
      title: 'Hand-Hammering & Sculpting',
      desc: 'Each ear cuff is cold-hammered for 4 hours by master artisans to achieve structural spring tension.',
      icon: Hammer,
    },
    {
      step: '03',
      title: 'Microscopic Gemstone Setting',
      desc: 'VS1 lab-grown diamonds set under 20x magnification microscopes for seamless starlight reflectivity.',
      icon: Gem,
    },
    {
      step: '04',
      title: 'Ultrasonic Mirror Finish',
      desc: '3-stage rouge polishing followed by high-frequency ultrasonic bath for heirloom mirror sheen.',
      icon: Sparkles,
    },
    {
      step: '05',
      title: 'Velvet Vault Inspection',
      desc: 'Inspected under UV spectrometers, serial hallmarked, and sealed in temperature-controlled velvet vaults.',
      icon: ShieldCheck,
    }
  ];

  return (
    <div className="py-20 bg-obsidian-950 text-zinc-100 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
            Artisanal Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            The Atelier Craftsmanship Process
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            From raw recycled gold ingot to refined ear architecture. Zero mass production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl border border-white/10 hover:border-gold-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-extrabold text-gold-500/40 group-hover:text-gold-400 transition-colors">
                      {s.step}
                    </span>
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-bold text-zinc-100 mb-2 group-hover:text-gold-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
