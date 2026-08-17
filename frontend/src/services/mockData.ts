import { Product, Category, Collection, Order, Coupon, HeroSlide, AnnouncementBarConfig, SiteSettings, Blog, Testimonial, FAQItem, GalleryItem, WhyFeature, ShowcaseAngle, LifestyleBannerConfig, CollectionHeaderConfig } from '../types';


export const mockCategories: Category[] = [
  {
    id: 'cat-crafted',
    name: 'Crafted Series',
    slug: 'crafted-series',
    description: 'Signature acoustic monitors, graphene driver architecture, and bespoke materials.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sub-crafted-1', name: 'Premium Collection', slug: 'premium-collection' },
      { id: 'sub-crafted-2', name: 'Signature EarCraft Products', slug: 'signature-earcraft' },
    ]
  },
  {
    id: 'cat-unisex',
    name: 'Unisex Series',
    slug: 'unisex-series',
    description: 'Everyday universal audio, ultra-light ergonomics, transparent shells, and effortless style.',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sub-unisex-1', name: 'Everyday Collection', slug: 'everyday-collection' },
      { id: 'sub-unisex-2', name: 'Universal Collection', slug: 'universal-collection' },
    ]
  }
];

export const mockCollections: Collection[] = [
  {
    id: 'col-crafted',
    title: 'Crafted Series',
    slug: 'crafted-series',
    tagline: 'Crafted to Shine. Signature Acoustic Precision.',
    hero_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80',
    description: 'Engineered with 45dB Hybrid ANC, 10mm Graphene Drivers, and space-grade materials.',
    is_featured: true,
  },
  {
    id: 'col-unisex',
    title: 'Unisex Series',
    slug: 'unisex-series',
    tagline: 'Designed for Everyday Style. Engineered for Exceptional Sound.',
    hero_image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1600&q=80',
    description: 'Universal ergonomic acoustic geometry for everyday comfort and uninterrupted sound.',
    is_featured: true,
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-crafted-drop',
    title: 'Crafted Drop',
    slug: 'crafted-drop',
    subtitle: 'Signature Acoustic Drop Edition with 45dB Hybrid ANC',
    description: 'The Crafted Drop features bespoke acoustic architecture and handcrafted drop styling. Engineered for crystal-clear vocals, ultra-low latency, and immersive sound.',
    story: 'Designed in our audio laboratories for trendsetters who demand acoustic precision alongside luxury jewelry design.',
    craftsmanship_details: 'Handcrafted metallic drop finish, capacitive touch controls, 36-hour total battery.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567801',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2499,
    compare_at_price: 3499,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-crafted-drop', url: '/crafted-drop.png', alt_text: 'Crafted Drop', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-cd-1', sku: 'EC-CRF-DROP', name: 'Signature Silver', material: 'Crafted Alloy', color: '#E5E7EB', price: 2499, stock_quantity: 25, is_available: true }
    ],
    avg_rating: 4.9,
    review_count: 84,
    reviews: [],
    questions: [],
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'prod-crafted-diamond',
    title: 'Crafted Diamond',
    slug: 'crafted-diamond',
    subtitle: 'Bespoke Diamond Facet Edition with Graphene Drivers',
    description: 'Featuring precision diamond-cut acoustic casing and high-fidelity sound stage output.',
    story: 'Meticulously crafted to reflect light like fine jewelry while delivering uncompressed high-resolution audio.',
    craftsmanship_details: 'Diamond-facet polished casing, IPX5 water resistance, gold-plated charging contacts.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567802',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2999,
    compare_at_price: 3999,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-crafted-diamond', url: '/crafted_Diamond.png', alt_text: 'Crafted Diamond', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-cd-2', sku: 'EC-CRF-DMND', name: 'Diamond Silver', material: 'Diamond Polished Alloy', color: '#F6F7F9', price: 2999, stock_quantity: 20, is_available: true }
    ],
    avg_rating: 5.0,
    review_count: 112,
    reviews: [],
    questions: [],
    created_at: '2026-08-02T00:00:00Z',
  },
  {
    id: 'prod-crafted-florat',
    title: 'Crafted Florat',
    slug: 'crafted-florat',
    subtitle: 'Botanical Floral Inspired Acoustic Earbuds',
    description: 'An elegant floral motif meets studio reference audio tuning for lightweight comfort and style.',
    story: 'Inspired by botanical aesthetics and crafted for all-day comfort and warmth in every track.',
    craftsmanship_details: 'Hypoallergenic silicone eartips, custom driver crossover, touch active control.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567803',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2499,
    compare_at_price: 3299,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: false,
    is_trending: true,
    images: [
      { id: 'img-crafted-florat', url: '/crafted_florat.png', alt_text: 'Crafted Florat', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-cd-3', sku: 'EC-CRF-FLRT', name: 'Rose Gold Floral', material: 'Anodized Alloy', color: '#E8B4B8', price: 2499, stock_quantity: 18, is_available: true }
    ],
    avg_rating: 4.8,
    review_count: 65,
    reviews: [],
    questions: [],
    created_at: '2026-08-03T00:00:00Z',
  },
  {
    id: 'prod-crafted-fly',
    title: 'Crafted Fly',
    slug: 'crafted-fly',
    subtitle: 'Aerodynamic Wing Edition for Active Lifestyle',
    description: 'Aerodynamic featherlight geometry engineered for secure fit, deep bass response, and active movement.',
    story: 'Designed for fluid movement and uncompromising sound quality during work, gym, or travel.',
    craftsmanship_details: 'Ultra-lightweight polymer wing, dual mic noise suppression, 40-hour playback.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567804',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2799,
    compare_at_price: 3699,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_trending: true,
    images: [
      { id: 'img-crafted-fly', url: '/crafted_fly.png', alt_text: 'Crafted Fly', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-cd-4', sku: 'EC-CRF-FLY', name: 'Wings Silver', material: 'Space Grade Alloy', color: '#111111', price: 2799, stock_quantity: 15, is_available: true }
    ],
    avg_rating: 4.9,
    review_count: 48,
    reviews: [],
    questions: [],
    created_at: '2026-08-04T00:00:00Z',
  },
  {
    id: 'prod-crafted-knot',
    title: 'Crafted Knot',
    slug: 'crafted-knot',
    subtitle: 'Intertwined Infinity Knot Acoustic Design',
    description: 'Symbolizing strength and infinity, the Crafted Knot blends sculptured artwork with 10mm dynamic drivers.',
    story: 'Intertwined craftsmanship designed to accent your personal style while surrounding you in rich acoustic harmony.',
    craftsmanship_details: 'Infinity knot charm attachment, 45dB ANC, Qi wireless charging support.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567805',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2499,
    compare_at_price: 3499,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-crafted-knot', url: '/crafted_knot.png', alt_text: 'Crafted Knot', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-cd-5', sku: 'EC-CRF-KNOT', name: 'Silver Knot', material: 'Crafted Alloy', color: '#6D5EF6', price: 2499, stock_quantity: 30, is_available: true }
    ],
    avg_rating: 5.0,
    review_count: 92,
    reviews: [],
    questions: [],
    created_at: '2026-08-05T00:00:00Z',
  },
  {
    id: 'prod-golden-crafted-diamond',
    title: 'Golden Crafted Diamond',
    slug: 'golden-crafted-diamond',
    subtitle: 'Bespoke 24K Gold Diamond Facet Edition with Graphene Drivers',
    description: 'Featuring precision 24K gold-plated diamond-cut acoustic casing and high-fidelity sound stage output.',
    story: 'Meticulously crafted with 24K gold finish to reflect light like fine jewelry while delivering uncompressed high-resolution audio.',
    craftsmanship_details: '24K Gold diamond-facet polished casing, IPX5 water resistance, gold-plated charging contacts.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567806',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 3499,
    compare_at_price: 4499,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-golden-crafted-diamond', url: '/goldencolor/golden_crafted_diamond.png', alt_text: 'Golden Crafted Diamond', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-gcd-1', sku: 'EC-CRF-GLD-DMND', name: '24K Golden Diamond', material: '24K Gold Plated Alloy', color: '#D4AF37', price: 3499, stock_quantity: 15, is_available: true }
    ],
    avg_rating: 5.0,
    review_count: 78,
    reviews: [],
    questions: [],
    created_at: '2026-08-10T00:00:00Z',
  },
  {
    id: 'prod-golden-crafted-drop',
    title: 'Golden Crafted Drop',
    slug: 'golden-crafted-drop',
    subtitle: 'Signature Golden Acoustic Drop Edition with 45dB Hybrid ANC',
    description: 'The Golden Crafted Drop features bespoke acoustic architecture in a radiant 24K gold finish. Engineered for crystal-clear vocals, ultra-low latency, and immersive sound.',
    story: 'Designed in our audio laboratories for trendsetters who demand acoustic precision alongside luxurious golden jewelry aesthetics.',
    craftsmanship_details: 'Handcrafted 24K gold-tone drop finish, capacitive touch controls, 36-hour total battery.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567807',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2999,
    compare_at_price: 3999,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-golden-crafted-drop', url: '/goldencolor/golden_crafted_draft.png', alt_text: 'Golden Crafted Drop', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-gcd-2', sku: 'EC-CRF-GLD-DROP', name: '24K Golden Drop', material: '24K Gold Plated Alloy', color: '#FFD700', price: 2999, stock_quantity: 20, is_available: true }
    ],
    avg_rating: 4.9,
    review_count: 65,
    reviews: [],
    questions: [],
    created_at: '2026-08-11T00:00:00Z',
  },
  {
    id: 'prod-golden-crafted-florat',
    title: 'Golden Crafted Florat',
    slug: 'golden-crafted-florat',
    subtitle: 'Botanical Floral Inspired Golden Acoustic Earbuds',
    description: 'An elegant gold-adorned floral motif meets studio reference audio tuning for lightweight comfort and luxury styling.',
    story: 'Inspired by botanical aesthetics and crafted with 24K gold accents for all-day comfort and warmth in every track.',
    craftsmanship_details: 'Hypoallergenic eartips, gold-anodized alloy chassis, custom driver crossover, active touch control.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567808',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 2999,
    compare_at_price: 3899,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_trending: true,
    images: [
      { id: 'img-golden-crafted-florat', url: '/goldencolor/golden_crafted_florat.png', alt_text: 'Golden Crafted Florat', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-gcd-3', sku: 'EC-CRF-GLD-FLRT', name: '24K Golden Floral', material: '24K Gold Anodized Alloy', color: '#E6CA65', price: 2999, stock_quantity: 18, is_available: true }
    ],
    avg_rating: 4.9,
    review_count: 52,
    reviews: [],
    questions: [],
    created_at: '2026-08-12T00:00:00Z',
  },
  {
    id: 'prod-unisex-classic-black',
    title: 'Unisex Classic Black',
    slug: 'unisex-classic-black',
    subtitle: 'Classic Black Ergonomic Fit & Crisp Audio',
    description: 'Minimalist classic black acoustic earpieces designed for universal everyday comfort and high-definition sound output.',
    story: 'Crafted for effortless daily wear, offering balanced acoustics and clean classic style for everyone.',
    craftsmanship_details: 'Lightweight ergonomic fit, touch controls, IPX4 splash resistance.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567806',
    category: mockCategories[1],
    collection: mockCollections[1],
    base_price: 1499,
    compare_at_price: 2199,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-unisex-classic-black', url: '/unisex/unisex_Classic black.png', alt_text: 'Unisex Classic Black', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-uk-1', sku: 'EC-UNI-CLS-BLK', name: 'Classic Black', material: 'Ergonomic Polymer', color: '#111111', price: 1499, stock_quantity: 40, is_available: true }
    ],
    avg_rating: 4.8,
    review_count: 76,
    reviews: [],
    questions: [],
    created_at: '2026-08-06T00:00:00Z',
  }
];

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'CRAFTED TO SHINE',
    subtitle: 'Designed for Everyday Style. Engineered for Exceptional Sound.',
    cta_text: 'Explore Crafted',
    cta_link: '/shop?series=crafted',
    background_image: '/crafted-drop.png',
    is_active: true,
    order: 1,
  }
];

