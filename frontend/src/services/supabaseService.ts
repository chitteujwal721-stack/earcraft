import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Product, Category, Collection } from '../types';
import { mockCategories, mockCollections, mockProducts } from './mockData';

/**
 * Uploads a file to a Supabase Storage bucket and returns the public URL.
 * Defaults to 'product-images' bucket or 'media'.
 */
export const uploadMediaToSupabase = async (
  file: File,
  bucketName = 'product-images',
  folderPath = 'uploads'
): Promise<{ url: string | null; error: string | null }> => {
  if (!isSupabaseConfigured()) {
    return {
      url: null,
      error: 'Supabase credentials are not configured in environment variables.'
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    console.error('Failed to upload file to Supabase:', err);
    return { url: null, error: err.message || 'Upload failed' };
  }
};

/**
 * Fetches all categories from Supabase with fallback to mock data.
 */
export const fetchCategories = async (): Promise<Category[]> => {
  if (!isSupabaseConfigured()) {
    return mockCategories;
  }

  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error || !data || data.length === 0) {
      console.warn('Supabase categories empty or failed, using mock fallback:', error);
      return mockCategories;
    }
    return data.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image_url,
      parent_id: cat.parent_id
    }));
  } catch {
    return mockCategories;
  }
};

/**
 * Fetches all collections from Supabase with fallback to mock data.
 */
export const fetchCollections = async (): Promise<Collection[]> => {
  if (!isSupabaseConfigured()) {
    return mockCollections;
  }

  try {
    const { data, error } = await supabase.from('collections').select('*');
    if (error || !data || data.length === 0) {
      console.warn('Supabase collections empty or failed, using mock fallback:', error);
      return mockCollections;
    }
    return data;
  } catch {
    return mockCollections;
  }
};

/**
 * Fetches all products with variants and images from Supabase with fallback to mock data.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    return mockProducts;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*),
        collections (*),
        product_variants (*),
        product_images (*)
      `);

    if (error || !data || data.length === 0) {
      console.warn('Supabase products empty or failed, using mock fallback:', error);
      return mockProducts;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      subtitle: item.subtitle || '',
      description: item.description,
      story: item.story,
      craftsmanship_details: item.craftsmanship_details,
      hsn_code: item.hsn_code,
      gst_percentage: Number(item.gst_percentage || 3.0),
      barcode: item.barcode,
      category: item.categories ? {
        id: item.categories.id,
        name: item.categories.name,
        slug: item.categories.slug,
        description: item.categories.description,
        image: item.categories.image_url
      } : mockCategories[0],
      collection: item.collections ? {
        id: item.collections.id,
        title: item.collections.title,
        slug: item.collections.slug,
        tagline: item.collections.tagline,
        hero_image: item.collections.hero_image,
        description: item.collections.description,
        is_featured: item.collections.is_featured
      } : undefined,
      base_price: Number(item.base_price),
      compare_at_price: item.compare_at_price ? Number(item.compare_at_price) : undefined,
      is_featured: Boolean(item.is_featured),
      is_new_arrival: Boolean(item.is_new_arrival),
      is_best_seller: Boolean(item.is_best_seller),
      is_trending: Boolean(item.is_trending),
      avg_rating: Number(item.avg_rating || 5.0),
      review_count: Number(item.review_count || 0),
      images: (item.product_images || []).map((img: any) => ({
        id: img.id,
        url: img.url,
        alt_text: img.alt_text || item.title,
        is_primary: Boolean(img.is_primary),
        order: img.sort_order || 0
      })),
      variants: (item.product_variants || []).map((v: any) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        material: v.material,
        color: v.color,
        price: Number(v.price),
        compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : undefined,
        stock_quantity: v.stock_quantity,
        is_available: Boolean(v.is_available)
      })),
      reviews: [],
      questions: [],
      created_at: item.created_at
    }));
  } catch (err) {
    console.error('Failed to fetch products from Supabase:', err);
    return mockProducts;
  }
};
