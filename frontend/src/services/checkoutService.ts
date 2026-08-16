import { Product, ProductVariant, CartItem, Coupon } from '../types';
import { buildWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsappConfig';

export interface WhatsAppCheckoutResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const checkoutService = {
  /**
   * Generates a WhatsApp message for a single product (Buy Now flow) and triggers redirect.
   */
  buyNowWhatsApp(product: Product, variant: ProductVariant, quantity: number = 1): WhatsAppCheckoutResult {
    try {
      if (!product || !variant) {
        return { success: false, error: 'Product or variant details are missing.' };
      }

      if (quantity <= 0) {
        return { success: false, error: 'Please select a valid quantity.' };
      }

      if (!WHATSAPP_CONFIG.phoneNumber) {
        return { success: false, error: 'EarCraft WhatsApp contact number is not configured.' };
      }

      const price = variant.price || product.base_price;
      const formattedPrice = price.toLocaleString('en-IN');

      const message = [
        `Hi EarCraft! 👋`,
        ``,
        `I would like to order:`,
        ``,
        `Product: ${product.title}`,
        `Quantity: ${quantity}`,
        `Price: ₹${formattedPrice}`,
        ``,
        `Please confirm my order.`
      ].join('\n');

      const url = buildWhatsAppUrl(message);
      
      // Open WhatsApp Web/App in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');

      return { success: true, url };
    } catch (err) {
      console.error('Error generating WhatsApp Buy Now link:', err);
      return { success: false, error: 'Failed to initiate WhatsApp checkout. Please try again.' };
    }
  },

  /**
   * Generates a WhatsApp message for all items currently in the cart and triggers redirect.
   */
  cartCheckoutWhatsApp(items: CartItem[], appliedCoupon?: Coupon | null): WhatsAppCheckoutResult {
    try {
      if (!items || items.length === 0) {
        return { success: false, error: 'Your cart is empty.' };
      }

      if (!WHATSAPP_CONFIG.phoneNumber) {
        return { success: false, error: 'EarCraft WhatsApp contact number is not configured.' };
      }

      let totalItems = 0;
      let rawSubtotal = 0;

      const orderLines = items.map((item, index) => {
        const itemPrice = item.variant?.price || item.product.base_price;
        const itemSubtotal = itemPrice * item.quantity;
        totalItems += item.quantity;
        rawSubtotal += itemSubtotal;

        return [
          `${index + 1}. ${item.product.title}`,
          `Quantity: ${item.quantity}`,
          `Price: ₹${itemPrice.toLocaleString('en-IN')}`,
          `Subtotal: ₹${itemSubtotal.toLocaleString('en-IN')}`
        ].join('\n');
      });

      let discount = 0;
      if (appliedCoupon) {
        if (appliedCoupon.discount_type === 'PERCENTAGE') {
          discount = (rawSubtotal * appliedCoupon.discount_value) / 100;
          if (appliedCoupon.max_discount_amount) {
            discount = Math.min(discount, appliedCoupon.max_discount_amount);
          }
        } else {
          discount = appliedCoupon.discount_value;
        }
      }

      const finalAmount = Math.max(0, rawSubtotal - discount);

      const messageParts = [
        `Hi EarCraft! 👋`,
        ``,
        `I would like to place an order.`,
        ``,
        `ORDER DETAILS`,
        `━━━━━━━━━━━━━━━━`,
        ``,
        orderLines.join('\n\n'),
        ``,
        `━━━━━━━━━━━━━━━━`,
        ``,
        `Total Items: ${totalItems}`,
      ];

      if (discount > 0 && appliedCoupon) {
        messageParts.push(`Subtotal: ₹${rawSubtotal.toLocaleString('en-IN')}`);
        messageParts.push(`Discount (${appliedCoupon.code}): -₹${discount.toLocaleString('en-IN')}`);
      }

      messageParts.push(`Total Amount: ₹${finalAmount.toLocaleString('en-IN')}`);
      messageParts.push(``);
      messageParts.push(`Please confirm my order.`);
      messageParts.push(``);
      messageParts.push(`Thank you!`);

      const message = messageParts.join('\n');
      const url = buildWhatsAppUrl(message);

      // Open WhatsApp Web/App in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');

      return { success: true, url };
    } catch (err) {
      console.error('Error generating WhatsApp Cart Checkout link:', err);
      return { success: false, error: 'Failed to initiate WhatsApp checkout. Please try again.' };
    }
  },

  /**
   * Future Payment Gateway Integrations
   * The checkout service is structured so Razorpay, Stripe, or COD can easily be enabled.
   */
  async razorpayCheckout(): Promise<void> {
    throw new Error('Razorpay checkout is currently replaced by temporary WhatsApp ordering system.');
  },

  async stripeCheckout(): Promise<void> {
    throw new Error('Stripe checkout is currently replaced by temporary WhatsApp ordering system.');
  }
};