export const mockAnnouncementBar: AnnouncementBarConfig = {
  enabled: true,
  text: 'COMPLIMENTARY EXPRESS INSURED SHIPPING ON ALL EARCRAFT ORDERS — CODE: SHINE2026',
  link: '/shop',
  background_color: '#F6F7F9',
  text_color: '#6D5EF6',
};

export const mockSiteSettings: SiteSettings = {
  logo_url: '/logo.png',
  brand_name: 'EARCRAFT',
  tagline: 'Crafted to Shine. Exceptional Sound.',
  contact_email: 'concierge@earcraft.com',
  contact_phone: '+91 (0) 800-EAR-CRAFT',
  address: 'EarCraft Acoustic Labs, Tech Plaza, London / Mumbai / Tokyo',
  social_instagram: 'https://www.instagram.com/_earcraft_?igsh=MWlhc2FsaDlwaWN1Zg==&igsi=MWlhc2FsaDlwaWN1Zg==',
  social_facebook: 'https://facebook.com/earcraft.audio',
  social_pinterest: 'https://pinterest.com/earcraft',
  theme_mode: 'light',
  primary_color: '#111111',
  accent_gold: '#6D5EF6',
  tax_rate_percent: 18,
  free_shipping_threshold: 15000,
  cod_enabled: true,
  stripe_enabled: true,
  razorpay_enabled: true,
};

