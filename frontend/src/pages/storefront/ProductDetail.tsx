import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addToCart, toggleCartDrawer } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { ProductCard } from '../../components/storefront/ProductCard';
import { ThreeSixtyViewer } from '../../components/storefront/ThreeSixtyViewer';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCw,
  Plus,
  Minus,
  Sparkles,
  Package,
  Check
} from 'lucide-react';

import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { checkoutService } from '../../services/checkoutService';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products } = useAppSelector(state => state.cms);
  const product = products.find(p => p.slug === slug) || products[0];

  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(i => i.id === product?.id);

  const [selectedImage, setSelectedImage] = useState<string>(product?.images[0]?.url || '');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'included' | 'delivery' | '360' | 'reviews'>('specs');
  const [checkoutError, setCheckoutError] = useState<string>('');

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.base_price;
  const comparePrice = selectedVariant?.compare_at_price || product.compare_at_price;

  const handleAddToCart = () => {
    const targetVariant = selectedVariant || product.variants[0];
    if (targetVariant) {
      dispatch(addToCart({ product, variant: targetVariant, quantity }));
    }
  };

  const handleBuyNow = () => {
    setCheckoutError('');
    const targetVariant = selectedVariant || product.variants[0];
    if (!targetVariant) {
      setCheckoutError('Please select a product variant.');
      return;
    }

    const res = checkoutService.buyNowWhatsApp(product, targetVariant, quantity);
    if (!res.success && res.error) {
      setCheckoutError(res.error);
    }
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category.slug === product.category.slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#F6F7F9] text-[#111111]">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280] font-display">
        <Link to="/" className="hover:text-[#6D5EF6]">Home</Link>
        <span>/</span>
        <Link to={`/shop?series=${product.category.slug === 'crafted-series' ? 'crafted' : 'unisex'}`} className="hover:text-[#6D5EF6]">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-[#111111] font-bold truncate">{product.title}</span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sticky Image Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          <div className="relative h-[520px] rounded-3xl overflow-hidden bg-white border border-[#E5E7EB] luxury-shadow flex items-center justify-center p-6 group">
            {activeTab === '360' && product.three_sixty_images ? (
              <ThreeSixtyViewer images={product.three_sixty_images} />
            ) : (
              <img
                src={selectedImage || product.images[0]?.url}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            )}

            {/* Series Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 font-display">
              <span className="text-xs uppercase font-bold tracking-widest bg-[#111111] text-white px-3 py-1 rounded-full shadow-sm">
                {product.category.name}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest bg-[#6D5EF6] text-white px-3 py-1 rounded-full shadow-sm">
                45dB Hybrid ANC
              </span>
            </div>
          </div>

          {/* Thumbnails Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => {
                  setSelectedImage(img.url);
                  if (activeTab === '360') setActiveTab('specs');
                }}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-1 luxury-shadow ${
                  selectedImage === img.url && activeTab !== '360' ? 'border-[#6D5EF6]' : 'border-[#E5E7EB] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.alt_text} className="w-full h-full object-contain" />
              </button>
            ))}

            {product.three_sixty_images && (
              <button
                onClick={() => setActiveTab('360')}
                className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all shrink-0 bg-white luxury-shadow ${
                  activeTab === '360' ? 'border-[#6D5EF6] text-[#6D5EF6]' : 'border-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                <RotateCw className="w-5 h-5 text-[#6D5EF6]" />
                <span className="text-[10px] font-bold uppercase font-display">360° View</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Buy Box & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">
              {product.category.name}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111111] mt-1">
              {product.title}
            </h1>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">{product.subtitle}</p>

            {/* Ratings */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-[#6D5EF6]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.avg_rating) ? 'fill-[#6D5EF6]' : 'text-[#E5E7EB]'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-[#111111]">{product.avg_rating} / 5.0</span>
              <span className="text-xs text-[#6B7280]">({product.review_count} verified reviews)</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] luxury-shadow flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-[#111111] font-display">
                ₹{currentPrice.toLocaleString()}
              </span>
              {comparePrice && (
                <span className="text-sm text-[#6B7280] line-through ml-3 font-display">
                  ₹{comparePrice.toLocaleString()}
                </span>
              )}
              <span className="block text-[11px] text-[#6B7280] mt-1">
                Includes {product.gst_percentage}% GST & Express Insured Transit.
              </span>
            </div>

            <span className={`text-xs font-bold px-3 py-1 rounded-full font-display ${
              (selectedVariant?.stock_quantity || 0) > 0
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {(selectedVariant?.stock_quantity || 0) > 0 ? `In Stock (${selectedVariant?.stock_quantity} left)` : 'Sold Out'}
            </span>
          </div>

          {/* Color & Finish Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase font-bold text-[#111111] tracking-wider font-display">
                Select Finish Edition:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-[#6D5EF6] bg-white text-[#111111] violet-shadow-sm font-bold'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#111111]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-[#E5E7EB] shrink-0 shadow-inner"
                      style={{ backgroundColor: variant.color }}
                    />
                    <div className="text-xs">
                      <p className="font-display font-bold text-[#111111]">{variant.name}</p>
                      <p className="text-[10px] text-[#6B7280]">SKU: {variant.sku}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTAs */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E5E7EB] rounded-2xl bg-white p-1 luxury-shadow">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#6B7280] hover:text-[#6D5EF6]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#111111] font-display">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#6B7280] hover:text-[#6D5EF6]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`p-3.5 rounded-2xl border transition-all luxury-shadow ${
                  isWishlisted
                    ? 'bg-red-500 text-white border-red-500'
                    : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#6D5EF6]'
                }`}
                title="Wishlist"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            {checkoutError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-display">
                {checkoutError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-white hover:bg-[#F6F7F9] text-[#111111] border border-[#E5E7EB] py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all font-display luxury-shadow"
              >
                <ShoppingBag className="w-4 h-4 text-[#6D5EF6]" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all font-display shadow-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" /> Buy Now on WhatsApp
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#6D5EF6] shrink-0" />
              <span>Insured Air Express Courier</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6D5EF6] shrink-0" />
              <span>2-Year Hardware Warranty</span>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications, Features, Included, Delivery & Reviews Tabs */}
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] luxury-shadow space-y-8">
        <div className="flex items-center gap-6 border-b border-[#E5E7EB] pb-4 overflow-x-auto font-display">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'specs' ? 'border-[#6D5EF6] text-[#6D5EF6]' : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            Specifications & Details
          </button>
          <button
            onClick={() => setActiveTab('included')}
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'included' ? 'border-[#6D5EF6] text-[#6D5EF6]' : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            What's Included
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'delivery' ? 'border-[#6D5EF6] text-[#6D5EF6]' : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            Delivery & Transit
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'reviews' ? 'border-[#6D5EF6] text-[#6D5EF6]' : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="space-y-6 max-w-3xl text-sm text-[#6B7280] leading-relaxed">
            <p className="text-[#111111] font-medium leading-relaxed">{product.description}</p>
            {product.craftsmanship_details && (
              <div className="p-5 bg-[#F6F7F9] rounded-2xl border border-[#E5E7EB]">
                <h4 className="text-xs uppercase font-bold text-[#6D5EF6] mb-1.5 font-display">Acoustic Engineering Note</h4>
                <p className="text-xs text-[#6B7280]">{product.craftsmanship_details}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'included' && (
          <div className="max-w-xl space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#111111] font-display">Inside the Luxury Box</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6D5EF6]" /> 1x EarCraft Wireless Acoustic Earbuds</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6D5EF6]" /> 1x Qi Wireless Charging Case</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6D5EF6]" /> 3x Hypoallergenic Silicone Eartips (S, M, L)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6D5EF6]" /> 1x Braided USB-C Fast Charging Cable</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6D5EF6]" /> 1x Official EarCraft Certificate of Authenticity & 2-Year Warranty Card</li>
            </ul>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="max-w-xl space-y-3 text-xs text-[#6B7280]">
            <h4 className="text-xs uppercase font-bold text-[#111111] font-display">Complimentary Insured Air Express</h4>
            <p>Orders are dispatched within 24 hours from our regional acoustic fulfillment hubs. Tracking details are automatically assigned and sent via SMS and Email.</p>
            <div className="p-4 bg-[#F6F7F9] rounded-xl border border-[#E5E7EB] flex items-center justify-between text-[#111111] font-display font-bold">
              <span>Standard Metro Delivery: 2-3 Business Days</span>
              <span className="text-[#6D5EF6]">FREE</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.length === 0 ? (
              <p className="text-xs text-[#6B7280]">Be the first to review {product.title}.</p>
            ) : (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-[#F6F7F9] border border-[#E5E7EB] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#111111] font-display">{rev.user_name}</span>
                    <div className="flex items-center gap-0.5 text-[#6D5EF6]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#6D5EF6]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-display text-2xl font-bold text-[#111111]">Complete Your EarCraft Setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
