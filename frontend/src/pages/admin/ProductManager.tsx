import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addOrUpdateProduct, deleteProduct, bulkDeleteProducts } from '../../store/cmsSlice';
import { Product } from '../../types';
import { Plus, Trash2, Edit3, Download, Upload, Search, CheckSquare, Square, X, Sparkles } from 'lucide-react';

export const ProductManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, categories } = useAppSelector(state => state.cms);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    base_price: 10000,
    sku: 'AUR-001',
    hsn_code: '71131910',
    gst_percentage: 3,
    barcode: '8901234567890',
    category_id: categories[0]?.id || 'cat-1',
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  });

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedIds.length} selected products?`)) {
      dispatch(bulkDeleteProducts(selectedIds));
      setSelectedIds([]);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      subtitle: '18K Solid Gold Handcrafted',
      description: 'Sculpted by hand using 100% recycled solid gold.',
      base_price: 18900,
      sku: `SKU-EC-${Math.floor(100 + Math.random() * 900)}`,
      hsn_code: '71131910',
      gst_percentage: 3,
      barcode: '8901234567899',
      category_id: categories[0]?.id || 'cat-1',
      image_url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    });
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find(c => c.id === formData.category_id) || categories[0];

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      subtitle: formData.subtitle,
      description: formData.description,
      hsn_code: formData.hsn_code,
      gst_percentage: Number(formData.gst_percentage),
      barcode: formData.barcode,
      category: catObj,
      base_price: Number(formData.base_price),
      is_featured: true,
      is_new_arrival: true,
      is_best_seller: false,
      is_trending: true,
      images: [
        { id: `img-${Date.now()}`, url: formData.image_url, alt_text: formData.title, is_primary: true, order: 1 }
      ],
      variants: [
        {
          id: `var-${Date.now()}`,
          sku: formData.sku,
          name: 'Standard 18K',
          material: 'Solid Gold 18K',
          color: '#D4AF37',
          price: Number(formData.base_price),
          stock_quantity: 10,
          is_available: true,
        }
      ],
      avg_rating: 5.0,
      review_count: 1,
      reviews: [],
      questions: [],
      created_at: new Date().toISOString(),
    };

    dispatch(addOrUpdateProduct(newProd));
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900">Product Management</h1>
          <p className="text-xs text-slate-500 mt-1">CRUD products, SKU inventory levels, HSN codes, GST & CSV import/export.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting products to CSV...')}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export CSV
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product SKU
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or category..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
          />
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-[#6D5EF6] font-display font-bold uppercase tracking-widest text-[10px]">
            <tr>
              <th className="p-4 w-10">
                <button onClick={handleSelectAll}>
                  {selectedIds.length === filteredProducts.length ? <CheckSquare className="w-4 h-4 text-[#6D5EF6]" /> : <Square className="w-4 h-4 text-slate-400" />}
                </button>
              </th>
              <th className="p-4">Product Details</th>
              <th className="p-4">Category</th>
              <th className="p-4">SKU / Barcode</th>
              <th className="p-4">Price (GST)</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 text-slate-800">
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4">
                  <button onClick={() => handleToggleSelect(prod.id)}>
                    {selectedIds.includes(prod.id) ? <CheckSquare className="w-4 h-4 text-[#6D5EF6]" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                </td>
                <td className="p-4 flex items-center gap-3">
                  <img src={prod.images[0]?.url} alt={prod.title} className="w-12 h-12 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0" />
                  <div>
                    <p className="font-display font-bold text-slate-900">{prod.title}</p>
                    <p className="text-[10px] text-slate-500">{prod.subtitle}</p>
                  </div>
                </td>
                <td className="p-4 font-semibold text-slate-700">{prod.category.name}</td>
                <td className="p-4 font-mono text-[11px]">
                  <span className="font-bold text-slate-800">{prod.variants[0]?.sku || 'SKU-001'}</span>
                  <span className="block text-slate-400">{prod.hsn_code || 'HSN-7113'}</span>
                </td>
                <td className="p-4 font-bold text-[#6D5EF6] text-sm">₹{prod.base_price.toLocaleString()}</td>
                <td className="p-4 font-semibold">
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{prod.variants[0]?.stock_quantity || 10} Units</span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => dispatch(deleteProduct(prod.id))}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-6 text-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-display text-xl font-bold flex items-center gap-2 text-slate-900">
                <Sparkles className="w-5 h-5 text-[#6D5EF6]" /> Create Atelier SKU Product
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-display">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Aurelia Sculpted 18K Gold Ear Cuff"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Base Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">HSN Code</label>
                  <input
                    type="text"
                    value={formData.hsn_code}
                    onChange={(e) => setFormData({ ...formData, hsn_code: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">GST %</label>
                  <input
                    type="number"
                    value={formData.gst_percentage}
                    onChange={(e) => setFormData({ ...formData, gst_percentage: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">High-Res Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description & Material Specs</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6D5EF6] hover:bg-[#5847E4] text-white py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-xl"
              >
                Save & Deploy SKU to Storefront
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
