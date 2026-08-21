import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { HeroCarousel } from '../../components/storefront/HeroCarousel';
import { ProductCard } from '../../components/storefront/ProductCard';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  BatteryCharging,
  Wifi,
  Volume2,
  Sliders,
  Star,
  ChevronDown,
  ArrowRight,
  Feather,
  Gem,
  Award,
  Headphones
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sliders,
  Volume2,
  Wifi,
  ShieldCheck,
  BatteryCharging,
  Zap,
  Feather,
  Gem,
  Sparkles,
  Star,
  Award,
  Headphones
};

export const Home: React.FC = () => {
  const {
    products,
    craftedHeader,
    unisexHeader,
    whyFeatures,
    testimonials,
    faqs
  } = useAppSelector(state => state.cms);

  const [openFaqId, setOpenFaqId] = useState<string>(faqs[0]?.id || '');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const craftedProducts = products.filter(p => p.category.slug === 'crafted-series');
  const unisexProducts = products.filter(p => p.category.slug === 'unisex-series');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-28 pb-20 bg-[#F6F7F9] text-[#111111] overflow-hidden">
      
      {/* SECTION 1 & 2 & 3: Dynamic Hero Section */}
      <HeroCarousel />

      {/* SECTION 4: Crafted Series Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">
              {craftedHeader.badge || 'Signature Collection'}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#111111] mt-1">
              {craftedHeader.title || 'Crafted Series'}
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-xl">
              {craftedHeader.description || 'Signature EarCraft acoustic monitors engineered with graphene drivers and bespoke finishes.'}
            </p>
          </div>
          <Link
            to={craftedHeader.cta_link || '/shop?series=crafted'}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#6D5EF6] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all font-display shadow-md self-start md:self-auto"
          >
            {craftedHeader.cta_text || 'Explore Crafted Series'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {craftedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* SECTION 5: Unisex Series Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">
              {unisexHeader.badge || 'Everyday Collection'}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#111111] mt-1">
              {unisexHeader.title || 'Unisex Series'}
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-xl">
              {unisexHeader.description || 'Universal acoustic geometry designed for everyday style, all-day comfort, transparent cybernetic shells, and seamless connectivity.'}
            </p>
          </div>
          <Link
            to={unisexHeader.cta_link || '/shop?series=unisex'}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#6D5EF6] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all font-display shadow-md self-start md:self-auto"
          >
            {unisexHeader.cta_text || 'Explore Unisex Series'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {unisexProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* SECTION 6: Why EarCraft (Dynamic Grid) */}
      <section id="why-earcraft" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">
            Acoustic Excellence
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#111111]">
            Why EarCraft Stands Apart
          </h2>
          <p className="text-sm text-[#6B7280]">
            Over 2,000 hours of precision acoustic tuning distilled into ultra-ergonomic wireless audio electronics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyFeatures.map((feat) => {
            const Icon = iconMap[feat.icon] || Sparkles;
            return (
              <div
                key={feat.id}
                className="bg-white p-6 rounded-2xl border border-[#E5E7EB] luxury-shadow-hover flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#6D5EF6]/10 border border-[#6D5EF6]/20 flex items-center justify-center text-[#6D5EF6]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#111111]">{feat.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 9: Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Curated Selections</span>
            <h2 className="font-display text-3xl font-extrabold text-[#111111] mt-1">Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-[#6D5EF6] hover:underline flex items-center gap-1 font-display">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* SECTION 10: Customer Reviews (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Audiophile Praise</span>
          <h2 className="font-display text-4xl font-extrabold text-[#111111]">What Listeners Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-4">
              <div className="flex items-center gap-1 text-[#6D5EF6]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#6D5EF6]" />
                ))}
              </div>
              <p className="font-display text-sm text-[#111111] leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-[#E5E7EB] flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#111111] font-display">{t.customer_name}</span>
                  <span className="text-[#6B7280] ml-2">— {t.location}</span>
                </div>
                <span className="text-[11px] text-[#6D5EF6] font-bold">Verified Owner</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: FAQ Accordion (Dynamic) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Support & Answers</span>
          <h2 className="font-display text-3xl font-bold text-[#111111]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden luxury-shadow">
              <button
                onClick={() => setOpenFaqId(openFaqId === faq.id ? '' : faq.id)}
                className="w-full p-6 text-left flex justify-between items-center text-[#111111] hover:text-[#6D5EF6] transition-colors"
              >
                <span className="font-display text-base font-bold">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openFaqId === faq.id ? 'rotate-180 text-[#6D5EF6]' : 'text-[#6B7280]'}`} />
              </button>
              {openFaqId === faq.id && (
                <div className="px-6 pb-6 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-12 rounded-3xl border border-[#E5E7EB] text-center space-y-6 luxury-shadow">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">VIP Dispatch</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111111]">
            Join the EarCraft Private Audio List
          </h2>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto">
            Receive exclusive invitations to limited product series releases, acoustic tuning updates, and VIP offers.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-[#6D5EF6]/10 border border-[#6D5EF6]/30 rounded-2xl text-xs text-[#6D5EF6] font-bold max-w-md mx-auto">
              ✨ Welcome to the EarCraft VIP List.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-[#F6F7F9] border border-[#E5E7EB] rounded-full px-5 py-3.5 text-xs text-[#111111] placeholder-[#6B7280] focus:outline-none focus:border-[#6D5EF6]"
              />
              <button
                type="submit"
                className="bg-[#111111] hover:bg-[#6D5EF6] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md font-display"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
