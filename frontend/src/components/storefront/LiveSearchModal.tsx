import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface LiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveSearchModal: React.FC<LiveSearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useAppSelector(state => state.cms);
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="relative max-w-2xl mx-auto bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl luxury-shadow overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6D5EF6]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Crafted Series or Unisex Series..."
            className="flex-1 bg-transparent text-sm text-[#111111] placeholder-[#6B7280] focus:outline-none font-display"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#6B7280] hover:text-[#111111]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1 text-xs font-bold uppercase tracking-wider text-[#6D5EF6]">
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-[#6B7280] space-y-2">
              <Sparkles className="w-6 h-6 text-[#6D5EF6] mx-auto animate-pulse" />
              <p className="font-display text-[#111111]">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => setQuery('Apex Pro')}
                  className="px-3 py-1 bg-[#F6F7F9] border border-[#E5E7EB] rounded-full text-[11px] text-[#111111] hover:border-[#6D5EF6]"
                >
                  Crafted Apex Pro
                </button>
                <button
                  onClick={() => setQuery('Translucent')}
                  className="px-3 py-1 bg-[#F6F7F9] border border-[#E5E7EB] rounded-full text-[11px] text-[#111111] hover:border-[#6D5EF6]"
                >
                  Unisex Translucent Edition
                </button>
                <button
                  onClick={() => setQuery('Soundmaster')}
                  className="px-3 py-1 bg-[#F6F7F9] border border-[#E5E7EB] rounded-full text-[11px] text-[#111111] hover:border-[#6D5EF6]"
                >
                  Soundmaster Studio
                </button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6B7280] font-display">
              No products found matching "{query}".
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F6F7F9] transition-colors border border-transparent hover:border-[#E5E7EB]"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.title}
                    className="w-12 h-12 object-contain bg-[#F6F7F9] rounded-lg p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#6D5EF6] font-display">
                      {product.category.name}
                    </span>
                    <h4 className="text-xs font-bold text-[#111111] font-display truncate">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-[#6B7280] truncate">{product.subtitle}</p>
                  </div>
                  <span className="text-xs font-bold text-[#111111] font-display">
                    ₹{product.base_price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#6D5EF6]" />
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
