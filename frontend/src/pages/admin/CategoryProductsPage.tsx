import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Package, 
  Search, 
  Layers, 
  Tag, 
  DollarSign, 
  Database,
  Image as ImageIcon,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Category, Product } from '../../types';
import { apiService, ProductPayload } from '../../services/apiService';
import { MediaPicker } from '../../components/admin/MediaPicker';

export const CategoryProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState<boolean>(false);

  // Form State - Category is automatically pre-selected & set!
  const [formData, setFormData] = useState<ProductPayload>({
    title: '',
    subtitle: '',
    description: '',
    base_price: 19900,
    compare_at_price: 24900,
    category_id: categoryId || '',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '',
    video_url: '',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    status: 'ACTIVE',
    is_featured: true,
    is_new_arrival: true,
    sku: '',
    variant_name: 'Obsidian Black',
    material: 'Space-grade Aluminum',
    color: '#111111',
    stock_quantity: 25,
  });

  useEffect(() => {
    if (categoryId) {
      loadCategoryAndProducts();
    }
  }, [categoryId]);

  const loadCategoryAndProducts = async () => {
    setLoading(true);
    try {
      if (categoryId) {
        const data = await apiService.getCategoryProducts(categoryId);
        setCategory(data.category);
        setProducts(data.products);
        setFormData(prev => ({ ...prev, category_id: data.category.id }));
      }
    } catch (err) {
      console.error('Failed to load category products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: ProductPayload = {
        ...formData,
        category_id: category?.id || categoryId || '',
        category: category?.id || categoryId || '',
      };
      const created = await apiService.createProduct(payload);
      setProducts(prev => [created, ...prev]);
      setIsAddModalOpen(false);
      
      // Refresh count
      if (categoryId) {
        loadCategoryAndProducts();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to create product under category');
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in p-6 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Back button & Header */}
      <div className="border-b border-slate-200 pb-6 space-y-4">
        <button
          onClick={() => navigate('/admin/categories')}
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#6D5EF6] hover:text-[#5b4ebf] bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm transition-all"
        >
          <ArrowLeft size={14} />
          <span>Back to All Categories</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex-shrink-0">
              <img 
                src={category?.image_url || category?.image || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80'} 
                alt={category?.name || 'Category'} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-black text-slate-900">{category?.name || 'Category Products'}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#6D5EF6]/10 text-[#6D5EF6] border border-[#6D5EF6]/20">
                  {products.length} Products
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{category?.description || 'Products belonging to this category.'}</p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#6D5EF6] hover:bg-[#5b4ebf] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>+ Add Product to {category?.name || 'Category'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search products in ${category?.name || 'category'}...`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6D5EF6]"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table / Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm animate-pulse h-64" />
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center shadow-sm">
          <Package size={48} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No products in "{category?.name}"</h3>
          <p className="text-xs text-slate-500 mt-1">Click "+ Add Product" to create a new product inside this category.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-[#6D5EF6] uppercase tracking-wider">
                  <th className="py-3.5 px-6">Product Info</th>
                  <th className="py-3.5 px-6">Category (Auto-Selected)</th>
                  <th className="py-3.5 px-6">Base Price</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map(product => {
                  const mainImg = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80';
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={mainImg} 
                            alt={product.title} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <div>
                            <div className="font-bold text-slate-900">{product.title}</div>
                            <div className="text-[11px] text-slate-400 font-mono">/{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#6D5EF6]/10 text-[#6D5EF6] border border-[#6D5EF6]/20">
                          <CheckCircle size={12} />
                          <span>{category?.name || 'Category'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        ₹{product.base_price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'Just now'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE PRODUCT INSIDE CATEGORY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">+ Add Product directly to Category</h3>
                <p className="text-xs text-[#6D5EF6] font-semibold">Category is automatically pre-selected as: "{category?.name}"</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="p-6 overflow-y-auto space-y-4">
              
              {/* Category Locked Field */}
              <div className="p-3 bg-violet-50 border border-violet-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <Layers size={16} className="text-[#6D5EF6]" />
                  <span className="font-bold text-slate-700">Pre-Selected Category:</span>
                  <span className="font-extrabold text-[#6D5EF6] bg-white px-2.5 py-0.5 rounded border border-violet-200">
                    {category?.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">(Auto-Assigned)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EarCraft Apex Pro Wireless Earbuds"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. 45dB Hybrid Active Noise Cancellation"
                  value={formData.subtitle}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed audio craftsmanship story & technical specs..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.base_price}
                    onChange={e => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Compare/Discount Price (₹)</label>
                  <input
                    type="number"
                    value={formData.compare_at_price || ''}
                    onChange={e => setFormData({ ...formData, compare_at_price: parseFloat(e.target.value) || undefined })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
              </div>

              {/* Product Image Selection via Media Library */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Product Image *</label>
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0">
                    <img src={formData.image_url} alt="Product Preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2"
                  >
                    <ImageIcon size={14} />
                    <span>Select From Media Library</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">SKU</label>
                  <input
                    type="text"
                    placeholder="EC-APX-01"
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Stock Qty</label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={e => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5b4ebf] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Save Product to {category?.name}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MEDIA PICKER */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image_url: url })}
        selectedUrl={formData.image_url}
        title="Select Product Image"
      />

    </div>
  );
};
