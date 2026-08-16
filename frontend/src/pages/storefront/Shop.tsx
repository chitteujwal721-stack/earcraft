import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ProductCard } from '../../components/storefront/ProductCard';
import { SlidersHorizontal, Grid, List, Search, X, Sparkles } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useAppSelector(state => state.cms);

  const seriesQuery = searchParams.get('series') || 'all';
  const categoryQuery = searchParams.get('category') || 'all';

  const [selectedSeries, setSelectedSeries] = useState<string>(seriesQuery);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchParams.get('series')) {
      setSelectedSeries(searchParams.get('series') || 'all');
    } else if (searchParams.get('category')) {
      const cat = searchParams.get('category');
      if (cat?.includes('crafted')) setSelectedSeries('crafted');
      else if (cat?.includes('unisex')) setSelectedSeries('unisex');
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Series / Category filter
      if (selectedSeries === 'crafted' && prod.category.slug !== 'crafted-series') {
        return false;
      }
      if (selectedSeries === 'unisex' && prod.category.slug !== 'unisex-series') {
        return false;
      }
      // Price filter
      if (prod.base_price > maxPrice) return false;
      // In-Stock filter
      if (inStockOnly) {
        const hasStock = prod.variants.some(v => v.stock_quantity > 0);
        if (!hasStock) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const matchTitle = prod.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchSubtitle = prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchTitle && !matchSubtitle) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.base_price - b.base_price;
      if (sortBy === 'price-high') return b.base_price - a.base_price;
      if (sortBy === 'rating') return b.avg_rating - a.avg_rating;
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0; // featured
    });
  }, [products, selectedSeries, maxPrice, inStockOnly, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#F6F7F9] text-[#111111]">
      
      {/* Header Banner */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E7EB] luxury-shadow text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6D5EF6]/10 text-[#6D5EF6] text-xs font-bold uppercase tracking-widest font-display">
          <Sparkles className="w-3.5 h-3.5" /> EarCraft Product Catalog
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#111111]">
          {selectedSeries === 'crafted' ? 'Crafted Series — Signature Audio' : selectedSeries === 'unisex' ? 'Unisex Series — Everyday Collection' : 'Crafted Series & Unisex Series'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto leading-relaxed">
          Engineered for exceptional sound and everyday style. Discover 45dB Active Noise Cancellation, graphene diaphragms, and universal acoustic geometry.
        </p>

        {/* Series Switcher Tabs */}
        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => {
              setSelectedSeries('all');
              setSearchParams({});
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest font-display transition-all border ${
              selectedSeries === 'all'
                ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                : 'bg-[#F6F7F9] text-[#6B7280] border-[#E5E7EB] hover:text-[#111111]'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => {
              setSelectedSeries('crafted');
              setSearchParams({ series: 'crafted' });
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest font-display transition-all border ${
              selectedSeries === 'crafted'
                ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                : 'bg-[#F6F7F9] text-[#6B7280] border-[#E5E7EB] hover:text-[#6D5EF6]'
            }`}
          >
            Crafted Series
          </button>
          <button
            onClick={() => {
              setSelectedSeries('unisex');
              setSearchParams({ series: 'unisex' });
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest font-display transition-all border ${
              selectedSeries === 'unisex'
                ? 'bg-[#6D5EF6] text-white border-[#6D5EF6] shadow-md'
                : 'bg-[#F6F7F9] text-[#6B7280] border-[#E5E7EB] hover:text-[#6D5EF6]'
            }`}
          >
            Unisex Series
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] luxury-shadow flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search earbuds, ANC specs..."
            className="w-full bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#111111] placeholder-[#6B7280] focus:outline-none focus:border-[#6D5EF6] font-display"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111111]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Layout Toggles */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280] font-medium font-display">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F6F7F9] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#6D5EF6] font-display"
            >
              <option value="featured">Featured Audio</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Releases</option>
            </select>
          </div>

          <div className="flex items-center border border-[#E5E7EB] rounded-xl overflow-hidden bg-[#F6F7F9]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-[#6B7280]'}`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#111111] text-white' : 'text-[#6B7280]'}`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Filter Sidebar & Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Controls */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-[#E5E7EB] luxury-shadow h-fit">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
            <h3 className="font-display text-base font-bold text-[#111111] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#6D5EF6]" /> Filter Audio
            </h3>
            <button
              onClick={() => {
                setSelectedSeries('all');
                setMaxPrice(30000);
                setInStockOnly(false);
                setSearchQuery('');
                setSearchParams({});
              }}
              className="text-[11px] text-[#6D5EF6] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>

          {/* Product Series Filter */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#6B7280] tracking-wider mb-3 font-display">Product Series</h4>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2.5 text-[#111111] hover:text-[#6D5EF6] cursor-pointer">
                <input
                  type="radio"
                  name="series"
                  checked={selectedSeries === 'all'}
                  onChange={() => {
                    setSelectedSeries('all');
                    setSearchParams({});
                  }}
                  className="accent-[#6D5EF6]"
                />
                <span>All Series</span>
              </label>
              <label className="flex items-center gap-2.5 text-[#111111] hover:text-[#6D5EF6] cursor-pointer">
                <input
                  type="radio"
                  name="series"
                  checked={selectedSeries === 'crafted'}
                  onChange={() => {
                    setSelectedSeries('crafted');
                    setSearchParams({ series: 'crafted' });
                  }}
                  className="accent-[#6D5EF6]"
                />
                <span className="font-bold">Crafted Series</span>
              </label>
              <label className="flex items-center gap-2.5 text-[#111111] hover:text-[#6D5EF6] cursor-pointer">
                <input
                  type="radio"
                  name="series"
                  checked={selectedSeries === 'unisex'}
                  onChange={() => {
                    setSelectedSeries('unisex');
                    setSearchParams({ series: 'unisex' });
                  }}
                  className="accent-[#6D5EF6]"
                />
                <span className="font-bold">Unisex Series</span>
              </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="border-t border-[#E5E7EB] pt-4">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="uppercase font-bold text-[#6B7280] tracking-wider font-display">Max Price</span>
              <span className="font-bold text-[#6D5EF6]">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={30000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#6D5EF6]"
            />
          </div>

          {/* Availability Toggle */}
          <div className="border-t border-[#E5E7EB] pt-4">
            <label className="flex items-center justify-between text-xs text-[#111111] cursor-pointer font-display">
              <span>In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#6D5EF6] rounded"
              />
            </label>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E5E7EB] text-center text-[#6B7280] font-display space-y-3 luxury-shadow">
              <p className="text-lg text-[#111111] font-bold">No audio products match your criteria.</p>
              <p className="text-xs text-[#6B7280]">Try adjusting your price filter or series selection.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
