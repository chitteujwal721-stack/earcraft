import React, { useState } from 'react';
import { mockCoupons } from '../../services/mockData';
import { Coupon } from '../../types';
import { Tag, Plus, Trash2, Megaphone, Gift, Send } from 'lucide-react';

export const Marketing: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [newCode, setNewCode] = useState('');
  const [newVal, setNewVal] = useState(15);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    const c: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCode.toUpperCase(),
      discount_type: 'PERCENTAGE',
      discount_value: newVal,
      min_order_amount: 15000,
      expiry_date: '2026-12-31',
      is_active: true,
    };
    setCoupons([c, ...coupons]);
    setNewCode('');
  };

  return (
    <div className="space-y-8 font-display text-slate-900">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Marketing & Campaign Automation</h1>
          <p className="text-xs text-slate-500 mt-1">Coupon codes, referral loyalty points, abandoned cart recovery dispatches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Create & Manage Coupons */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#6D5EF6]" /> Active Promo Coupons
          </h3>

          <form onSubmit={handleAddCoupon} className="flex gap-3 text-xs font-display">
            <input
              type="text"
              required
              placeholder="Coupon Code (e.g. VIP2026)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 uppercase focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
            />
            <input
              type="number"
              required
              placeholder="Discount %"
              value={newVal}
              onChange={(e) => setNewVal(Number(e.target.value))}
              className="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
            />
            <button
              type="submit"
              className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors"
            >
              Add Coupon
            </button>
          </form>

          <div className="space-y-3">
            {coupons.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs hover:border-slate-300 transition-colors">
                <div>
                  <span className="font-bold text-[#6D5EF6] text-sm font-mono">{c.code}</span>
                  <p className="text-slate-500 mt-0.5 font-medium">
                    {c.discount_type === 'PERCENTAGE' ? `${c.discount_value}% Off` : `₹${c.discount_value} Flat Off`} — Min Order: ₹{c.min_order_amount.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setCoupons(coupons.filter(x => x.id !== c.id))}
                  className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Abandoned Cart & Email Campaigns */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#6D5EF6]" /> Abandoned Cart Recovery
          </h3>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <p className="font-bold text-slate-900 text-sm">14 Abandoned Vault Carts Detected</p>
            <p className="text-slate-500">Total Potential Recoverable Revenue: <strong className="text-[#6D5EF6] font-extrabold text-sm">₹348,000</strong></p>
            <button
              onClick={() => alert('Sending automated email VIP invitations...')}
              className="w-full bg-[#6D5EF6] hover:bg-[#5847E4] text-white py-3 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-2"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Recovery Campaign
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
