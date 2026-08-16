export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'EDITOR' | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: Role;
  avatar?: string;
  is_email_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  image_url?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  display_order?: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
  product_count?: number;
  parent_id?: string | null;
  subcategories?: Category[];
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  hero_image?: string;
  description?: string;
  is_featured: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  material: string;
  color: string;
  price: number;
  compare_at_price?: number;
  stock_quantity: number;
  weight_grams?: number;
  is_available: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface ProductReview {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  is_verified_buyer: boolean;
  created_at: string;
  helpful_count: number;
}

export interface ProductQuestion {
  id: string;
  question: string;
  asked_by: string;
  answer?: string;
  answered_at?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  story?: string;
  craftsmanship_details?: string;
  hsn_code?: string;
  gst_percentage: number;
  barcode?: string;
  category: Category;
  collection?: Collection;
  base_price: number;
  compare_at_price?: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_trending: boolean;
  images: ProductImage[];
  video_url?: string;
  three_sixty_images?: string[];
  variants: ProductVariant[];
  avg_rating: number;
  review_count: number;
  reviews: ProductReview[];
  questions: ProductQuestion[];
  related_products?: Product[];
  frequently_bought_together?: Product[];
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';
export type PaymentMethod = 'CARD' | 'UPI' | 'STRIPE' | 'RAZORPAY' | 'COD';

export interface OrderItem {
  id: string;
  product_title: string;
  variant_sku: string;
  variant_name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: Address;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax_total: number;
  shipping_fee: number;
  discount_total: number;
  grand_total: number;
  payment_method: PaymentMethod;
  is_paid: boolean;
  tracking_number?: string;
  courier_partner?: string;
  estimated_delivery?: string;
  timeline: { status: OrderStatus; timestamp: string; note?: string }[];
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  expiry_date: string;
  is_active: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
  background_video?: string;
  is_active: boolean;
  order: number;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  text: string;
  link?: string;
  countdown_end?: string;
  background_color: string;
  text_color: string;
}

export interface SiteSettings {
  logo_url: string;
  brand_name: string;
  tagline: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  social_facebook?: string;
  social_instagram?: string;
  social_pinterest?: string;
  social_twitter?: string;
  theme_mode: 'dark' | 'light' | 'system';
  primary_color: string;
  accent_gold: string;
  tax_rate_percent: number;
  free_shipping_threshold: number;
  cod_enabled: boolean;
  stripe_enabled: boolean;
  razorpay_enabled: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published_at: string;
  category: string;
  read_time_minutes: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  location: string;
  avatar?: string;
  rating: number;
  quote: string;
  purchased_item?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  caption: string;
  instagram_link?: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  file_path?: string;
  file_type: 'image' | 'video' | 'document';
  mime_type?: string;
  size_bytes: number;
  width?: number | null;
  height?: number | null;
  source: 'PUBLIC_ASSET' | 'UPLOADED';
  folder: string;
  alt_text?: string;
  created_at?: string | null;
}

export interface WhyFeature {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface ShowcaseAngle {
  id: string;
  label: string;
  img: string;
}

export interface LifestyleBannerConfig {
  badge: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
}

export interface CollectionHeaderConfig {
  badge: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
}

