import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleCartDrawer, removeFromCart, updateQuantity, applyCoupon, removeCoupon } from '../../store/cartSlice';
import { X, Trash2, Plus, Minus, Tag, Sparkles, ShieldCheck } from 'lucide-react';
import { mockCoupons } from '../../services/mockData';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { checkoutService } from '../../services/checkoutService';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen, appliedCoupon } = useAppSelector(state => state.cart);
  const { settings } = useAppSelector(state => state.cms);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [cartError, setCartError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount_type === 'PERCENTAGE') {
      discount = (subtotal * appliedCoupon.discount_value) / 100;
      if (appliedCoupon.max_discount_amount) {
        discount = Math.min(discount, appliedCoupon.max_discount_amount);
      }
    } else {
      discount = appliedCoupon.discount_value;
    }
  }

  const freeShippingThreshold = settings.free_shipping_threshold || 15000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const found = mockCoupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (found) {
      if (subtotal < found.min_order_amount) {
        setCouponError(`Minimum order amount of ₹${found.min_order_amount.toLocaleString()} required.`);
      } else {
        dispatch(applyCoupon(found));
        setCouponCode('');
      }
    } else {
      setCouponError('Invalid promo code. Try SHINE2026 or APEX5000');
    }
  };

  const handleProceedToOrder = () => {
    setCartError('');
    if (items.length === 0) {
      setCartError('Your cart is empty.');
      return;
    }
    const res = checkoutService.cartCheckoutWhatsApp(items, appliedCoupon);
    if (!res.success && res.error) {
      setCartError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => dispatch(toggleCartDrawer(false))}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#E5E7EB] text-[#111111] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2 font-display">
              <Sparkles className="w-5 h-5 text-[#6D5EF6]" />
              <h2 className="text-lg font-bold text-[#111111]">Your EarCraft Cart</h2>
            </div>
            <button
              onClick={() => dispatch(toggleCartDrawer(false))}
              className="p-1 hover:text-[#6D5EF6] transition-colors text-[#6B7280]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#F6F7F9] border-b border-[#E5E7EB]">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-[#6B7280]">
                Add <span className="font-bold text-[#6D5EF6]">₹{remainingForFreeShipping.toLocaleString()}</span> more for Complimentary Insured Express Delivery.
              </p>
            ) : (
              <p className="text-xs text-[#6D5EF6] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Unlocked Complimentary Express Insured Delivery!
              </p>
            )}
            <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#6D5EF6] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#6B7280] font-display space-y-3">
                <Sparkles className="w-12 h-12 text-[#E5E7EB] mx-auto animate-bounce" />
                <p className="text-base text-[#111111] font-bold">Your cart is empty.</p>
                <p className="text-xs text-[#6B7280] max-w-xs">Explore our Crafted Series and Unisex Series luxury audio products.</p>
                <Link
                  to="/shop"
                  onClick={() => dispatch(toggleCartDrawer(false))}
                  className="mt-4 bg-[#111111] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#6D5EF6] transition-colors shadow-md"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3.5 rounded-2xl bg-[#F6F7F9] border border-[#E5E7EB]">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-20 h-20 object-contain rounded-xl bg-white p-1 shrink-0 border border-[#E5E7EB]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-display font-bold text-[#111111] line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-[#6B7280] hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">{item.variant.name}</p>
                      <p className="text-xs font-bold text-[#6D5EF6] font-display mt-1">
                        ₹{item.variant.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#E5E7EB] rounded-lg bg-white">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="p-1 hover:text-[#6D5EF6] text-[#6B7280]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-[#111111] font-display">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="p-1 hover:text-[#6D5EF6] text-[#6B7280]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Input Section */}
          {items.length > 0 && (
            <div className="px-6 py-3 border-t border-[#E5E7EB] bg-[#F6F7F9]">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#6D5EF6]/10 border border-[#6D5EF6]/30 rounded-xl text-xs">
                  <span className="text-[#6D5EF6] font-semibold flex items-center gap-1 font-display">
                    <Tag className="w-3.5 h-3.5" /> Promo Code: {appliedCoupon.code}
                  </span>
                  <button
                    onClick={() => dispatch(removeCoupon())}
                    className="text-[#6B7280] hover:text-red-500 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code (e.g. SHINE2026)"
                    className="flex-1 bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] placeholder-[#6B7280] focus:outline-none focus:border-[#6D5EF6] uppercase font-display"
                  />
                  <button
                    type="submit"
                    className="bg-[#111111] hover:bg-[#6D5EF6] text-white px-4 py-2 rounded-xl text-xs font-semibold font-display transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
            </div>
          )}

          {/* Cart Subtotal Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5E7EB] bg-[#FFFFFF] space-y-3 font-display">
              <div className="flex justify-between text-xs text-[#6B7280]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-[#6D5EF6]">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-[#6B7280]">
                <span>Insured Express Delivery</span>
                <span>{remainingForFreeShipping === 0 ? 'FREE' : '₹500'}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#111111] pt-2 border-t border-[#E5E7EB]">
                <span>Total Amount</span>
                <span className="text-[#6D5EF6]">
                  ₹{(subtotal - discount + (remainingForFreeShipping === 0 ? 0 : 500)).toLocaleString()}
                </span>
              </div>

              {cartError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-display">
                  {cartError}
                </div>
              )}

              <button
                onClick={handleProceedToOrder}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-4 shadow-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Proceed to Order on WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
