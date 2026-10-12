import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Flame, Copy, Check, ShieldCheck, Gift, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface SlideData {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image: string;
  badge: string;
  edition: string;
}

const defaultNavratriSlides: SlideData[] = [
  {
    id: 'slide-1',
    title: 'BUY ANY 2 EARPHONES',
    highlight: 'AT ONLY ₹2,399',
    subtitle: 'Navratri offer has started! Mix & match any 2 handcrafted luxury earphones for just ₹2,399. Celebrate the festive beats with pure acoustic elegance.',
    cta_text: 'Claim Navratri Offer',
    cta_link: '/shop',
    image: '/slider/slide-1.png',
    badge: '🪔 NAVRATRI OFFER HAS STARTED',
    edition: 'Signature Floral Crystal Edition'
  },
  {
    id: 'slide-2',
    title: 'DOUBLE THE SOUND',
    highlight: '2 PAIRS @ ₹2,399',
    subtitle: 'Festival special deal! Get any two EarCraft earphones at only ₹2,399 (Original ₹2,998). Ultra-lightweight and sweat-proof for Garba & Dandiya nights.',
    cta_text: 'Shop Unisex Series',
    cta_link: '/shop?series=unisex',
    image: '/slider/slide-2.png',
    badge: '✨ FESTIVE DUO COMBO • SAVE ₹599',
    edition: 'Cybernetic Star Gunmetal Edition'
  },
  {
    id: 'slide-3',
    title: 'CRAFTED TO SHINE',
    highlight: 'DUO DEAL ₹2,399',
    subtitle: 'Navratri celebration special! Elevate your festive attire with bespoke silver chain audio jewelry. Two pairs for an unbeatable ₹2,399 only.',
    cta_text: 'Explore Crafted Series',
    cta_link: '/shop?series=crafted',
    image: '/slider/slide-3.png',
    badge: '💎 BESPOKE AUDIO JEWELRY DEAL',
    edition: 'Cascade Silver Chain Drop Edition'
  },
  {
    id: 'slide-4',
    title: 'THE ULTIMATE FESTIVE PAIR',
    highlight: 'ANY 2 FOR ₹2,399',
    subtitle: 'Handcrafted precision acoustic monitors with graphene audio drivers. Includes complimentary luxury festive gift box and express shipping.',
    cta_text: 'Shop Navratri Deal',
    cta_link: '/shop',
    image: '/slider/slide-4.png',
    badge: '🎁 FREE FESTIVE GIFT PACKAGING',
    edition: 'Gloss Obsidian Jewel Twin Edition'
  }
];

export const HeroCarousel: React.FC = () => {
  const { heroSlides } = useAppSelector(state => state.cms);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Combine Redux heroSlides with default slider photos if available
  const slides: SlideData[] = defaultNavratriSlides.map((def, idx) => {
    const cmsSlide = heroSlides[idx];
    if (cmsSlide) {
      return {
        ...def,
        id: cmsSlide.id || def.id,
        image: cmsSlide.background_image || def.image,
      };
    }
    return def;
  });

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex] || slides[0];

  // Auto-slide effect every 5 seconds (pauses when user hovers)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NAVRATRI2399');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0D0914] via-[#140D24] to-[#0D0914] text-white border-b border-amber-500/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Navratri Festive Offer Hero Slider"
    >
      {/* Ambient Festive Backdrops */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#6D5EF6]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.06),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">

        {/* Main Grid: Left Content & Right Image Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Notice & Offer Pitch */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left z-20">

            {/* Glowing Navratri Festive Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-transparent border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>{currentSlide.badge}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-amber-400/90 font-display">
                FESTIVE UTSAV SPECIAL DEAL
              </p>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                {currentSlide.title} <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]">
                  {currentSlide.highlight}
                </span>
              </h1>
            </div>

            {/* Subtitle & Value Pitch */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              {currentSlide.subtitle}
            </p>

            {/* Offer Pricing Highlight Card */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Festive Offer Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-display">₹2,399</span>
                  <span className="text-sm text-gray-400 line-through">₹2,998</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    SAVE ₹599
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              {/* Promo Code Quick Copy */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold transition-all"
                title="Click to copy coupon code"
              >
                <span>CODE: NAVRATRI2399</span>
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center">
              <Link
                to={currentSlide.cta_link || '/shop'}
                className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#111111] px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_32px_rgba(245,158,11,0.5)] font-display transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{currentSlide.cta_text}</span>
                <ArrowRight className="w-4 h-4 text-[#111111]" />
              </Link>

              <Link
                to="/shop"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display backdrop-blur-sm"
              >
                <span>View All Earphones</span>
              </Link>
            </div>

            {/* Festive Perks Trust Bar */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left text-[11px] sm:text-xs text-gray-300">
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Festive Gift Box</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Free Express Shipping</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Slider Image Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">

            {/* The Main Showcase Image Container */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-amber-400/30 bg-[#170E28] shadow-[0_16px_50px_rgba(0,0,0,0.6)] group">

              {/* Image with subtle zoom/focus transition */}
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.edition}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback if specific file path fails
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('slider')) {
                    target.src = '/crafted-drop.png';
                  }
                }}
              />

              {/* Gradient Vignette Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0914] via-transparent to-black/25 pointer-events-none" />

              {/* Top Floating Badge on Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Navratri Duo Deal</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold">
                  {currentIndex + 1} / {totalSlides}
                </div>
              </div>

              {/* Bottom Floating Info on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 font-display">
                    {currentSlide.edition}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">
                    ₹2,399 for 2
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 leading-tight">
                  Mix & match with any other model • Auto-applied at checkout
                </p>
              </div>

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-400 text-white hover:text-black border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all shadow-lg active:scale-95"
                aria-label="Previous slider image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-400 text-white hover:text-black border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all shadow-lg active:scale-95"
                aria-label="Next slider image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-none mt-4 flex items-center justify-between gap-2.5">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${currentIndex === idx
                      ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md'
                      : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.edition}
                    className="w-full h-full object-cover"
                  />
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Dot Progress Indicators (Mobile & Tablet) */}
            <div className="flex items-center gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                      ? 'w-8 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Slide Auto-Play Progress Bar */}
      <div className="w-full h-1 bg-white/10 relative overflow-hidden">
        <div
          key={currentIndex}
          className={`h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-[5000ms] ease-linear ${isPaused ? 'w-full' : 'w-full animate-slide-progress'
            }`}
          style={{
            animationDuration: '5000ms'
          }}
        />
      </div>

    </section>
  );
};
