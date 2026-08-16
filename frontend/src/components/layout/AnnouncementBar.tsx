import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const { announcement } = useAppSelector(state => state.cms);
  const [dismissed, setDismissed] = React.useState(false);

  if (!announcement.enabled || dismissed) return null;

  return (
    <div
      className="relative text-xs font-medium py-2.5 px-4 text-center flex items-center justify-center bg-[#F6F7F9] text-[#111111] border-b border-[#E5E7EB] transition-all"
    >
      <div className="flex items-center gap-2 overflow-hidden max-w-7xl mx-auto">
        <Sparkles className="w-3.5 h-3.5 text-[#6D5EF6] shrink-0 animate-pulse" />
        <span className="truncate text-[#111111] font-display font-medium">{announcement.text}</span>
        {announcement.link && (
          <Link
            to={announcement.link}
            className="inline-flex items-center gap-1 font-semibold text-[#6D5EF6] hover:underline underline-offset-4 ml-1 shrink-0 transition-colors"
          >
            Explore Now <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B7280] hover:text-[#111111] transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
