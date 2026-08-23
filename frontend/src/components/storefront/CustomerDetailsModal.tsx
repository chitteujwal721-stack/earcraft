import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Building2, Navigation, Send } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { CustomerDetails, getSavedCustomerDetails, saveCustomerDetails } from '../../services/checkoutService';
import { useAppSelector } from '../../store/hooks';

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: CustomerDetails) => void;
  title?: string;
  subtitle?: string;
  orderSummary?: {
    totalAmount: number;
    itemCount?: number;
    title?: string;
  };
  isSubmitting?: boolean;
}

export const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delivery & Contact Details',
  subtitle = 'Please provide your address details for fast WhatsApp order confirmation.',
  orderSummary,
  isSubmitting = false,
}) => {
  const { user } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedCustomerDetails();
      setFormData({
        name: saved.name || (user ? `${user.first_name} ${user.last_name}`.trim() : ''),
        phone: saved.phone || user?.phone || '',
        address: saved.address || '',
        city: saved.city || '',
        district: saved.district || '',
        state: saved.state || '',
        pincode: saved.pincode || '',
      });
      setFormError('');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      saveCustomerDetails(updated);
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter your full name (NAME).');
      return;
    }
    if (!formData.phone?.trim()) {
      setFormError('Please enter your phone number.');
      return;
    }
    if (!formData.address.trim()) {
      setFormError('Please enter your delivery address (ADDESS).');
      return;
    }
    if (!formData.city.trim()) {
      setFormError('Please enter your city (CITY).');
      return;
    }
    if (!formData.district.trim()) {
      setFormError('Please enter your district (DISTRICT).');
      return;
    }
    if (!formData.state.trim()) {
      setFormError('Please enter your state (STATE).');
      return;
    }
    if (!formData.pincode.trim()) {
      setFormError('Please enter your 6-digit postal pincode (PINCODE).');
      return;
    }

    saveCustomerDetails(formData);
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5E7EB] z-10 animate-in fade-in zoom-in-95 duration-200 text-[#111111] font-display">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B7280] hover:text-[#111111] hover:bg-[#F6F7F9] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 mb-6 pr-8">
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#25D366]">
              WhatsApp Direct Order
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
            {title}
          </h2>
          <p className="text-xs text-[#6B7280]">
            {subtitle}
          </p>
        </div>

        {/* Order Summary badge if provided */}
        {orderSummary && (
          <div className="mb-5 p-3.5 bg-[#F6F7F9] border border-[#E5E7EB] rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[#6B7280] block text-[11px]">
                {orderSummary.title || `${orderSummary.itemCount || 1} Item(s)`}
              </span>
              <span className="font-bold text-[#111111]">
                Order Total
              </span>
            </div>
            <span className="font-extrabold text-[#6D5EF6] text-base">
              ₹{orderSummary.totalAmount.toLocaleString()}
            </span>
          </div>
        )}

        {/* Error Notification */}
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
            {formError}
          </div>
        )}

        {/* Address & Customer Details Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* NAME */}
            <div>
              <label className="block text-[#111111] font-bold mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6D5EF6]" />
                NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-[#111111] font-bold mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#6D5EF6]" />
                PHONE *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-[#111111] font-bold mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#6D5EF6]" />
              ADDESS / FLAT / STREET *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Flat 402, Royal Palms, 5th Main Road"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* CITY */}
            <div>
              <label className="block text-[#111111] font-bold mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#6D5EF6]" />
                CITY *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
              />
            </div>

            {/* DISTRICT */}
            <div>
              <label className="block text-[#111111] font-bold mb-1 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#6D5EF6]" />
                DISTRICT *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai Suburban"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* STATE */}
            <div>
              <label className="block text-[#111111] font-bold mb-1">
                STATE *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maharashtra"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
              />
            </div>

            {/* PINCODE */}
            <div>
              <label className="block text-[#111111] font-bold mb-1">
                PINCODE *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="e.g. 400013"
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6D5EF6] focus:bg-white transition-all font-display"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl font-display"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Proceed to Order on WhatsApp</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <p className="text-[10px] text-center text-[#6B7280] pt-1">
            We will format your order with delivery details directly into WhatsApp for instant confirmation.
          </p>
        </form>

      </div>
    </div>
  );
};
