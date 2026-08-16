import { Category, Product, MediaAsset } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  image_url?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  display_order?: number;
  seo_title?: string;
  seo_description?: string;
}

export interface CategoryDeletePayload {
  action?: 'move_products' | 'unassign' | 'cancel';
  target_category_id?: string;
}

export interface ProductPayload {
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  base_price: number;
  compare_at_price?: number;
  category_id?: string;
  category?: string;
  hsn_code?: string;
  gst_percentage?: number;
  barcode?: string;
  video_url?: string;
  image_url?: string;
  status?: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_best_seller?: boolean;
  is_trending?: boolean;
  sku?: string;
  variant_name?: string;
  material?: string;
  color?: string;
  stock_quantity?: number;
  images?: { url: string; alt_text?: string; is_primary?: boolean }[];
}

export const apiService = {
  // Category Endpoints
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/categories/`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (err) {
      console.warn('API getCategories error, falling back to local state:', err);
      throw err;
    }
  },

  async createCategory(payload: CategoryPayload): Promise<Category> {
    const res = await fetch(`${API_BASE_URL}/products/categories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to create category');
    }
    return await res.json();
  },

  async updateCategory(id: string, payload: Partial<CategoryPayload>): Promise<Category> {
    const res = await fetch(`${API_BASE_URL}/products/categories/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to update category');
    }
    return await res.json();
  },

  async deleteCategory(id: string, payload?: CategoryDeletePayload): Promise<{ requires_action?: boolean; message?: string; product_count?: number }> {
    const res = await fetch(`${API_BASE_URL}/products/categories/${id}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 400 && data.requires_action) {
        return data;
      }
      throw new Error(data.error || 'Failed to delete category');
    }
    return data;
  },

  async getCategoryProducts(id: string): Promise<{ category: Category; product_count: number; products: Product[] }> {
    const res = await fetch(`${API_BASE_URL}/products/categories/${id}/products/`);
    if (!res.ok) throw new Error('Failed to fetch category products');
    return await res.json();
  },

  // Product Endpoints
  async getProducts(categoryId?: string): Promise<Product[]> {
    const url = categoryId ? `${API_BASE_URL}/products/?category=${categoryId}` : `${API_BASE_URL}/products/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  },

  async createProduct(payload: ProductPayload): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to create product');
    }
    return await res.json();
  },

  // Media Library Endpoints
  async getMedia(source?: string, folder?: string): Promise<MediaAsset[]> {
    const fallbackPublicAssets: MediaAsset[] = [
      {
        id: 'public-crochet_bookmarks.png',
        filename: 'crochet_bookmarks.png',
        url: '/crochet_bookmarks.png',
        file_type: 'image',
        size_bytes: 1187647,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'crochet_bookmarks.png',
      },
      {
        id: 'public-earbuds-black.png',
        filename: 'earbuds-black.png',
        url: '/images/earbuds-black.png',
        file_type: 'image',
        size_bytes: 1258291,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'earbuds-black.png',
      },
      {
        id: 'public-earbuds-white.png',
        filename: 'earbuds-white.png',
        url: '/images/earbuds-white.png',
        file_type: 'image',
        size_bytes: 1258291,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'earbuds-white.png',
      },
      {
        id: 'public-crafted-banner.jpg',
        filename: 'crafted-banner.jpg',
        url: '/images/crafted-banner.jpg',
        file_type: 'image',
        size_bytes: 2516582,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'crafted-banner.jpg',
      },
      {
        id: 'public-unisex-banner.jpg',
        filename: 'unisex-banner.jpg',
        url: '/images/unisex-banner.jpg',
        file_type: 'image',
        size_bytes: 2516582,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'unisex-banner.jpg',
      },
      {
        id: 'public-aurelia-gold-cuff-18k.jpg',
        filename: 'aurelia-gold-cuff-18k.jpg',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        file_type: 'image',
        size_bytes: 1258291,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'aurelia-gold-cuff-18k.jpg',
      },
      {
        id: 'public-celeste-diamond-drops.jpg',
        filename: 'celeste-diamond-drops.jpg',
        url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
        file_type: 'image',
        size_bytes: 2516582,
        source: 'PUBLIC_ASSET',
        folder: 'Public Assets',
        alt_text: 'celeste-diamond-drops.jpg',
      },
    ];

    try {
      let url = `${API_BASE_URL}/cms/media/`;
      const params = new URLSearchParams();
      if (source) params.append('source', source);
      if (folder) params.append('folder', folder);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch media assets');
      const data: MediaAsset[] = await res.json();
      
      // Ensure local public assets are included if not present
      const filenames = new Set(data.map(d => d.filename));
      const missingPublic = fallbackPublicAssets.filter(f => !filenames.has(f.filename));
      const combined = [...data, ...missingPublic];

      if (source && source !== 'ALL') {
        return combined.filter(m => m.source === source);
      }
      return combined;
    } catch (err) {
      console.warn('Backend media API error, using local public asset list:', err);
      if (source && source !== 'ALL') {
        return fallbackPublicAssets.filter(m => m.source === source);
      }
      return fallbackPublicAssets;
    }
  },

  async uploadMedia(file: File, folder: string = 'Uploaded', altText?: string): Promise<MediaAsset> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (altText) formData.append('alt_text', altText);

    const res = await fetch(`${API_BASE_URL}/cms/media/upload/`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to upload media file');
    }
    return await res.json();
  },

  async deleteMedia(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/cms/media/${id}/`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to delete media asset');
    }
  }
};
