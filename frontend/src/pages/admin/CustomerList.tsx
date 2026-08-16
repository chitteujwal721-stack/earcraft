import React, { useState } from 'react';
import { Users, Search, UserCheck, UserX, Mail, ShieldAlert } from 'lucide-react';

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState([
    { id: 'c-1', name: 'Victoria Sterling', email: 'victoria@sterlingluxe.com', ordersCount: 4, totalSpent: 89400, isVIP: true, isActive: true },
    { id: 'c-2', name: 'Elena Rostova', email: 'elena.r@luxury.fr', ordersCount: 2, totalSpent: 49800, isVIP: true, isActive: true },
    { id: 'c-3', name: 'Marcus Vance', email: 'marcus@vance.io', ordersCount: 1, totalSpent: 24900, isVIP: false, isActive: true },
  ]);

  const [search, setSearch] = useState('');

  const toggleStatus = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 font-display text-slate-900">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Customer & VIP Collector Management</h1>
          <p className="text-xs text-slate-500 mt-1">View customer lifetime value (LTV), total orders, notes, and account activation states.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-[#6D5EF6] font-display font-bold uppercase tracking-widest text-[10px]">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Tier / VIP Status</th>
              <th className="p-4">Orders Placed</th>
              <th className="p-4">Lifetime Spend (LTV)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 text-slate-800">
            {filtered.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900">
                  {cust.name}
                  <span className="block text-[10px] font-mono text-slate-400 font-normal">{cust.email}</span>
                </td>
                <td className="p-4">
                  {cust.isVIP ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                      VIP Gold
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold">Regular</span>
                  )}
                </td>
                <td className="p-4 font-bold text-slate-800">{cust.ordersCount} Orders</td>
                <td className="p-4 font-bold text-[#6D5EF6] text-sm">₹{cust.totalSpent.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md ${cust.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {cust.isActive ? 'Active' : 'Deactivated'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleStatus(cust.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                    title={cust.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {cust.isActive ? <UserX className="w-4 h-4 text-red-500" /> : <UserCheck className="w-4 h-4 text-emerald-600" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
