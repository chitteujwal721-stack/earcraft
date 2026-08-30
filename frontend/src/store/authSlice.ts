import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const defaultCustomerUser: User = {
  id: 'usr-cust-1',
  email: 'member@earcraft.com',
  first_name: 'VIP',
  last_name: 'Collector',
  role: 'CUSTOMER',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  is_email_verified: true,
  is_active: true,
  created_at: new Date().toISOString(),
};

const initialState: AuthState = {
  user: defaultCustomerUser,
  token: 'mock-jwt-customer-token',
  isAuthenticated: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    switchRole: (state, action: PayloadAction<User['role']>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, switchRole, logout } = authSlice.actions;
export default authSlice.reducer;
