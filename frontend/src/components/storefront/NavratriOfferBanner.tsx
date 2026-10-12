import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Check, Copy, ArrowRight, ShieldCheck, Gift, Clock, Zap } from 'lucide-react';

export const NavratriOfferBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('NAVRATRI2399');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const offerItems = [
    {
      title: 'Crafted Drop / Floral',
      image: '/slider/slide-1.png',
      tag: 'Handcrafted Crystal Alloy',
      badge: 'Popular Choice'
    },
    {
      title: 'Unisex Cyber Star',
      image: '/slider/slide-2.png',
      tag: 'Gloss Gunmetal Finish',
      badge: 'Garba Favorite'
    },
    {
      title: 'Crafted Cascade Chain',
      image: '/slider/slide-3.png',
      tag: 'Bespoke Silver Chain',
      badge: 'Jewelry Finish'
    },
    {
      title: 'Obsidian Jewel Twins',
      image: '/slider/slide-4.png',
      tag: 'Studio Acoustic Monitor',
      badge: 'Hi-Fi Audio'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navratri Festive Offer Highlights">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160B29] via-[#241142] to-[#120822] border-2 border-amber-400/30 p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* Festive Ambient Background Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#6D5EF6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-8 lg:space-y-12">

          {/* Header Block */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-amber-500/20 pb-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm animate-pulse">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Navratri Utsav 2026 • Limited Time Festivity</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Navratri Offer Has Started! <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  Buy Any 2 Earphones At Only ₹2,399
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-300 font-sans">
                Elevate your style for the festive season! Mix and match any two premium EarCraft models and get both for just <strong className="text-amber-300 font-bold">₹2,399</strong> instead of the normal <span className="line-through text-gray-400">₹2,998</span>.
              </p>
            </div>

            {/* Price Breakdown & Quick Copy Badge */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-amber-400/30 p-5 sm:p-6 text-center lg:text-right shrink-0 max-w-sm mx-auto lg:mx-0 w-full lg:w-auto shadow-xl">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                Instant Festival Savings
              </span>
              <div className="flex items-baseline justify-center lg:justify-end gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-display">₹2,399</span>
                <span className="text-base text-gray-400 line-through">₹2,998</span>
              </div>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                You Save ₹599 (20% OFF)
              </span>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400 font-mono">CODE: NAVRATRI2399</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Copy coupon code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 4 Slider Image Products Included in Offer */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 font-display">
                  Eligible Collections
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Choose Any 2 To Create Your Festive Duo
                </h3>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid of the 4 Featured Slider Models */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {offerItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden bg-black/40 border border-white/15 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#1A102E]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-400/30">
                      {item.badge}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{item.tag}</p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-amber-300/90 font-mono font-bold">In Navratri Deal</span>
                      <span className="text-[10px] text-gray-400">₹1,499 ea.</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action & Key Festive Guarantees */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-amber-500/20">

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Mix & Match Any 2 Styles</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Free Luxury Gift Packaging</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#111111] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(245,158,11,0.4)] font-display text-center"
              >
                <span>Shop 2 for ₹2,399 Now</span>
                <ArrowRight className="w-4 h-4 text-[#111111]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
