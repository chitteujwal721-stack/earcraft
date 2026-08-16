import React, { useState } from 'react';
import { mockOrders } from '../../services/mockData';
import { Order, OrderStatus } from '../../types';
import { ShoppingBag, Printer, FileText, CheckCircle2, ChevronRight, Download } from 'lucide-react';

export const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0]);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          timeline: [...o.timeline, { status: newStatus, timestamp: new Date().toISOString(), note: `Updated to ${newStatus} by Admin` }]
        };
      }
      return o;
    }));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="space-y-6 font-display text-slate-900">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Order Fulfillment & Logistics</h1>
          <p className="text-xs text-slate-500 mt-1">Manage order statuses (Pending, Processing, Packed, Shipped, Delivered), print packing slips & PDF invoices.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Order Stream */}
        <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 h-fit">
          <h3 className="text-base font-bold text-slate-900 px-2 pt-1">Order Stream</h3>
          {orders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => setSelectedOrder(ord)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedOrder?.id === ord.id ? 'border-[#6D5EF6] bg-violet-50/80 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-bold text-slate-900 font-mono">{ord.order_number}</p>
                  <p className="text-slate-500 mt-0.5">{ord.customer_name}</p>
                </div>
                <span className="font-bold text-[#6D5EF6] text-sm">₹{ord.grand_total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 text-[11px]">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {ord.status}
                </span>
                <span className="text-slate-400 font-mono">{new Date(ord.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Detail & Status Controls */}
        {selectedOrder && (
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-[#6D5EF6] font-mono font-bold">{selectedOrder.order_number}</span>
                <h2 className="text-2xl font-bold text-slate-900">{selectedOrder.customer_name}</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Printing Packing Slip for ${selectedOrder.order_number}...`)}
                  className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" /> Packing Slip
                </button>
                <button
                  onClick={() => alert(`Downloading PDF Invoice for ${selectedOrder.order_number}...`)}
                  className="flex items-center gap-1.5 bg-[#6D5EF6] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#5847E4] shadow-md transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> PDF Invoice
                </button>
              </div>
            </div>

            {/* Change Order Status Dropdown */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-700 font-semibold">Update Status Pipeline:</span>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-[#6D5EF6] font-bold focus:outline-none focus:border-[#6D5EF6]"
              >
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="PACKED">PACKED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            {/* Order Items Table */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Ordered Items</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <img src={item.image} alt={item.product_title} className="w-10 h-10 object-cover rounded-lg bg-slate-200 border border-slate-200" />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{item.product_title}</p>
                      <p className="text-slate-500 text-[11px]">{item.variant_name} (x{item.quantity})</p>
                    </div>
                    <span className="font-bold text-[#6D5EF6] text-sm">₹{item.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Shipping Destination</h4>
              <p className="text-slate-800 font-semibold">{selectedOrder.shipping_address.street}</p>
              <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} — {selectedOrder.shipping_address.postal_code}</p>
              <p className="font-mono pt-1 text-[#6D5EF6] font-bold">Contact: {selectedOrder.customer_phone}</p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
