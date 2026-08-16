import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/authSlice';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@earcraft.com');
  const [password, setPassword] = useState('admin123456');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      if (email.trim() && password.length >= 6) {
        dispatch(setUser({
          user: {
            id: 'usr-admin-1',
            email: email.trim(),
            first_name: 'Super',
            last_name: 'Admin',
            role: 'SUPER_ADMIN',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            is_email_verified: true,
            is_active: true,
            created_at: new Date().toISOString(),
          },
          token: 'mock-jwt-super-admin-token-2026'
        }));
        setIsSubmitting(false);
        navigate('/admin');
      } else {
        setIsSubmitting(false);
        setError('Please enter a valid email and password (min 6 characters).');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-4 text-[#111111] font-sans">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E7EB] luxury-shadow space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block">
            <span className="font-display text-3xl font-extrabold tracking-widest text-[#111111]">
              EAR<span className="text-[#6D5EF6]">CRAFT</span>
            </span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6D5EF6]/10 text-[#6D5EF6] text-[11px] font-bold uppercase tracking-widest font-display">
            <ShieldCheck className="w-3.5 h-3.5" /> Website Administration Hub
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[#111111] pt-2">Admin Staff Sign In</h1>
          <p className="text-xs text-[#6B7280]">
            Manage products, stock, customer orders, media assets, CMS banners, and site configuration.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 font-display">
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1.5">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@earcraft.com"
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-xs text-[#111111] placeholder-[#6B7280] focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1.5">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-xs text-[#111111] placeholder-[#6B7280] focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#111111] hover:bg-[#6D5EF6] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
          <p className="font-bold text-[#111111] font-display flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#6D5EF6]" /> Quick Admin Access
          </p>
          <p className="text-[11px] font-mono text-[#6B7280]">Default Email: admin@earcraft.com</p>
          <p className="text-[11px] font-mono text-[#6B7280]">Default Password: admin123456</p>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link to="/" className="text-xs font-bold text-[#6D5EF6] hover:underline font-display">
            ← Return to EarCraft Storefront
          </Link>
        </div>

      </div>
    </div>
  );
};
