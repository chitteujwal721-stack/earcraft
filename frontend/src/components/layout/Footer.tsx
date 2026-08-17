import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ShieldCheck, Truck, BatteryCharging, Zap, Send, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useAppSelector(state => state.cms);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FFFFFF] text-[#6B7280] border-t border-[#E5E7EB] pt-16 pb-12 mt-auto">
      
      {/* Brand Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#E5E7EB] grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#6D5EF6]/10 flex items-center justify-center text-[#6D5EF6] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111111] font-display">Bluetooth 5.4 Low Latency</h4>
            <p className="text-xs text-[#6B7280] mt-1">Instant dual-device pairing with 0.03s low latency gaming mode.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#6D5EF6]/10 flex items-center justify-center text-[#6D5EF6] shrink-0">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111111] font-display">40-Hour Playback</h4>
            <p className="text-xs text-[#6B7280] mt-1">8.5 hours per charge + Type-C / Qi wireless charging case.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#6D5EF6]/10 flex items-center justify-center text-[#6D5EF6] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111111] font-display">2-Year EarCraft Warranty</h4>
            <p className="text-xs text-[#6B7280] mt-1">Comprehensive hardware protection & acoustic firmware updates.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#6D5EF6]/10 flex items-center justify-center text-[#6D5EF6] shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111111] font-display">Insured Express Delivery</h4>
            <p className="text-xs text-[#6B7280] mt-1">Direct air express shipping with live GPS shipment tracking.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Brand Story Column */}
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3.5">
            <img src="/logo.png" alt="EarCraft Logo" className="h-16 sm:h-20 w-auto object-contain" />
            <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-widest text-[#111111]">
              EAR<span className="text-[#6D5EF6]">CRAFT</span>
            </span>
          </Link>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Crafted to Shine. Designed for Everyday Style. Engineered for Exceptional Sound. Redefining modern luxury audio through graphene acoustics, 45dB noise cancellation, and minimal design aesthetics.
          </p>
          
          {/* Newsletter Box */}
          <div className="pt-2">
            <h5 className="text-xs uppercase tracking-widest text-[#6D5EF6] font-bold mb-2 font-display">Private VIP Audio List</h5>
            {subscribed ? (
              <div className="p-3 bg-[#6D5EF6]/10 border border-[#6D5EF6]/30 rounded-xl text-xs text-[#6D5EF6] font-semibold">
                ✨ Welcome to the EarCraft VIP Audio List.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  className="bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#6B7280] focus:outline-none focus:border-[#6D5EF6] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-[#6D5EF6] text-white p-2.5 rounded-xl transition-colors shadow-sm"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-widest text-[#111111] font-display">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/" className="hover:text-[#6D5EF6] transition-colors">Home</Link></li>
            <li><Link to="/shop?series=crafted" className="hover:text-[#6D5EF6] transition-colors">Crafted Series — Premium Collection</Link></li>
            <li><Link to="/shop?series=unisex" className="hover:text-[#6D5EF6] transition-colors">Unisex Series — Everyday Collection</Link></li>
            <li><Link to="/about-us" className="hover:text-[#6D5EF6] transition-colors">About EarCraft</Link></li>
            <li><Link to="/contact" className="hover:text-[#6D5EF6] transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Customer Support Column */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-widest text-[#111111] font-display">Customer Support</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/faq" className="hover:text-[#6D5EF6] transition-colors">FAQ & Help Center</Link></li>
            <li><Link to="/policies" className="hover:text-[#6D5EF6] transition-colors">Warranty Policy</Link></li>
            <li><Link to="/policies" className="hover:text-[#6D5EF6] transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/policies" className="hover:text-[#6D5EF6] transition-colors">Shipping & Delivery</Link></li>
          </ul>
        </div>

        {/* Brand Contact & Socials */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-widest text-[#111111] font-display">Concierge & Labs</h4>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            {settings.address}
          </p>
          <p className="text-xs text-[#111111] font-mono">
            {settings.contact_email}<br />
            {settings.contact_phone}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {settings.social_instagram && (
              <a href={settings.social_instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#6D5EF6] hover:border-[#6D5EF6] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings.social_facebook && (
              <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#6D5EF6] hover:border-[#6D5EF6] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {settings.social_twitter && (
              <a href={settings.social_twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#6D5EF6] hover:border-[#6D5EF6] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
        <p>© {new Date().getFullYear()} EARCRAFT ACOUSTIC LABS INC. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6 font-display">
          <Link to="/policies" className="hover:text-[#111111]">Privacy Policy</Link>
          <Link to="/policies" className="hover:text-[#111111]">Terms of Service</Link>
          <Link to="/policies" className="hover:text-[#111111]">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
};
