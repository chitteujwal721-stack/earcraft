import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, DollarSign, PieChart } from 'lucide-react';

const categoryData = [
  { category: 'Artisanal Earrings', sales: 640000 },
  { category: 'Bespoke Ear Cuffs', sales: 490000 },
  { category: 'Piercing Jewelry', sales: 240000 },
  { category: 'Limited Releases', sales: 112900 },
];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 font-display text-slate-900">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Deep Financial Analytics & Tax Reports</h1>
          <p className="text-xs text-slate-500 mt-1">Category revenue breakdown, GST tax collections, and inventory turnover ratios.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Revenue Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#6D5EF6]" /> Category Gross Breakdown
          </h3>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="category" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#6D5EF6', borderRadius: '12px', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="sales" fill="#6D5EF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GST Tax Summary Box */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#6D5EF6]" /> GST Tax Compliance Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <span className="text-slate-600 font-medium">Total Tax Collected (3% GST):</span>
              <span className="font-mono font-bold text-[#6D5EF6] text-sm">₹44,487</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <span className="text-slate-600 font-medium">HSN Code 71131910 Total:</span>
              <span className="font-mono font-bold text-slate-800 text-sm">₹1,130,000</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <span className="text-slate-600 font-medium">HSN Code 71171990 Total:</span>
              <span className="font-mono font-bold text-slate-800 text-sm">₹352,900</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
