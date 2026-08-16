import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockOrders, mockProducts } from '../../services/mockData';
import { Category } from '../../types';
import { apiService } from '../../services/apiService';

const chartData = [
  { month: 'Jan', revenue: 240000, orders: 45 },
  { month: 'Feb', revenue: 310000, orders: 58 },
  { month: 'Mar', revenue: 480000, orders: 92 },
  { month: 'Apr', revenue: 620000, orders: 115 },
  { month: 'May', revenue: 790000, orders: 140 },
  { month: 'Jun', revenue: 1150000, orders: 210 },
  { month: 'Jul', revenue: 1482900, orders: 284 },
];

export const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    apiService.getCategories().then(setCategories).catch(err => console.error('Dashboard categories fetch error:', err));
  }, []);

  return (
    <div className="space-y-8 font-display text-slate-900">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Audio SaaS Analytics Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time earbud sales revenue, category distribution, and logistics fulfillment.</p>
        </div>
        <span className="text-xs font-mono font-bold text-[#6D5EF6] bg-[#6D5EF6]/10 border border-[#6D5EF6]/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#6D5EF6]" /> Live Audio Dynamics Active
        </span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-[#6D5EF6]" />
          </div>
          <p className="text-3xl font-extrabold text-[#6D5EF6]">₹1,482,900</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +28.4% vs last month
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Orders Fulfilled</span>
            <ShoppingBag className="w-4 h-4 text-[#6D5EF6]" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">284</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% order velocity
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Categories</span>
            <Layers className="w-4 h-4 text-[#6D5EF6]" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{categories.length}</p>
          <span className="text-[11px] text-[#6D5EF6] font-bold">Dynamic DB Categories</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Store Conversion Rate</span>
            <Users className="w-4 h-4 text-[#6D5EF6]" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">4.85%</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Top 1% Audio Brand
          </span>
        </div>

      </div>

      {/* DYNAMIC CATEGORY BREAKDOWN STATS SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Layers size={18} className="text-[#6D5EF6]" />
            <h3 className="text-base font-bold text-slate-900">Category Statistics & Dynamic Product Breakdown</h3>
          </div>
          <Link to="/admin/categories" className="text-xs font-bold text-[#6D5EF6] hover:underline flex items-center space-x-1">
            <span>Manage Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Categories</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{categories.length}</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categorized Products</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {categories.reduce((acc, c) => acc + (c.product_count || 0), 0)}
            </p>
          </div>

          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/admin/categories/${cat.id}/products`}
              className="p-4 bg-white hover:bg-violet-50/50 border border-slate-200 hover:border-[#6D5EF6]/40 rounded-xl transition-all shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#6D5EF6]">{cat.name}</span>
                <span className="text-xs font-mono font-bold text-[#6D5EF6] bg-[#6D5EF6]/10 px-2 py-0.5 rounded">
                  {cat.product_count || 0} Products
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{cat.description || 'Category'}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">EarCraft Gross Revenue Growth (INR ₹)</h3>
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">2026 Fiscal Year</span>
        </div>
        
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6D5EF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6D5EF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#6D5EF6', borderRadius: '12px', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6D5EF6" strokeWidth={3} fillOpacity={1} fill="url(#purpleGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Recent Order Activity</h3>
            <span className="text-xs text-[#6D5EF6] font-semibold hover:underline cursor-pointer">View All Orders</span>
          </div>

          <div className="space-y-3">
            {mockOrders.map((ord) => (
              <div key={ord.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs hover:border-slate-300 transition-colors">
                <div>
                  <p className="font-bold text-slate-900 font-mono">{ord.order_number}</p>
                  <p className="text-slate-500 mt-0.5">{ord.customer_name} • {ord.items[0]?.product_title}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#6D5EF6] text-sm">₹{ord.grand_total.toLocaleString()}</span>
                  <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{ord.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Top Audio SKUs</h3>
            <span className="text-xs text-slate-500">By Volume</span>
          </div>

          <div className="space-y-3">
            {mockProducts.slice(0, 3).map((prod) => (
              <div key={prod.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-150">
                <div className="flex items-center gap-3">
                  <img src={prod.images[0]?.url} alt={prod.title} className="w-10 h-10 object-cover rounded-lg bg-slate-200" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{prod.title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">Rating: {prod.avg_rating} ★</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#6D5EF6]">₹{prod.base_price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

