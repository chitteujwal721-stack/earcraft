import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Sparkles, ArrowRight, X, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const { announcement } = useAppSelector(state => state.cms);
  const [dismissed, setDismissed] = React.useState(false);

  const isEnabled = announcement ? announcement.enabled !== false : true;
  if (!isEnabled || dismissed) return null;

  return (
    <div
      className="relative text-xs py-2 sm:py-2.5 px-3 sm:px-6 text-center flex items-center justify-center bg-gradient-to-r from-[#120824] via-[#281145] to-[#120824] text-[#F3F4F6] border-b border-amber-500/25 shadow-sm transition-all z-40"
    >
      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto w-full pr-6 sm:pr-8">
        {/* Glowing Festive Badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
          FESTIVE UTSAV
        </span>

        {/* Notice Text */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-center truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          
          {/* Laptop & Tablet version */}
          <span className="hidden md:inline font-display text-[12px] font-medium text-white tracking-wide">
            <span className="text-amber-400 font-bold">NAVRATRI OFFER HAS STARTED:</span> Buy any two earphones at price only <span className="text-amber-300 font-bold underline decoration-amber-400/50 underline-offset-2">₹2,399</span>!
          </span>

          {/* Mobile version */}
          <span className="md:hidden font-display text-[11px] font-medium text-white truncate">
            <span className="text-amber-400 font-bold">Navratri Offer:</span> Buy 2 Earphones @ <span className="text-amber-300 font-bold">₹2,399</span>!
          </span>
        </div>

        {/* CTA Link */}
        <Link
          to={announcement.link || '/shop'}
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-full px-2.5 py-0.5 ml-1 shrink-0 transition-all shadow-sm"
        >
          <span>Claim Deal</span>
          <ArrowRight className="w-3 h-3 text-amber-300" />
        </Link>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
