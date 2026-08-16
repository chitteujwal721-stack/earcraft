import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Lock, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [rateLimit, setRateLimit] = useState(100);
  const [csrfEnabled, setCsrfEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl font-display text-slate-900">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">System Security & RBAC Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure role-based access control, API rate limiting, and JWT security keys.</p>
        </div>
        {saved && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> System Policy Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Security & RBAC */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#6D5EF6]" /> RBAC Permission Matrix
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 text-sm">Super Admin</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Unrestricted full control over CMS, theme, payments, and users.</p>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-[10px]">FULL ACCESS</span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 text-sm">Store Manager</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Can manage product SKUs, inventory, and order fulfillment.</p>
              </div>
              <span className="text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md text-[10px]">OPERATIONAL</span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 text-sm">Content Editor</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Can edit blog journal articles and product descriptions.</p>
              </div>
              <span className="text-slate-600 font-bold bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-[10px]">LIMITED CMS</span>
            </div>
          </div>
        </div>

        {/* API Protection Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#6D5EF6]" /> API Rate Limiting & Protection
          </h3>

          <div className="space-y-4 text-xs font-display">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Max Requests per Minute / IP</label>
              <input
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={csrfEnabled}
                onChange={(e) => setCsrfEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#6D5EF6] rounded cursor-pointer"
              />
              <span className="text-slate-800 font-semibold">Enforce Double-Submit Cookie CSRF Token Protection</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#6D5EF6] hover:bg-[#5847E4] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Save className="w-4 h-4" /> Save Security Policies
        </button>

      </form>

    </div>
  );
};
