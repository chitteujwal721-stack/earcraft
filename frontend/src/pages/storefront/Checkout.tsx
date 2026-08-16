import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearCart } from '../../store/cartSlice';
import { ShieldCheck, CreditCard, Lock, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { checkoutService } from '../../services/checkoutService';

export const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, appliedCoupon } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);

  const [paymentMethod, setPaymentMethod] = useState<'WHATSAPP' | 'RAZORPAY' | 'STRIPE' | 'COD'>('WHATSAPP');
  const [formData, setFormData] = useState({
    name: user ? `${user.first_name} ${user.last_name}` : 'Victoria Sterling',
    email: user ? user.email : 'victoria@sterlingluxe.com',
    phone: user?.phone || '+91 98765 43210',
    street: 'Penthouse A, Palladium Towers, High Street Phoenix',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postal_code: '400013',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrderNum, setCreatedOrderNum] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount_type === 'PERCENTAGE') {
      discount = (subtotal * appliedCoupon.discount_value) / 100;
    } else {
      discount = appliedCoupon.discount_value;
    }
  }

  const shippingFee = subtotal > 15000 ? 0 : 500;
  const taxAmount = Math.round((subtotal - discount) * 0.18); // 18% GST Electronics
  const grandTotal = subtotal - discount + shippingFee + taxAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');

    if (items.length === 0) {
      setCheckoutError('Your cart is empty.');
      return;
    }

    if (paymentMethod === 'WHATSAPP') {
      const res = checkoutService.cartCheckoutWhatsApp(items, appliedCoupon);
      if (!res.success && res.error) {
        setCheckoutError(res.error);
        return;
      }
      const orderNum = `EC-WA-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedOrderNum(orderNum);
      setOrderComplete(true);
      dispatch(clearCart());
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        const orderNum = `EC-AUDIO-${Math.floor(1000 + Math.random() * 9000)}`;
        setCreatedOrderNum(orderNum);
        setIsProcessing(false);
        setOrderComplete(true);
        dispatch(clearCart());
      }, 1500);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 bg-[#F6F7F9] text-[#111111]">
        <div className="w-16 h-16 bg-[#F6F7F9] border border-[#E5E7EB] rounded-full flex items-center justify-center mx-auto text-[#6B7280]">
          <ShoppingBag className="w-8 h-8 text-[#6D5EF6]" />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-[#111111]">Your cart is empty.</h1>
        <p className="text-xs text-[#6B7280] max-w-md mx-auto">
          Add luxury acoustic products to your cart before proceeding to order.
        </p>
        <div className="pt-4">
          <Link
            to="/shop"
            className="bg-[#111111] hover:bg-[#6D5EF6] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 font-display shadow-lg transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 bg-[#F6F7F9] text-[#111111]">
        <div className="w-16 h-16 bg-[#25D366]/10 border border-[#25D366] rounded-full flex items-center justify-center mx-auto text-[#25D366] luxury-shadow">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-[#111111]">WhatsApp Order Requested!</h1>
        <p className="text-xs text-[#6B7280] max-w-md mx-auto">
          Order Request <span className="font-mono text-[#6D5EF6] font-bold">{createdOrderNum}</span> has been sent via WhatsApp. EarCraft will confirm your order manually.
        </p>

        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] luxury-shadow text-left text-xs space-y-3 max-w-md mx-auto font-display">
          <div className="flex justify-between text-[#6B7280]">
            <span>Customer:</span>
            <span className="text-[#111111] font-bold">{formData.name}</span>
          </div>
          <div className="flex justify-between text-[#6B7280]">
            <span>Order Reference:</span>
            <span className="text-[#6D5EF6] font-mono font-bold">{createdOrderNum}</span>
          </div>
          <div className="flex justify-between text-[#6B7280]">
            <span>Order Status:</span>
            <span className="text-amber-600 font-bold uppercase">Pending WhatsApp Confirmation</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/shop"
            className="bg-[#111111] hover:bg-[#6D5EF6] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 font-display shadow-lg transition-all"
          >
            <span>Continue Shopping</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#F6F7F9] text-[#111111]">
      
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Fast & Direct WhatsApp Ordering</span>
        <h1 className="font-display text-4xl font-extrabold text-[#111111]">Complete Your EarCraft Order</h1>
      </div>

      {checkoutError && (
        <div className="max-w-xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-display text-center font-bold">
          {checkoutError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-6">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-[#111111] mb-4">1. Delivery Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-display">
                <div>
                  <label className="block text-[#6B7280] font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-[#6B7280] font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#6B7280] font-bold mb-1">Street Address / Penthouse</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-[#6B7280] font-bold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-[#6B7280] font-bold mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111] focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] pt-6">
              <h3 className="font-display text-lg font-bold text-[#111111] mb-4">2. Select Payment Option</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('WHATSAPP')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'WHATSAPP'
                      ? 'border-[#25D366] bg-[#25D366]/5 text-[#111111] font-bold'
                      : 'border-[#E5E7EB] bg-[#F6F7F9] text-[#6B7280]'
                  }`}
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366] mb-2" />
                  <div>
                    <span className="text-xs font-display font-bold text-[#111111] block">Order on WhatsApp</span>
                    <span className="text-[10px] text-[#6B7280] block mt-0.5">Instant order confirmation via WhatsApp</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#6D5EF6] bg-white text-[#111111] violet-shadow-sm font-bold'
                      : 'border-[#E5E7EB] bg-[#F6F7F9] text-[#6B7280]'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-[#6D5EF6] mb-2" />
                  <div>
                    <span className="text-xs font-display font-bold text-[#111111] block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#6B7280] block mt-0.5">Pay upon delivery verification</span>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || items.length === 0}
              className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl font-display flex items-center justify-center gap-2 ${
                paymentMethod === 'WHATSAPP'
                  ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white'
                  : 'bg-[#111111] hover:bg-[#6D5EF6] text-white'
              }`}
            >
              {paymentMethod === 'WHATSAPP' ? (
                <>
                  <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                  <span>Proceed to Order on WhatsApp</span>
                </>
              ) : isProcessing ? (
                'Processing Order...'
              ) : (
                `Place Order ₹${grandTotal.toLocaleString()}`
              )}
            </button>
          </form>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-6 h-fit font-display">
          <h3 className="text-lg font-bold text-[#111111] border-b border-[#E5E7EB] pb-4">Order Summary</h3>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.product.images[0]?.url} alt={item.product.title} className="w-14 h-14 object-contain rounded-xl bg-[#F6F7F9] p-1 border border-[#E5E7EB]" />
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-[#111111] line-clamp-1">{item.product.title}</h4>
                  <p className="text-[#6B7280]">{item.variant.name} × {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-[#111111]">₹{(item.variant.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E7EB] pt-4 space-y-2 text-xs text-[#6B7280]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#6D5EF6]">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST Electronics (18%)</span>
              <span>₹{taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Air Express</span>
              <span>{shippingFee === 0 ? 'FREE' : '₹500'}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#111111] pt-3 border-t border-[#E5E7EB]">
              <span>Grand Total</span>
              <span className="text-[#6D5EF6]">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
