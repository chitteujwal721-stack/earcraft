import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export const HeroCarousel: React.FC = () => {
  const { heroSlides } = useAppSelector(state => state.cms);
  const activeSlides = heroSlides.filter(s => s.is_active);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentSlide = activeSlides[currentIndex] || heroSlides[0] || {
    id: 'default',
    title: 'CRAFTED TO SHINE',
    subtitle: 'Designed for Everyday Style. Engineered for Exceptional Sound.',
    cta_text: 'Explore Crafted',
    cta_link: '/shop?series=crafted',
    background_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    order: 1
  };

  const handleNext = () => {
    if (activeSlides.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }
  };

  const handlePrev = () => {
    if (activeSlides.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    }
  };

  return (
    <div className="relative min-h-[580px] sm:min-h-[720px] lg:h-screen w-full overflow-hidden bg-[#F6F7F9] flex items-center py-12 sm:py-24 border-b border-[#E5E7EB]">
      
      {/* Soft Ambient Light Glow Following Cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out z-0"
        style={{
          background: `radial-gradient(750px circle at ${50 + mousePos.x * 1.5}% ${50 + mousePos.y * 1.5}%, rgba(109, 94, 246, 0.08), transparent 60%)`
        }}
      />

      {/* Background Soft Mesh Gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#6D5EF6]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8B7EFF]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Floating 3D Product Image Render */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-24 pointer-events-none z-10 opacity-20 sm:opacity-50 lg:opacity-100 transition-opacity duration-500">
        <div
          className="relative w-[240px] sm:w-[440px] lg:w-[600px] h-[240px] sm:h-[440px] lg:h-[600px] transition-transform duration-700 ease-out animate-float-slow"
          style={{
            transform: `translate3d(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px, 0) rotate(${mousePos.x * 0.1}deg)`
          }}
        >
          <img
            src={currentSlide.background_image || "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80"}
            alt={currentSlide.title}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(109,94,246,0.18)]"
          />
          <div className="absolute inset-0 rounded-full bg-[#6D5EF6]/15 blur-3xl -z-10 animate-pulse-glow" />
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#6D5EF6] text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6D5EF6] animate-pulse shrink-0" />
            <span>EarCraft Luxury Audio Electronics</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111111] leading-tight sm:leading-none">
            {currentSlide.title}
          </h1>

          <p className="text-lg sm:text-2xl text-[#111111] font-medium leading-snug font-display">
            {currentSlide.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-[#6B7280] max-w-md leading-relaxed font-sans">
            45dB Hybrid Active Noise Cancellation • 10mm Graphene Diaphragm Drivers • 40-Hour Battery Life
          </p>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <Link
              to={currentSlide.cta_link || '/shop?series=crafted'}
              className="bg-[#111111] hover:bg-[#6D5EF6] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all luxury-shadow shadow-xl font-display"
            >
              <span>{currentSlide.cta_text || 'Explore Crafted'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/shop?series=unisex"
              className="bg-white hover:bg-[#F6F7F9] text-[#111111] border border-[#E5E7EB] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all luxury-shadow font-display"
            >
              <span>Explore Unisex</span>
              <ArrowRight className="w-4 h-4 text-[#6D5EF6]" />
            </Link>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls if multiple active slides exist */}
      {activeSlides.length > 1 && (
        <div className="absolute right-8 bottom-12 z-30 flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] hover:border-[#6D5EF6] flex items-center justify-center text-[#111111] hover:text-[#6D5EF6] transition-colors shadow-md"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-[#6B7280] font-mono">
            {currentIndex + 1} / {activeSlides.length}
          </span>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] hover:border-[#6D5EF6] flex items-center justify-center text-[#111111] hover:text-[#6D5EF6] transition-colors shadow-md"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#6B7280] z-20 animate-bounce pointer-events-none">
        <span className="font-display uppercase tracking-widest text-[10px] font-semibold">Scroll To Explore</span>
        <ChevronDown className="w-4 h-4 text-[#6D5EF6]" />
      </div>

    </div>
  );
};
