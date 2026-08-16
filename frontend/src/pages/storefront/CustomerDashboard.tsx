import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { mockOrders } from '../../services/mockData';
import { User, Package, Heart, MapPin, LogOut, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F6F7F9] text-[#111111]">
      
      {/* User Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] luxury-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#6D5EF6]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-[#111111]">{user?.first_name} {user?.last_name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#6D5EF6]/10 text-[#6D5EF6] border border-[#6D5EF6]/30">
                EarCraft VIP Member
              </span>
            </div>
            <p className="text-xs text-[#6B7280] font-mono mt-0.5">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 text-xs font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors w-fit font-display"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] luxury-shadow space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-display ${
              activeTab === 'orders' ? 'bg-[#111111] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#F6F7F9]'
            }`}
          >
            <Package className="w-4 h-4 text-[#6D5EF6]" /> Orders & Invoices
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-display ${
              activeTab === 'wishlist' ? 'bg-[#111111] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#F6F7F9]'
            }`}
          >
            <Heart className="w-4 h-4 text-[#6D5EF6]" /> Wishlist ({wishlistItems.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-display ${
              activeTab === 'addresses' ? 'bg-[#111111] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#F6F7F9]'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#6D5EF6]" /> Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-display ${
              activeTab === 'profile' ? 'bg-[#111111] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#F6F7F9]'
            }`}
          >
            <User className="w-4 h-4 text-[#6D5EF6]" /> Profile Settings
          </button>
        </div>

        {/* Tab View Container */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-[#111111]">Order History & Invoices</h3>
              {mockOrders.map((ord) => (
                <div key={ord.id} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] luxury-shadow space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-4">
                    <div>
                      <span className="text-xs text-[#6D5EF6] font-mono font-bold">{ord.order_number}</span>
                      <p className="text-xs text-[#6B7280]">Placed on {new Date(ord.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {ord.status}
                      </span>
                      <button className="flex items-center gap-1 text-xs font-bold text-[#6D5EF6] border border-[#6D5EF6]/30 px-3.5 py-1 rounded-full hover:bg-[#6D5EF6]/10 font-display">
                        <Download className="w-3.5 h-3.5" /> PDF Invoice
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {ord.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 text-xs">
                        <img src={item.image} alt={item.product_title} className="w-12 h-12 object-contain rounded-xl bg-[#F6F7F9] p-1 border border-[#E5E7EB]" />
                        <div className="flex-1">
                          <p className="font-display font-bold text-[#111111]">{item.product_title}</p>
                          <p className="text-[#6B7280]">{item.variant_name} (x{item.quantity})</p>
                        </div>
                        <span className="font-bold text-[#111111] font-display">₹{item.subtotal.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB] flex justify-between items-center text-xs">
                    <span className="text-[#6B7280]">Courier Tracking: <strong className="text-[#111111] font-mono">{ord.tracking_number}</strong></span>
                    <Link to={`/track-order?order=${ord.order_number}`} className="text-[#6D5EF6] font-bold hover:underline font-display">
                      Live Track Shipment →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-[#111111]">Your Saved Audio Products</h3>
              {wishlistItems.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-[#E5E7EB] text-center text-[#6B7280] font-display luxury-shadow">
                  Your wishlist is empty.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistItems.map((prod) => (
                    <div key={prod.id} className="bg-white p-4 rounded-2xl border border-[#E5E7EB] luxury-shadow flex gap-4 items-center">
                      <img src={prod.images[0]?.url} alt={prod.title} className="w-20 h-20 object-contain rounded-xl bg-[#F6F7F9] p-1 border border-[#E5E7EB]" />
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#111111]">{prod.title}</h4>
                        <p className="text-xs text-[#6D5EF6] font-bold mt-1 font-display">₹{prod.base_price.toLocaleString()}</p>
                        <Link to={`/product/${prod.slug}`} className="inline-block text-xs font-semibold text-[#6D5EF6] underline mt-2 font-display">
                          View Item Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
