import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ShieldCheck, Truck, BatteryCharging, Zap, Send, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

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
            <h4 className="text-sm font-bold text-[#111111] font-display">6-Month EarCraft Warranty</h4>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

        {/* Column 1: Brand Story & VIP Newsletter */}
        <div className="lg:col-span-5 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3.5 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#6D5EF6]/30 shadow-md flex items-center justify-center bg-white shrink-0 group-hover:border-[#6D5EF6] transition-all">
              <img src="/logo.png" alt="EarCraft Logo" className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-widest text-[#111111] group-hover:text-[#6D5EF6] transition-colors">
              EAR<span className="text-[#6D5EF6]">CRAFT</span>
            </span>
          </Link>
          <p className="text-xs text-[#6B7280] leading-relaxed max-w-md">
            Where style meets sound perfection. Redefining modern luxury audio through graphene acoustics and minimal design aesthetics.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2 max-w-md">
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

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-widest text-[#111111] font-display">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/" className="hover:text-[#6D5EF6] transition-colors">Home</Link></li>
            <li><Link to="/shop?series=crafted" className="hover:text-[#6D5EF6] transition-colors">Crafted Series — Premium Collection</Link></li>
            <li><Link to="/shop?series=unisex" className="hover:text-[#6D5EF6] transition-colors">Unisex Series — Everyday Collection</Link></li>
            <li><Link to="/about-us" className="hover:text-[#6D5EF6] transition-colors">About EarCraft</Link></li>
            <li><Link to="/contact" className="hover:text-[#6D5EF6] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs uppercase font-bold tracking-widest text-[#111111] font-display">Customer Support</h4>
          
          <div className="p-4 bg-[#F6F7F9] rounded-2xl border border-[#E5E7EB] luxury-shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6D5EF6]/10 flex items-center justify-center text-[#6D5EF6] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280] font-display">Customer Support Line</p>
                <a href="tel:+918591754505" className="text-base font-extrabold text-[#111111] hover:text-[#6D5EF6] font-mono transition-colors">
                  +91 8591754505
                </a>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-xs pt-1">
            <li><Link to="/faq" className="hover:text-[#6D5EF6] transition-colors">FAQ & Help Center</Link></li>
            <li><Link to="/policies" className="hover:text-[#6D5EF6] transition-colors">Warranty Policy</Link></li>
            <li><Link to="/policies" className="hover:text-[#6D5EF6] transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/policies" className="hover:text-[#6D5EF6] transition-colors">Shipping & Delivery</Link></li>
          </ul>

          <div className="flex items-center gap-3 pt-1">
            {settings.social_instagram && (
              <a href={settings.social_instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#6D5EF6] hover:border-[#6D5EF6] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings.social_facebook && (
              <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#6D5EF6] hover:border-[#6D5EF6] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {settings.social_twitter && (
              <a href={settings.social_twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#6D5EF6] hover:border-[#6D5EF6] transition-colors" aria-label="Twitter">
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
