import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockOrders } from '../../services/mockData';
import { Clock, Search } from 'lucide-react';

export const TrackOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrder = searchParams.get('order') || 'EC-AUDIO-8891';

  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [currentOrder, setCurrentOrder] = useState(mockOrders[0]);

  useEffect(() => {
    const found = mockOrders.find(o => o.order_number.toUpperCase() === orderNumber.trim().toUpperCase());
    if (found) {
      setCurrentOrder(found);
    }
  }, [orderNumber]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 bg-[#F6F7F9] text-[#111111]">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Live Logistics</span>
        <h1 className="font-display text-4xl font-extrabold text-[#111111]">Track Shipment Status</h1>
        <p className="text-xs text-[#6B7280]">Enter your EarCraft order reference (e.g. EC-AUDIO-8891) to view insured transit progress.</p>
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] luxury-shadow max-w-lg mx-auto flex items-center gap-3">
        <Search className="w-5 h-5 text-[#6D5EF6] shrink-0" />
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Order Number (e.g. EC-AUDIO-8891)"
          className="w-full bg-transparent text-sm text-[#111111] placeholder-[#6B7280] focus:outline-none font-mono uppercase"
        />
      </div>

      {/* Tracking Details */}
      {currentOrder && (
        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
            <div>
              <span className="text-xs text-[#6B7280] font-display">Order Reference</span>
              <h3 className="font-display text-2xl font-bold text-[#6D5EF6] font-mono">{currentOrder.order_number}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#6B7280] font-display">Insured Courier Partner</span>
              <p className="text-xs font-bold text-[#111111]">{currentOrder.courier_partner}</p>
              <p className="text-[11px] font-mono text-[#6B7280]">Tracking: {currentOrder.tracking_number}</p>
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="relative pt-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              {['PENDING', 'PROCESSING', 'PACKED', 'SHIPPED'].map((st, idx) => {
                const isCompleted = idx <= 3;
                return (
                  <div key={st} className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isCompleted ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md' : 'bg-[#F6F7F9] text-[#6B7280] border-[#E5E7EB]'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-xs font-bold font-display text-[#111111]">{st}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Log List */}
          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <h4 className="text-xs uppercase font-bold text-[#6D5EF6] tracking-wider font-display">Logistics Activity Log</h4>
            <div className="space-y-3 text-xs">
              {currentOrder.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F7F9] border border-[#E5E7EB]">
                  <Clock className="w-4 h-4 text-[#6D5EF6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111111] font-display">{event.status}</span>
                    <p className="text-[#6B7280] text-[11px]">{event.note}</p>
                    <span className="text-[10px] text-[#6B7280] font-mono">{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
