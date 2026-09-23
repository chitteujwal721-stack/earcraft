import { Product, ProductVariant, CartItem, Coupon } from '../types';
import { buildWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsappConfig';

export interface WhatsAppCheckoutResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface CustomerDetails {
  name: string;
  phone?: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export const getSavedCustomerDetails = (): CustomerDetails => {
  try {
    const saved = localStorage.getItem('earcraft_customer_details');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading saved customer details:', e);
  }
  return {
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  };
};

export const saveCustomerDetails = (details: CustomerDetails): void => {
  try {
    localStorage.setItem('earcraft_customer_details', JSON.stringify(details));
  } catch (e) {
    console.error('Error saving customer details:', e);
  }
};

export const checkoutService = {
  /**
   * Generates a WhatsApp message for a single product (Buy Now flow) and triggers redirect.
   */
  buyNowWhatsApp(
    product: Product,
    variant: ProductVariant,
    quantity: number = 1,
    customer?: CustomerDetails,
    appliedCoupon?: Coupon | null
  ): WhatsAppCheckoutResult {
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

      if (customer) {
        saveCustomerDetails(customer);
      }

      const price = variant.price || product.base_price;
      const subtotal = price * quantity;

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
        discount = Math.min(discount, subtotal);
      }

      const finalAmount = Math.max(0, subtotal - discount);
      const formattedPrice = price.toLocaleString('en-IN');

      const messageParts: string[] = [
        `Hi EarCraft! 👋`,
        ``,
        `I would like to place an order:`,
        ``,
      ];

      if (customer && (customer.name || customer.address || customer.city)) {
        messageParts.push(
          `CUSTOMER DETAILS`,
          `━━━━━━━━━━━━━━━━`,
          `NAME: ${customer.name || ''}`,
          `PHONE: ${customer.phone || ''}`,
          `ADDRESS: ${customer.address || ''}`,
          `CITY: ${customer.city || ''}`,
          `DISTRICT: ${customer.district || ''}`,
          `STATE: ${customer.state || ''}`,
          `PINCODE: ${customer.pincode || ''}`,
          ``
        );
      }

      messageParts.push(
        `ORDER DETAILS`,
        `━━━━━━━━━━━━━━━━`,
        `Product: ${product.title}`,
        `Edition: ${variant.name}`,
        `Quantity: ${quantity}`,
        `Unit Price: ₹${formattedPrice}`,
        ``,
        `━━━━━━━━━━━━━━━━`
      );

      if (discount > 0 && appliedCoupon) {
        messageParts.push(
          `Subtotal: ₹${subtotal.toLocaleString('en-IN')}`,
          `Promo Code: ${appliedCoupon.code} (₹${discount.toLocaleString('en-IN')} OFF)`,
          `Discount: -₹${discount.toLocaleString('en-IN')}`,
          `Discounted Total: ₹${finalAmount.toLocaleString('en-IN')}`
        );
      } else {
        messageParts.push(`Total Amount: ₹${finalAmount.toLocaleString('en-IN')}`);
      }

      messageParts.push(
        `━━━━━━━━━━━━━━━━`,
        ``,
        `Please confirm my order.`,
        `Thank you!`
      );

      const message = messageParts.join('\n');
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
  cartCheckoutWhatsApp(
    items: CartItem[],
    appliedCoupon?: Coupon | null,
    customer?: CustomerDetails
  ): WhatsAppCheckoutResult {
    try {
      if (!items || items.length === 0) {
        return { success: false, error: 'Your cart is empty.' };
      }

      if (!WHATSAPP_CONFIG.phoneNumber) {
        return { success: false, error: 'EarCraft WhatsApp contact number is not configured.' };
      }

      if (customer) {
        saveCustomerDetails(customer);
      }

      let totalItems = 0;
      let rawSubtotal = 0;

      const orderLines = items.map((item, index) => {
        const itemPrice = item.variant?.price || item.product.base_price;
        const itemSubtotal = itemPrice * item.quantity;
        totalItems += item.quantity;
        rawSubtotal += itemSubtotal;

        return [
          `${index + 1}. ${item.product.title} (${item.variant?.name || 'Standard'})`,
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

      const messageParts: string[] = [
        `Hi EarCraft! 👋`,
        ``,
        `I would like to place an order.`,
        ``,
      ];

      if (customer && (customer.name || customer.address || customer.city)) {
        messageParts.push(
          `CUSTOMER DETAILS`,
          `━━━━━━━━━━━━━━━━`,
          `NAME: ${customer.name || ''}`,
          `PHONE: ${customer.phone || ''}`,
          `ADDRESS: ${customer.address || ''}`,
          `CITY: ${customer.city || ''}`,
          `DISTRICT: ${customer.district || ''}`,
          `STATE: ${customer.state || ''}`,
          `PINCODE: ${customer.pincode || ''}`,
          ``
        );
      }

      messageParts.push(
        `ORDER DETAILS`,
        `━━━━━━━━━━━━━━━━`,
        orderLines.join('\n\n'),
        ``,
        `━━━━━━━━━━━━━━━━`,
        `Total Items: ${totalItems}`
      );

      if (discount > 0 && appliedCoupon) {
        messageParts.push(
          `Subtotal: ₹${rawSubtotal.toLocaleString('en-IN')}`,
          `Promo Code: ${appliedCoupon.code} (₹${discount.toLocaleString('en-IN')} OFF)`,
          `Discount: -₹${discount.toLocaleString('en-IN')}`,
          `Discounted Total: ₹${finalAmount.toLocaleString('en-IN')}`
        );
      } else {
        messageParts.push(`Total Amount: ₹${finalAmount.toLocaleString('en-IN')}`);
      }

      messageParts.push(`━━━━━━━━━━━━━━━━`);
      messageParts.push(``);
      messageParts.push(`Please confirm my order.`);
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
