import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AnnouncementBarConfig,
  SiteSettings,
  HeroSlide,
  Product,
  Category,
  Collection,
  WhyFeature,
  ShowcaseAngle,
  LifestyleBannerConfig,
  CollectionHeaderConfig,
  Testimonial,
  FAQItem
} from '../types';
import {
  mockAnnouncementBar,
  mockSiteSettings,
  mockHeroSlides,
  mockProducts,
  mockCategories,
  mockCollections,
  mockWhyFeatures,
  mockShowcaseAngles,
  mockLifestyleBanner,
  mockCraftedHeader,
  mockUnisexHeader,
  mockTestimonials,
  mockFAQs
} from '../services/mockData';

interface CMSState {
  settings: SiteSettings;
  announcement: AnnouncementBarConfig;
  heroSlides: HeroSlide[];
  products: Product[];
  categories: Category[];
  collections: Collection[];
  whyFeatures: WhyFeature[];
  showcaseAngles: ShowcaseAngle[];
  lifestyleBanner: LifestyleBannerConfig;
  craftedHeader: CollectionHeaderConfig;
  unisexHeader: CollectionHeaderConfig;
  testimonials: Testimonial[];
  faqs: FAQItem[];
}

const initialState: CMSState = {
  settings: mockSiteSettings,
  announcement: mockAnnouncementBar,
  heroSlides: mockHeroSlides,
  products: mockProducts,
  categories: mockCategories,
  collections: mockCollections,
  whyFeatures: mockWhyFeatures,
  showcaseAngles: mockShowcaseAngles,
  lifestyleBanner: mockLifestyleBanner,
  craftedHeader: mockCraftedHeader,
  unisexHeader: mockUnisexHeader,
  testimonials: mockTestimonials,
  faqs: mockFAQs,
};

export const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SiteSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    updateAnnouncement: (state, action: PayloadAction<Partial<AnnouncementBarConfig>>) => {
      state.announcement = { ...state.announcement, ...action.payload };
    },

    // Hero Slides CRUD
    updateHeroSlides: (state, action: PayloadAction<HeroSlide[]>) => {
      state.heroSlides = action.payload;
    },
    addHeroSlide: (state, action: PayloadAction<HeroSlide>) => {
      state.heroSlides.push(action.payload);
    },
    updateHeroSlide: (state, action: PayloadAction<HeroSlide>) => {
      const index = state.heroSlides.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.heroSlides[index] = action.payload;
      }
    },
    deleteHeroSlide: (state, action: PayloadAction<string>) => {
      state.heroSlides = state.heroSlides.filter(s => s.id !== action.payload);
    },
    toggleHeroSlideActive: (state, action: PayloadAction<string>) => {
      const slide = state.heroSlides.find(s => s.id === action.payload);
      if (slide) {
        slide.is_active = !slide.is_active;
      }
    },

    // Collection Headers CRUD
    updateCraftedHeader: (state, action: PayloadAction<Partial<CollectionHeaderConfig>>) => {
      state.craftedHeader = { ...state.craftedHeader, ...action.payload };
    },
    updateUnisexHeader: (state, action: PayloadAction<Partial<CollectionHeaderConfig>>) => {
      state.unisexHeader = { ...state.unisexHeader, ...action.payload };
    },

    // Why Features CRUD
    addWhyFeature: (state, action: PayloadAction<WhyFeature>) => {
      state.whyFeatures.push(action.payload);
    },
    updateWhyFeature: (state, action: PayloadAction<WhyFeature>) => {
      const index = state.whyFeatures.findIndex(f => f.id === action.payload.id);
      if (index >= 0) {
        state.whyFeatures[index] = action.payload;
      }
    },
    deleteWhyFeature: (state, action: PayloadAction<string>) => {
      state.whyFeatures = state.whyFeatures.filter(f => f.id !== action.payload);
    },

    // Showcase Angles CRUD
    addShowcaseAngle: (state, action: PayloadAction<ShowcaseAngle>) => {
      state.showcaseAngles.push(action.payload);
    },
    updateShowcaseAngle: (state, action: PayloadAction<ShowcaseAngle>) => {
      const index = state.showcaseAngles.findIndex(a => a.id === action.payload.id);
      if (index >= 0) {
        state.showcaseAngles[index] = action.payload;
      }
    },
    deleteShowcaseAngle: (state, action: PayloadAction<string>) => {
      state.showcaseAngles = state.showcaseAngles.filter(a => a.id !== action.payload);
    },

    // Lifestyle Banner CRUD
    updateLifestyleBanner: (state, action: PayloadAction<Partial<LifestyleBannerConfig>>) => {
      state.lifestyleBanner = { ...state.lifestyleBanner, ...action.payload };
    },

    // Testimonials CRUD
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.testimonials.unshift(action.payload);
    },
    updateTestimonial: (state, action: PayloadAction<Testimonial>) => {
      const index = state.testimonials.findIndex(t => t.id === action.payload.id);
      if (index >= 0) {
        state.testimonials[index] = action.payload;
      }
    },
    deleteTestimonial: (state, action: PayloadAction<string>) => {
      state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
    },

    // FAQs CRUD
    addFAQ: (state, action: PayloadAction<FAQItem>) => {
      state.faqs.push(action.payload);
    },
    updateFAQ: (state, action: PayloadAction<FAQItem>) => {
      const index = state.faqs.findIndex(f => f.id === action.payload.id);
      if (index >= 0) {
        state.faqs[index] = action.payload;
      }
    },
    deleteFAQ: (state, action: PayloadAction<string>) => {
      state.faqs = state.faqs.filter(f => f.id !== action.payload);
    },

    // Products
    addOrUpdateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex(p => p.id === action.payload.id);
      if (idx >= 0) {
        state.products[idx] = action.payload;
      } else {
        state.products.unshift(action.payload);
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    bulkDeleteProducts: (state, action: PayloadAction<string[]>) => {
      state.products = state.products.filter(p => !action.payload.includes(p.id));
    }
  }
});

export const {
  updateSettings,
  updateAnnouncement,
  updateHeroSlides,
  addHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  toggleHeroSlideActive,
  updateCraftedHeader,
  updateUnisexHeader,
  addWhyFeature,
  updateWhyFeature,
  deleteWhyFeature,
  addShowcaseAngle,
  updateShowcaseAngle,
  deleteShowcaseAngle,
  updateLifestyleBanner,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  addOrUpdateProduct,
  deleteProduct,
  bulkDeleteProducts,
} = cmsSlice.actions;

export default cmsSlice.reducer;
