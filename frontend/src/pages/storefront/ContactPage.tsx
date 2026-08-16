import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useAppSelector(state => state.cms);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#F6F7F9] text-[#111111]">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Client Support & Concierge</span>
        <h1 className="font-display text-4xl font-extrabold text-[#111111]">Contact EarCraft Audio Labs</h1>
        <p className="text-xs text-[#6B7280]">Connect with our acoustic specialists for product consultations, corporate orders, or order support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-6">
            <h3 className="font-display text-xl font-bold text-[#111111]">Acoustic Headquarters</h3>
            
            <div className="space-y-4 text-xs font-display">
              <div className="flex items-start gap-3 text-[#6B7280]">
                <MapPin className="w-5 h-5 text-[#6D5EF6] shrink-0" />
                <span className="text-[#111111]">{settings.address}</span>
              </div>
              <div className="flex items-center gap-3 text-[#6B7280]">
                <Mail className="w-5 h-5 text-[#6D5EF6] shrink-0" />
                <span className="font-mono text-[#111111]">{settings.contact_email}</span>
              </div>
              <div className="flex items-center gap-3 text-[#6B7280]">
                <Phone className="w-5 h-5 text-[#6D5EF6] shrink-0" />
                <span className="font-mono text-[#111111]">{settings.contact_phone}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E5E7EB] text-xs text-[#6D5EF6] space-y-1 font-display">
              <p className="font-bold flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Concierge Support Hours</p>
              <p className="text-[11px] text-[#6B7280]">Monday — Saturday: 9:00 AM – 8:00 PM GMT / IST</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-6 font-display">
            <h3 className="text-xl font-bold text-[#111111]">Send Concierge Message</h3>
            
            {submitted ? (
              <div className="p-8 bg-[#6D5EF6]/10 border border-[#6D5EF6]/30 rounded-2xl text-center space-y-2">
                <Sparkles className="w-8 h-8 text-[#6D5EF6] mx-auto animate-pulse" />
                <h4 className="font-display text-lg font-bold text-[#6D5EF6]">Message Received</h4>
                <p className="text-xs text-[#6B7280]">An audio specialist will respond to your inquiry within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Victoria Sterling"
                      className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="victoria@example.com"
                      className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B7280] mb-1">Inquiry Topic</label>
                  <select className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#6D5EF6]">
                    <option>Crafted Series Advice</option>
                    <option>Unisex Series Selection</option>
                    <option>Insured Shipment Inquiry</option>
                    <option>Corporate & Press Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B7280] mb-1">Your Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can assist you..."
                    className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-[#6D5EF6] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all w-full shadow-lg"
                >
                  <Send className="w-4 h-4" /> Send Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
