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
    id: 'prod-1',
    title: 'EarCraft Apex Pro (Crafted Series)',
    slug: 'earcraft-apex-pro-wireless-earbuds',
    subtitle: '45dB Hybrid Active Noise Cancellation & 10mm Graphene Drivers',
    description: 'The flagship of the Crafted Series fuses bespoke acoustic architecture with 45dB Active Noise Cancellation. Featuring Bluetooth 5.4 low latency, dual HD beamforming mics, and 40-hour combined playback.',
    story: 'Designed in our audio laboratories to rival prestige studio monitors. Each earbud is calibrated using high-precision soundstage tuning for deep sub-bass and crystal-clear vocals.',
    craftsmanship_details: 'Space-grade aluminum hinge, capacitive glass touch sensor, soft silicone eartips (S/M/L included). Weight: 4.2g per earbud.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567800',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 19900,
    compare_at_price: 24900,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80', alt_text: 'EarCraft Apex Pro Obsidian Black', is_primary: true, order: 1 },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80', alt_text: 'EarCraft Apex Pro Translucent Glass', is_primary: false, order: 2 },
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80', alt_text: 'EarCraft Charging Case Open', is_primary: false, order: 3 },
    ],
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-headphones-listening-to-music-40540-large.mp4',
    three_sixty_images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'var-1', sku: 'EC-CRF-APX-BLK', name: 'Obsidian Black', material: 'Space-grade Aluminum & Graphene', color: '#111111', price: 19900, compare_at_price: 24900, stock_quantity: 45, is_available: true },
      { id: 'var-2', sku: 'EC-CRF-APX-WHT', name: 'Porcelain White', material: 'Ceramic Composite & Graphene', color: '#FFFFFF', price: 19900, compare_at_price: 24900, stock_quantity: 28, is_available: true },
      { id: 'var-3', sku: 'EC-CRF-APX-VIO', name: 'Electric Violet', material: 'Anodized Alloy', color: '#6D5EF6', price: 21900, compare_at_price: 26900, stock_quantity: 15, is_available: true },
    ],
    avg_rating: 4.9,
    review_count: 142,
    reviews: [
      {
        id: 'rev-1',
        user_name: 'David K. — Sound Engineer',
        rating: 5,
        comment: 'The noise cancellation completely neutralizes aircraft cabin drone, and the sub-bass resolution down to 15Hz is breathtaking.',
        is_verified_buyer: true,
        created_at: '2026-08-01T10:00:00Z',
        helpful_count: 34,
      },
      {
        id: 'rev-2',
        user_name: 'Sophia L. — Architect',
        rating: 5,
        comment: 'Minimalist luxury at its peak. The aluminum hinge motion and soft violet accent lighting feel exceptionally premium.',
        is_verified_buyer: true,
        created_at: '2026-07-28T16:30:00Z',
        helpful_count: 19,
      }
    ],
    questions: [
      {
        id: 'q-1',
        question: 'Does it support Qi wireless charging?',
        asked_by: 'Alex M.',
        answer: 'Yes! The EarCraft Apex Pro case supports both wireless Qi charging pads and Fast USB-C charging.',
        answered_at: '2026-07-25T11:00:00Z'
      }
    ],
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'prod-2',
    title: 'EarCraft Soundmaster Studio (Crafted Series)',
    slug: 'earcraft-soundmaster-studio',
    subtitle: '96kHz/24bit LDAC Lossless Audio & Zirconia Ceramic Chambers',
    description: 'Precision acoustic tuning for purists seeking uncompressed studio reference playback. Part of the Crafted Series signature collection.',
    story: 'Engineered with dual hybrid armature drivers and dynamic crossover circuits for zero phase distortion.',
    craftsmanship_details: 'Zirconia Ceramic Casing, Gold Plated Charging Pins, IPX5 Water Resistance.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567802',
    category: mockCategories[0],
    collection: mockCollections[0],
    base_price: 24900,
    compare_at_price: 29900,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_trending: true,
    images: [
      { id: 'img-5', url: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80', alt_text: 'EarCraft Soundmaster Studio Ceramic', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-6', sku: 'EC-CRF-STD-CRM', name: 'Zirconia Matte White', material: 'Zirconia Ceramic', color: '#F6F7F9', price: 24900, stock_quantity: 18, is_available: true },
      { id: 'var-7', sku: 'EC-CRF-STD-BLK', name: 'Midnight Charcoal', material: 'Zirconia Ceramic', color: '#111111', price: 24900, stock_quantity: 12, is_available: true }
    ],
    avg_rating: 5.0,
    review_count: 64,
    reviews: [],
    questions: [],
    created_at: '2026-05-10T00:00:00Z',
  },
  {
    id: 'prod-3',
    title: 'EarCraft Translucent Edition (Unisex Series)',
    slug: 'earcraft-translucent-edition',
    subtitle: 'Transparent Cybernetic Acoustic Shell & Universal Fit',
    description: 'Showcasing internal acoustic circuitry and driver magnets through a scratch-resistant polycarbonate glass chassis. Designed for universal everyday style.',
    story: 'Conceived for purists who appreciate minimalist transparency, structural geometry, and all-day comfort.',
    craftsmanship_details: 'Optical Grade Polycarbonate, 10mm Dynamic Drivers, 38-Hour Total Battery.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567801',
    category: mockCategories[1],
    collection: mockCollections[1],
    base_price: 14900,
    compare_at_price: 18900,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_trending: true,
    images: [
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80', alt_text: 'EarCraft Translucent Edition', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-4', sku: 'EC-UNI-TRN-CLR', name: 'Ghost Clear Glass', material: 'Polycarbonate Glass', color: '#E5E7EB', price: 14900, stock_quantity: 20, is_available: true },
      { id: 'var-5', sku: 'EC-UNI-TRN-VIO', name: 'Soft Tinted Violet', material: 'Polycarbonate Glass', color: '#6D5EF6', price: 14900, stock_quantity: 12, is_available: true }
    ],
    avg_rating: 4.8,
    review_count: 88,
    reviews: [],
    questions: [],
    created_at: '2026-06-15T00:00:00Z',
  },
  {
    id: 'prod-4',
    title: 'EarCraft Urban Air (Unisex Series)',
    slug: 'earcraft-urban-air-wireless',
    subtitle: 'Ultra-Light 3.8g Ergonomic Fit & 36-Hour Battery Playback',
    description: 'Featherlight wireless acoustic earpieces designed for effortless daily wear, gym sessions, and travel.',
    story: 'Engineered with bio-cellulose diaphragm drivers for warm vocal clarity and punchy dynamic bass response.',
    craftsmanship_details: 'IPX5 Sweatproof, Environmental Noise Suppression Mics, Touch Controls.',
    hsn_code: '85183000',
    gst_percentage: 18,
    barcode: '8901234567803',
    category: mockCategories[1],
    collection: mockCollections[1],
    base_price: 12900,
    compare_at_price: 15900,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_trending: false,
    images: [
      { id: 'img-6', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80', alt_text: 'EarCraft Urban Air', is_primary: true, order: 1 }
    ],
    variants: [
      { id: 'var-8', sku: 'EC-UNI-AIR-SLV', name: 'Pure White', material: 'Matte Polymer', color: '#FFFFFF', price: 12900, stock_quantity: 30, is_available: true },
      { id: 'var-9', sku: 'EC-UNI-AIR-BLK', name: 'Stealth Slate', material: 'Matte Polymer', color: '#111111', price: 12900, stock_quantity: 25, is_available: true }
    ],
    avg_rating: 4.7,
    review_count: 53,
    reviews: [],
    questions: [],
    created_at: '2026-04-20T00:00:00Z',
  }
];

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'CRAFTED TO SHINE',
    subtitle: 'Designed for Everyday Style. Engineered for Exceptional Sound.',
    cta_text: 'Explore Crafted',
    cta_link: '/shop?series=crafted',
    background_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=2000&q=80',
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
  logo_url: '/logo.svg',
  brand_name: 'EARCRAFT',
  tagline: 'Crafted to Shine. Exceptional Sound.',
  contact_email: 'concierge@earcraft.com',
  contact_phone: '+91 (0) 800-EAR-CRAFT',
  address: 'EarCraft Acoustic Labs, Tech Plaza, London / Mumbai / Tokyo',
  social_instagram: 'https://instagram.com/earcraft_audio',
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

