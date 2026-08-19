import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleCartDrawer } from '../../store/cartSlice';
import { LiveSearchModal } from '../storefront/LiveSearchModal';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const { settings } = useAppSelector(state => state.cms);
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const { user } = useAppSelector(state => state.auth);

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F6F7F9]/90 backdrop-blur-xl border-b border-[#E5E7EB] luxury-shadow py-3'
            : 'bg-[#F6F7F9]/80 backdrop-blur-md py-3.5 border-b border-[#E5E7EB]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[68px]">
          
          {/* Mobile Hamburger Button (Left on Mobile) */}
          <div className="flex lg:hidden items-center mr-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-white text-[#111111] hover:text-[#6D5EF6] transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-[#6D5EF6]/30 shadow-md flex items-center justify-center bg-white shrink-0 group-hover:border-[#6D5EF6] transition-all">
                <img src="/logo.png" alt="EarCraft Logo" className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-[0.18em] text-[#111111] group-hover:text-[#6D5EF6] transition-colors leading-none">
                  EAR<span className="text-[#6D5EF6]">CRAFT</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280] font-medium mt-1">
                  {settings.tagline || 'Where style meets sound perfection'}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-[#6B7280] hover:text-[#111111] transition-colors">
              Home
            </Link>
            <Link to="/shop?series=unisex" className="text-xs font-bold uppercase tracking-widest text-[#6B7280] hover:text-[#6D5EF6] transition-colors">
              Unisex Series
            </Link>
            <Link to="/shop?series=crafted" className="text-xs font-bold uppercase tracking-widest text-[#6B7280] hover:text-[#6D5EF6] transition-colors">
              Crafted Series
            </Link>
            <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-[#6B7280] hover:text-[#111111] transition-colors">
              Contact
            </Link>
            <Link to="/about-us" className="text-xs font-bold uppercase tracking-widest text-[#6B7280] hover:text-[#111111] transition-colors">
              About Us
            </Link>
          </div>

          {/* Right: Clean Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#6B7280] hover:text-[#111111] transition-colors rounded-full hover:bg-white"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#6B7280] hover:text-[#111111] transition-colors rounded-full hover:bg-white"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {totalWishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#6D5EF6] text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Toggle */}
            <button
              onClick={() => dispatch(toggleCartDrawer(true))}
              className="relative bg-[#111111] hover:bg-[#6D5EF6] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-sm font-display"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-[#6D5EF6] text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-[#F6F7F9] p-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-in slide-in-from-right duration-300">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase font-bold text-[#6D5EF6] tracking-widest mb-4 font-display">Collections</h4>
              <div className="space-y-4">
                <Link to="/" className="block text-xl font-display font-bold text-[#111111] hover:text-[#6D5EF6]">
                  Home
                </Link>
                <Link to="/shop?series=crafted" className="block text-lg font-display text-[#111111] hover:text-[#6D5EF6] pl-2">
                  Crafted Series — Premium Collection
                </Link>
                <Link to="/shop?series=unisex" className="block text-lg font-display text-[#111111] hover:text-[#6D5EF6] pl-2">
                  Unisex Series — Everyday Collection
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-4">
              <Link to="/about-us" className="block text-base font-display text-[#111111]">About Us</Link>
              <Link to="/contact" className="block text-base font-display text-[#111111]">Contact Support</Link>
            </div>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      <LiveSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