export const mockOrders: Order[] = [
  {
    id: 'ord-1001',
    order_number: 'EC-AUDIO-8891',
    customer_name: 'Victoria Sterling',
    customer_email: 'victoria@sterlingluxe.com',
    customer_phone: '+91 98765 43210',
    shipping_address: {
      id: 'addr-1',
      name: 'Victoria Sterling',
      phone: '+91 98765 43210',
      street: 'Penthouse A, Palladium Towers, High Street Phoenix',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postal_code: '400013',
      is_default: true,
    },
    status: 'SHIPPED',
    items: [
      {
        id: 'oi-1',
        product_title: 'EarCraft Apex Pro (Crafted Series)',
        variant_sku: 'EC-CRF-APX-BLK',
        variant_name: 'Obsidian Black',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
        price: 19900,
        quantity: 1,
        subtotal: 19900,
      }
    ],
    subtotal: 19900,
    tax_total: 3582,
    shipping_fee: 0,
    discount_total: 1990,
    grand_total: 21492,
    payment_method: 'RAZORPAY',
    is_paid: true,
    tracking_number: 'BLUEDART-88192031',
    courier_partner: 'Blue Dart Insured Express',
    estimated_delivery: '2026-08-08',
    timeline: [
      { status: 'PENDING', timestamp: '2026-08-03T10:15:00Z', note: 'Order placed by customer' },
      { status: 'PROCESSING', timestamp: '2026-08-03T10:30:00Z', note: 'Payment verified via Razorpay' },
      { status: 'PACKED', timestamp: '2026-08-04T09:00:00Z', note: 'Sealed in EarCraft luxury hardcase' },
      { status: 'SHIPPED', timestamp: '2026-08-04T16:45:00Z', note: 'Handed over to Blue Dart Express' },
    ],
    created_at: '2026-08-03T10:15:00Z',
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: 'coup-1',
    code: 'SHINE2026',
    discount_type: 'PERCENTAGE',
    discount_value: 10,
    min_order_amount: 10000,
    expiry_date: '2026-12-31',
    is_active: true,
  },
  {
    id: 'coup-2',
    code: 'APEX5000',
    discount_type: 'FIXED',
    discount_value: 5000,
    min_order_amount: 25000,
    expiry_date: '2026-12-31',
    is_active: true,
  }
];

