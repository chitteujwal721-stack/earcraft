import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ArrowUpRight, Zap } from 'lucide-react';

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const { categories, collections } = useAppSelector(state => state.cms);

  return (
    <div className="absolute top-full left-0 w-full glass-card border-t border-b border-[#262626] shadow-2xl py-8 px-12 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        
        {/* Categories Column */}
        <div className="col-span-4 border-r border-[#262626] pr-8">
          <h4 className="text-xs uppercase font-bold text-[#B38CFF] tracking-widest mb-4">
            Wireless Audio Categories
          </h4>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-base font-display hover:text-[#B38CFF] transition-colors text-white"
                >
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#B38CFF]" />
                </Link>
                {cat.subcategories && (
                  <div className="flex flex-wrap gap-2 mt-1.5 pl-2">
                    {cat.subcategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/shop?category=${sub.slug}`}
                        onClick={onClose}
                        className="text-xs text-[#A9A9A9] hover:text-white transition-colors"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Collections Column */}
        <div className="col-span-4 border-r border-[#262626] pr-8">
          <h4 className="text-xs uppercase font-bold text-[#B38CFF] tracking-widest mb-4">
            Acoustic Collections
          </h4>
          <div className="space-y-4">
            {collections.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.slug}`}
                onClick={onClose}
                className="group block p-3.5 rounded-xl bg-[#0E0E0E] border border-[#262626] hover:border-[#B38CFF]/50 transition-all"
              >
                <h5 className="font-display font-bold text-sm group-hover:text-[#B38CFF] transition-colors text-white">
                  {col.title}
                </h5>
                <p className="text-xs text-[#A9A9A9] mt-1 line-clamp-1">{col.tagline}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Visual Spotlight Card */}
        <div className="col-span-4 flex flex-col justify-between bg-[#0E0E0E] p-4 rounded-xl border border-[#262626]">
          <div className="relative h-44 rounded-lg overflow-hidden mb-3 bg-[#151515]">
            <img
              src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
              alt="Acoustic Spotlight"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-display text-[#B38CFF] font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> 45dB Active Noise Cancellation
              </span>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-bold text-white font-display">EarCraft Apex Pro Flagship</h5>
            <p className="text-xs text-[#A9A9A9] mt-1">10mm Graphene Drivers with 40-Hour Combined Playback.</p>
            <Link
              to="/product/earcraft-apex-pro-wireless-earbuds"
              onClick={onClose}
              className="inline-block mt-3 text-xs font-semibold text-[#B38CFF] hover:underline"
            >
              Explore Flagship Apex Pro →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
