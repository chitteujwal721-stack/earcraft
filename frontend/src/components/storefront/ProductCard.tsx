import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { Heart, Star, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const primaryImage = product.images.find(img => img.is_primary)?.url || product.images[0]?.url;
  const secondaryImage = product.images[1]?.url || primaryImage;

  const firstVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstVariant) {
      dispatch(addToCart({ product, variant: firstVariant, quantity: 1 }));
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="group relative flex flex-col bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden luxury-shadow-hover">
      
      {/* Image Viewport with Hover Zoom */}
      <Link to={`/product/${product.slug}`} className="relative h-72 w-full overflow-hidden bg-[#F6F7F9] flex items-center justify-center p-4">
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={secondaryImage}
          alt={`${product.title} hover`}
          className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 font-display">
          {product.category.slug === 'crafted-series' ? (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#111111] text-white px-2.5 py-0.5 rounded-full">
              Crafted Series
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#6D5EF6] text-white px-2.5 py-0.5 rounded-full">
              Unisex Series
            </span>
          )}
          {product.is_new_arrival && (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 text-[#111111] border border-[#E5E7EB] px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              New Release
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 border border-[#E5E7EB] text-[#6B7280] hover:text-[#6D5EF6] hover:bg-white'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick Add Button Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#111111] hover:bg-[#6D5EF6] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors font-display shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
          </button>
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D5EF6] font-display">
            {product.category.name}
          </span>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-display text-base font-bold text-[#111111] hover:text-[#6D5EF6] transition-colors line-clamp-1 mt-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-[#6B7280] line-clamp-1 mt-0.5">{product.subtitle}</p>

          {/* Color Indicator Swatches */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.variants.map((v) => (
              <span
                key={v.id}
                className="w-3.5 h-3.5 rounded-full border border-[#E5E7EB] shadow-inner"
                style={{ backgroundColor: v.color }}
                title={v.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#111111] font-display">
              ₹{product.base_price.toLocaleString()}
            </span>
            {product.compare_at_price && (
              <span className="text-xs text-[#6B7280] line-through">
                ₹{product.compare_at_price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
            <Star className="w-3.5 h-3.5 fill-[#6D5EF6] text-[#6D5EF6]" />
            <span className="font-semibold text-[#111111]">{product.avg_rating}</span>
            <span>({product.review_count})</span>
          </div>
        </div>
      </div>

    </div>
  );
};
