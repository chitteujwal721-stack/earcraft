

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Folder,
  ShoppingBag,
  Users,
  Megaphone,
  Sliders,
  BarChart3,
  Settings,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { AdminTheme } from '../../pages/admin/AdminLayout';

interface AdminSidebarProps {
  theme?: AdminTheme;
  setTheme?: (t: AdminTheme) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ theme = 'violet' }) => {
  const location = useLocation();

  const accentColors: Record<AdminTheme, { bg: string; text: string; border: string; activeClass: string }> = {
    violet: {
      bg: 'bg-[#6D5EF6]/10',
      text: 'text-[#6D5EF6]',
      border: 'border-[#6D5EF6]/30',
      activeClass: 'bg-[#6D5EF6] text-white shadow-md shadow-[#6D5EF6]/20',
    },
    gold: {
      bg: 'bg-[#D4AF37]/10',
      text: 'text-amber-700',
      border: 'border-[#D4AF37]/30',
      activeClass: 'bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/20',
    },
    emerald: {
      bg: 'bg-[#10B981]/10',
      text: 'text-emerald-700',
      border: 'border-[#10B981]/30',
      activeClass: 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/20',
    },
    rose: {
      bg: 'bg-[#F43F5E]/10',
      text: 'text-rose-700',
      border: 'border-[#F43F5E]/30',
      activeClass: 'bg-[#F43F5E] text-white shadow-md shadow-[#F43F5E]/20',
    },
  };

  const currentThemeColor = accentColors[theme];

  const menuItems = [
    { label: 'Dashboard Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Categories', icon: Layers, path: '/admin/categories' },
    { label: 'Product Catalog', icon: Package, path: '/admin/products' },
    { label: 'Media Vault', icon: Folder, path: '/admin/media' },
    { label: 'Order Fulfilment', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Client Manager', icon: Users, path: '/admin/customers' },
    { label: 'Super Admin CMS', icon: Sliders, path: '/admin/cms' },
    { label: 'Marketing & Promos', icon: Megaphone, path: '/admin/marketing' },
    { label: 'Analytics Reports', icon: BarChart3, path: '/admin/analytics' },
    { label: 'System Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 h-screen sticky top-0 shrink-0 text-slate-800 font-display shadow-sm z-20">
      <div className="space-y-6">
        
        {/* Admin Brand Badge */}
        <div className={`p-3.5 rounded-2xl ${currentThemeColor.bg} border ${currentThemeColor.border} flex items-center gap-3 transition-colors duration-300`}>
          <Zap className={`w-6 h-6 ${currentThemeColor.text} shrink-0`} />
          <div>
            <h2 className={`font-display font-bold text-sm ${currentThemeColor.text}`}>EARCRAFT Audio</h2>
            <p className="text-[10px] text-slate-500 font-mono font-medium">Control Hub v2.0</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? `${currentThemeColor.activeClass} font-bold shadow-lg`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Back to Storefront */}
      <div className="pt-4 border-t border-slate-200">
        <Link
          to="/"
          className={`flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Storefront
        </Link>
      </div>
    </aside>
  );
};
