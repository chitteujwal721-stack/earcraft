import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Package, 
  ExternalLink, 
  Image as ImageIcon,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Eye
} from 'lucide-react';
import { Category } from '../../types';
import { apiService, CategoryPayload } from '../../services/apiService';
import { MediaPicker } from '../../components/admin/MediaPicker';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [formData, setFormData] = useState<CategoryPayload>({
    name: '',
    description: '',
    image_url: '',
    slug: '',
    status: 'ACTIVE',
    display_order: 1,
    seo_title: '',
    seo_description: '',
  });

  // Media Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState<boolean>(false);

  // Deletion Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [deleteOption, setDeleteOption] = useState<'move' | 'unassign'>('move');
  const [targetCategoryId, setTargetCategoryId] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData({
      name: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      slug: '',
      status: 'ACTIVE',
      display_order: categories.length + 1,
      seo_title: '',
      seo_description: '',
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      image_url: cat.image_url || cat.image || '',
      slug: cat.slug,
      status: cat.status || 'ACTIVE',
      display_order: cat.display_order || 1,
      seo_title: cat.seo_title || '',
      seo_description: cat.seo_description || '',
    });
    setIsEditModalOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiService.createCategory(formData);
      setCategories(prev => [...prev, created]);
      setIsCreateModalOpen(false);
      loadCategories(); // refresh dynamic counts
    } catch (err: any) {
      alert(err.message || 'Failed to create category');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const updated = await apiService.updateCategory(editingCategory.id, formData);
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? updated : c));
      setIsEditModalOpen(false);
      setEditingCategory(null);
      loadCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to update category');
    }
  };

  const handleInitiateDelete = (cat: Category) => {
    setDeletingCategory(cat);
    const otherCats = categories.filter(c => c.id !== cat.id);
    if (otherCats.length > 0) {
      setTargetCategoryId(otherCats[0].id);
    }
    setIsDeleteModalOpen(true);
  };

  const ConfirmCategoryDelete = async () => {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      if ((deletingCategory.product_count || 0) > 0) {
        if (deleteOption === 'move') {
          if (!targetCategoryId) {
            alert('Please select a target category to move products into.');
            setIsDeleting(false);
            return;
          }
          await apiService.deleteCategory(deletingCategory.id, {
            action: 'move_products',
            target_category_id: targetCategoryId
          });
        } else {
          await apiService.deleteCategory(deletingCategory.id, {
            action: 'unassign'
          });
        }
      } else {
        await apiService.deleteCategory(deletingCategory.id);
      }
      setIsDeleteModalOpen(false);
      setDeletingCategory(null);
      loadCategories(); // refresh list & dynamic product counts
    } catch (err: any) {
      alert(err.message || 'Failed to delete category');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || cat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in p-6 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#6D5EF6]/10 text-[#6D5EF6] rounded-xl font-bold">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Category Manager</h1>
              <p className="text-xs text-slate-500 font-medium">Manage product categories, dynamic stock counts, and frontend storefront navigation.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-[#6D5EF6] hover:bg-[#5b4ebf] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 self-start sm:self-auto"
        >
          <FolderPlus size={16} />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Categories</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{categories.length}</h3>
            <p className="text-[11px] text-slate-500 mt-1">Active categories in database</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#6D5EF6]/10 text-[#6D5EF6] flex items-center justify-center font-bold">
            <Layers size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {categories.reduce((acc, cat) => acc + (cat.product_count || 0), 0)}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">Categorized items in database</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Package size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Status</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">
              {categories.filter(c => c.status === 'ACTIVE' || !c.status).length} / {categories.length}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">Visible on customer storefront</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search category name or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6D5EF6] focus:ring-1 focus:ring-[#6D5EF6]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'ALL' ? 'bg-[#6D5EF6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('ACTIVE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'ACTIVE' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('INACTIVE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'INACTIVE' ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Category Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(n => (
            <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-48 animate-pulse" />
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center shadow-sm">
          <Layers size={48} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No categories found</h3>
          <p className="text-xs text-slate-500 mt-1">Click "+ Add Category" to create your first category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map(cat => (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                      <img 
                        src={cat.image_url || cat.image || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80'} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-[#6D5EF6] transition-colors">{cat.name}</h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          cat.status === 'INACTIVE' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {cat.status || 'ACTIVE'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">/{cat.slug}</p>
                    </div>
                  </div>

                  {/* Dynamic Product Counter Pill */}
                  <div className="bg-[#6D5EF6]/10 border border-[#6D5EF6]/20 px-3 py-1.5 rounded-xl text-right">
                    <div className="text-base font-black text-[#6D5EF6]">{cat.product_count || 0}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Products</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                  {cat.description || 'No category description provided.'}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar size={13} />
                    <span>Created: {cat.created_at ? new Date(cat.created_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div>
                    <span>Order: <strong className="text-slate-700">#{cat.display_order || 1}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/admin/categories/${cat.id}/products`)}
                  className="bg-white hover:bg-slate-100 border border-slate-200 text-[#6D5EF6] hover:text-[#5b4ebf] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
                >
                  <Eye size={14} />
                  <span>View Products ({cat.product_count || 0})</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="p-2 text-slate-600 hover:text-[#6D5EF6] hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                    title="Edit Category"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleInitiateDelete(cat)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all"
                    title="Delete Category"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT CATEGORY MODAL */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {isEditModalOpen ? 'Edit Category' : '+ Add New Category'}
              </h3>
              <button 
                onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={isEditModalOpen ? handleEditSubmit : handleCreateSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Crafted Series"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed acoustic series description..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              {/* Category Image Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category Image</label>
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={20} />
                      </div>
                    )}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. crafted-series"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">SEO Optimization</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="SEO Title Tag"
                    value={formData.seo_title}
                    onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                  <textarea
                    rows={2}
                    placeholder="SEO Meta Description"
                    value={formData.seo_description}
                    onChange={e => setFormData({ ...formData, seo_description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5b4ebf] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {isEditModalOpen ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL WITH PRODUCT REASSIGNMENT */}
      {isDeleteModalOpen && deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            
            <div className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
                <AlertTriangle size={24} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">Delete Category: "{deletingCategory.name}"?</h3>

              {(deletingCategory.product_count || 0) > 0 ? (
                <div className="mt-3 space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                    <p className="font-bold">This category contains {deletingCategory.product_count} products.</p>
                    <p className="mt-1">What would you like to do with these products?</p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                      <input
                        type="radio"
                        name="deleteOpt"
                        checked={deleteOption === 'move'}
                        onChange={() => setDeleteOption('move')}
                        className="mt-0.5 text-[#6D5EF6] focus:ring-[#6D5EF6]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-800 block">Move products to another category</span>
                        <span className="text-slate-500 text-[11px]">Reassign all {deletingCategory.product_count} products safely.</span>
                        
                        {deleteOption === 'move' && (
                          <select
                            value={targetCategoryId}
                            onChange={e => setTargetCategoryId(e.target.value)}
                            className="mt-2 w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#6D5EF6]"
                          >
                            {categories
                              .filter(c => c.id !== deletingCategory.id)
                              .map(c => (
                                <option key={c.id} value={c.id}>
                                  {c.name} ({c.product_count || 0} existing products)
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                      <input
                        type="radio"
                        name="deleteOpt"
                        checked={deleteOption === 'unassign'}
                        onChange={() => setDeleteOption('unassign')}
                        className="mt-0.5 text-[#6D5EF6] focus:ring-[#6D5EF6]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-800 block">Remove category assignment</span>
                        <span className="text-slate-500 text-[11px]">Keep products in database without category assignment.</span>
                      </div>
                    </label>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 mt-2">Are you sure you want to delete this category? This action cannot be undone.</p>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => { setIsDeleteModalOpen(false); setDeletingCategory(null); }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={ConfirmCategoryDelete}
                disabled={isDeleting}
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REUSABLE MEDIA PICKER MODAL */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image_url: url })}
        selectedUrl={formData.image_url}
        title="Select Category Image"
      />

    </div>
  );
};