export const mockBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Acoustic Engineering Behind 45dB ANC',
    slug: 'acoustic-engineering-behind-45db-anc',
    author: 'Dr. Julian Vance, Head of Acoustics',
    excerpt: 'How dual feedforward and feedback microphones calculate anti-waves at 192,000 samples per second.',
    content: `Active Noise Cancellation (ANC) relies on destructive sound wave interference. At EarCraft, our dual internal-external microphones capture ambient environmental noise in real-time.\n\nOur neural DSP chip calculates the exact inverted phase anti-wave, neutralizing background hum while preserving uncompressed dynamic range.`,
    cover_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    published_at: '2026-07-20T00:00:00Z',
    category: 'Acoustic Science',
    read_time_minutes: 5,
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    customer_name: 'Marcus Thorne',
    location: 'London, UK',
    rating: 5,
    quote: 'The active noise cancellation completely blew me away. Beats my AirPods Pro 2 in soundstage expansion and sub-bass clarity.',
    purchased_item: 'EarCraft Apex Pro (Crafted Series)',
  },
  {
    id: 'test-2',
    customer_name: 'Ananya Sharma',
    location: 'Bengaluru, India',
    rating: 5,
    quote: 'The transparent polycarbonate chassis looks exceptionally refined. Audio quality is true audiophile tier.',
    purchased_item: 'Translucent Edition (Unisex Series)',
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does the battery last on a single charge?',
    answer: 'EarCraft Apex Pro earbuds deliver up to 8.5 hours of playback with ANC enabled, and up to 40 total hours with the wireless Qi charging case.',
    category: 'Battery & Charging',
  },
  {
    id: 'faq-2',
    question: 'Are EarCraft products compatible with iOS, Android, and Mac/PC?',
    answer: 'Yes! Equipped with Bluetooth 5.4 and Instant Multipoint Connect, EarCraft seamlessly switches between your phone, laptop, and tablet.',
    category: 'Connectivity',
  },
  {
    id: 'faq-3',
    question: 'What is the difference between Crafted Series and Unisex Series?',
    answer: 'Crafted Series focuses on signature audio engineering, graphene drivers, 45dB hybrid ANC, and bespoke materials. Unisex Series offers universal ergonomic daily comfort, ultra-light design, and versatile everyday style.',
    category: 'Product Lineup',
  }
];

