import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product, ProductVariant, Coupon } from '../types';

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  appliedCoupon: null,
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; variant: ProductVariant; quantity?: number }>) => {
      const { product, variant, quantity = 1 } = action.payload;
      const existing = state.items.find(item => item.product.id === product.id && item.variant.id === variant.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: `${product.id}-${variant.id}`,
          product,
          variant,
          quantity,
        });
      }
      state.isOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.appliedCoupon = action.payload;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },
    toggleCartDrawer: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  toggleCartDrawer,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
