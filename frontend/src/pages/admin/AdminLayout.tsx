import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { useAppSelector } from '../../store/hooks';
import { Bell, ShieldCheck, Palette, Sparkles } from 'lucide-react';

export type AdminTheme = 'violet' | 'gold' | 'emerald' | 'rose';

export const themeStyles: Record<AdminTheme, { bg: string; card: string; border: string; accent: string; textAccent: string; shadow: string }> = {
  violet: {
    bg: 'bg-[#F8FAFC]',
    card: 'bg-white',
    border: 'border-violet-200',
    accent: 'bg-[#6D5EF6]',
    textAccent: 'text-[#6D5EF6]',
    shadow: 'shadow-[0_4px_20px_rgba(109,94,246,0.08)]',
  },
  gold: {
    bg: 'bg-[#FAF9F5]',
    card: 'bg-white',
    border: 'border-amber-200',
    accent: 'bg-[#D4AF37]',
    textAccent: 'text-amber-600',
    shadow: 'shadow-[0_4px_20px_rgba(212,175,55,0.08)]',
  },
  emerald: {
    bg: 'bg-[#F0FDF4]',
    card: 'bg-white',
    border: 'border-emerald-200',
    accent: 'bg-[#10B981]',
    textAccent: 'text-emerald-600',
    shadow: 'shadow-[0_4px_20px_rgba(16,185,129,0.08)]',
  },
  rose: {
    bg: 'bg-[#FFF1F2]',
    card: 'bg-white',
    border: 'border-rose-200',
    accent: 'bg-[#F43F5E]',
    textAccent: 'text-rose-600',
    shadow: 'shadow-[0_4px_20px_rgba(244,63,94,0.08)]',
  },
};

export const AdminLayout: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  const [theme, setTheme] = useState<AdminTheme>(() => {
    return (localStorage.getItem('earcraft_admin_theme') as AdminTheme) || 'violet';
  });

  useEffect(() => {
    localStorage.setItem('earcraft_admin_theme', theme);
  }, [theme]);

  const currentTheme = themeStyles[theme];

  return (
    <div className={`flex min-h-screen ${currentTheme.bg} text-slate-900 font-sans antialiased transition-colors duration-300`}>
      <AdminSidebar theme={theme} setTheme={setTheme} />
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Admin Header */}
        <header className={`h-16 border-b ${currentTheme.border} px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-30 font-display transition-colors duration-300 shadow-sm`}>
          <div className="flex items-center gap-3">
            <ShieldCheck className={`w-5 h-5 ${currentTheme.textAccent}`} />
            <span className="font-bold text-sm text-slate-900">Super Admin Control Hub</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${currentTheme.accent} text-white`}>
              {theme} Light Mode
            </span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Quick Theme Selector Bar */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <Palette className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              {(['violet', 'gold', 'emerald', 'rose'] as AdminTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-5 h-5 rounded-full border transition-all ${
                    t === 'violet' ? 'bg-[#6D5EF6] border-purple-300' :
                    t === 'gold' ? 'bg-[#D4AF37] border-amber-300' :
                    t === 'emerald' ? 'bg-[#10B981] border-emerald-300' : 'bg-[#F43F5E] border-rose-300'
                  } ${theme === t ? 'scale-125 ring-2 ring-slate-400' : 'opacity-60 hover:opacity-100'}`}
                  title={`Switch to ${t} light theme`}
                />
              ))}
            </div>

            <button className={`p-2 text-slate-500 hover:text-slate-900 relative transition-colors`}>
              <Bell className="w-5 h-5" />
              <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${currentTheme.accent} animate-ping`} />
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt="Admin Avatar"
                className={`w-8 h-8 rounded-full border ${currentTheme.border} object-cover`}
              />
              <div className="text-xs">
                <p className="font-bold text-slate-900">{user?.first_name} {user?.last_name}</p>
                <p className={`text-[10px] ${currentTheme.textAccent} font-mono font-semibold`}>{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet context={{ theme }} />
        </main>

      </div>
    </div>
  );
};