export const mockGalleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    title: 'Crafted Series Apex Pro',
    caption: 'Curated by @earcraft_audio',
    instagram_link: 'https://instagram.com',
  },
  {
    id: 'gal-2',
    image_url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
    title: 'Unisex Series Translucent',
    caption: 'Universal acoustic geometry',
    instagram_link: 'https://instagram.com',
  }
];

export const mockWhyFeatures: WhyFeature[] = [
  { id: 'wf-1', icon: 'Sliders', title: 'Premium Design', desc: 'Crafted from space-grade anodized aluminum & optical glass.' },
  { id: 'wf-2', icon: 'Volume2', title: 'Crystal Clear Audio', desc: 'Custom 10mm Graphene diaphragms with sub-bass down to 15Hz.' },
  { id: 'wf-3', icon: 'Wifi', title: 'Bluetooth Connectivity', desc: 'Bluetooth 5.4 multipoint pairing with 0.03s ultra-low latency.' },
  { id: 'wf-4', icon: 'ShieldCheck', title: 'ENC Noise Cancellation', desc: '45dB Hybrid Active isolation with real-time neural sound processing.' },
  { id: 'wf-5', icon: 'BatteryCharging', title: 'Long Battery Life', desc: '8.5 hours continuous playback + 31.5 hours in wireless Qi case.' },
  { id: 'wf-6', icon: 'Zap', title: 'Fast Charging', desc: '10 minutes of Type-C fast charge yields 4 hours of listening.' },
  { id: 'wf-7', icon: 'Feather', title: 'Comfort Fit', desc: 'Ultra-light ergonomic footprint (3.8g - 4.2g per earbud).' },
  { id: 'wf-8', icon: 'Gem', title: 'Premium Materials', desc: 'Zirconia ceramic, sapphire glass touch sensors, and hypoallergenic eartips.' },
];

export const mockShowcaseAngles: ShowcaseAngle[] = [
  { id: 'ang-1', label: 'Front Chassis', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80' },
  { id: 'ang-2', label: 'Acoustic Driver', img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80' },
  { id: 'ang-3', label: 'Charging Dock', img: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80' }
];

export const mockLifestyleBanner: LifestyleBannerConfig = {
  badge: 'Luxury Sound Experience',
  title: 'Immerse Yourself in Pure Studio Fidelity',
  subtitle: 'Experience uncompressed audio clarity, zero background distraction, and everyday elegance.',
  cta_text: 'Order Your EarCraft Earbuds',
  cta_link: '/shop',
  image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=2000&q=80'
};

export const mockCraftedHeader: CollectionHeaderConfig = {
  badge: 'Signature Collection',
  title: 'Crafted Series',
  description: 'Signature EarCraft acoustic monitors engineered with 45dB Active Noise Cancellation, graphene drivers, and bespoke finishes.',
  cta_text: 'Explore Crafted Series',
  cta_link: '/shop?series=crafted'
};

export const mockUnisexHeader: CollectionHeaderConfig = {
  badge: 'Everyday Collection',
  title: 'Unisex Series',
  description: 'Universal acoustic geometry designed for everyday style, all-day comfort, transparent cybernetic shells, and seamless connectivity.',
  cta_text: 'Explore Unisex Series',
  cta_link: '/shop?series=unisex'
};

