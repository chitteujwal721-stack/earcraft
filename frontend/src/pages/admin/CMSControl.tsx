import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
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
  deleteFAQ
} from '../../store/cmsSlice';
import {
  Sliders,
  Sparkles,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Layers,
  HelpCircle,
  MessageSquareQuote,
  Layout,
  Globe,
  X,
  Volume2,
  Wifi,
  ShieldCheck,
  BatteryCharging,
  Zap,
  Feather,
  Gem,
  Star,
  Award,
  Headphones
} from 'lucide-react';
import { HeroSlide, WhyFeature, ShowcaseAngle, Testimonial, FAQItem } from '../../types';

type CMSTab = 'hero' | 'collections' | 'features' | 'showcase' | 'lifestyle' | 'testimonials' | 'faqs' | 'announcement';

export const CMSControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    settings,
    announcement,
    heroSlides,
    craftedHeader,
    unisexHeader,
    whyFeatures,
    showcaseAngles,
    lifestyleBanner,
    testimonials,
    faqs
  } = useAppSelector(state => state.cms);

  const [activeTab, setActiveTab] = useState<CMSTab>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ==================== 1. HERO SLIDES MODAL STATE ====================
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);
  const [heroForm, setHeroForm] = useState<Partial<HeroSlide>>({
    title: '',
    subtitle: '',
    cta_text: 'Explore Collection',
    cta_link: '/shop',
    background_image: '',
    is_active: true,
    order: 1
  });

  const handleOpenHeroModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingHeroSlide(slide);
      setHeroForm(slide);
    } else {
      setEditingHeroSlide(null);
      setHeroForm({
        title: '',
        subtitle: '',
        cta_text: 'Explore Collection',
        cta_link: '/shop',
        background_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
        is_active: true,
        order: heroSlides.length + 1
      });
    }
    setIsHeroModalOpen(true);
  };

  const handleSaveHeroSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHeroSlide) {
      dispatch(updateHeroSlide(heroForm as HeroSlide));
      showToast('Hero slide updated successfully!');
    } else {
      const newSlide: HeroSlide = {
        id: `hero-${Date.now()}`,
        title: heroForm.title || 'NEW HERO TITLE',
        subtitle: heroForm.subtitle || '',
        cta_text: heroForm.cta_text || 'Explore Now',
        cta_link: heroForm.cta_link || '/shop',
        background_image: heroForm.background_image || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
        is_active: heroForm.is_active ?? true,
        order: heroForm.order || (heroSlides.length + 1)
      };
      dispatch(addHeroSlide(newSlide));
      showToast('New hero slide created!');
    }
    setIsHeroModalOpen(false);
  };

  // ==================== 2. FEATURED COLLECTIONS EDIT STATE ====================
  const [craftedForm, setCraftedForm] = useState(craftedHeader);
  const [unisexForm, setUnisexForm] = useState(unisexHeader);

  const handleSaveCollections = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateCraftedHeader(craftedForm));
    dispatch(updateUnisexHeader(unisexForm));
    showToast('Featured Collection Headers saved!');
  };

  // ==================== 3. WHY FEATURES MODAL STATE ====================
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<WhyFeature | null>(null);
  const [featureForm, setFeatureForm] = useState<Partial<WhyFeature>>({
    icon: 'Sliders',
    title: '',
    desc: ''
  });

  const availableIcons = [
    'Sliders', 'Volume2', 'Wifi', 'ShieldCheck', 'BatteryCharging',
    'Zap', 'Feather', 'Gem', 'Sparkles', 'Star', 'Award', 'Headphones'
  ];

  const handleOpenFeatureModal = (feat?: WhyFeature) => {
    if (feat) {
      setEditingFeature(feat);
      setFeatureForm(feat);
    } else {
      setEditingFeature(null);
      setFeatureForm({ icon: 'Sliders', title: '', desc: '' });
    }
    setIsFeatureModalOpen(true);
  };

  const handleSaveFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeature) {
      dispatch(updateWhyFeature(featureForm as WhyFeature));
      showToast('Feature updated successfully!');
    } else {
      const newFeat: WhyFeature = {
        id: `wf-${Date.now()}`,
        icon: featureForm.icon || 'Sparkles',
        title: featureForm.title || 'New Feature',
        desc: featureForm.desc || 'Feature description.'
      };
      dispatch(addWhyFeature(newFeat));
      showToast('New feature added!');
    }
    setIsFeatureModalOpen(false);
  };

  // ==================== 4. SHOWCASE ANGLES MODAL STATE ====================
  const [isAngleModalOpen, setIsAngleModalOpen] = useState(false);
  const [editingAngle, setEditingAngle] = useState<ShowcaseAngle | null>(null);
  const [angleForm, setAngleForm] = useState<Partial<ShowcaseAngle>>({
    label: '',
    img: ''
  });

  const handleOpenAngleModal = (angle?: ShowcaseAngle) => {
    if (angle) {
      setEditingAngle(angle);
      setAngleForm(angle);
    } else {
      setEditingAngle(null);
      setAngleForm({
        label: '',
        img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80'
      });
    }
    setIsAngleModalOpen(true);
  };

  const handleSaveAngle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAngle) {
      dispatch(updateShowcaseAngle(angleForm as ShowcaseAngle));
      showToast('Showcase angle updated!');
    } else {
      const newAngle: ShowcaseAngle = {
        id: `ang-${Date.now()}`,
        label: angleForm.label || 'New Angle View',
        img: angleForm.img || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80'
      };
      dispatch(addShowcaseAngle(newAngle));
      showToast('New inspection angle added!');
    }
    setIsAngleModalOpen(false);
  };

  // ==================== 5. LIFESTYLE BANNER EDIT STATE ====================
  const [lifestyleForm, setLifestyleForm] = useState(lifestyleBanner);

  const handleSaveLifestyle = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateLifestyleBanner(lifestyleForm));
    showToast('Lifestyle Banner updated!');
  };

  // ==================== 6. TESTIMONIALS MODAL STATE ====================
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    customer_name: '',
    location: '',
    rating: 5,
    quote: '',
    purchased_item: ''
  });

  const handleOpenTestimonialModal = (t?: Testimonial) => {
    if (t) {
      setEditingTestimonial(t);
      setTestimonialForm(t);
    } else {
      setEditingTestimonial(null);
      setTestimonialForm({ customer_name: '', location: '', rating: 5, quote: '', purchased_item: '' });
    }
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      dispatch(updateTestimonial(testimonialForm as Testimonial));
      showToast('Testimonial updated!');
    } else {
      const newT: Testimonial = {
        id: `test-${Date.now()}`,
        customer_name: testimonialForm.customer_name || 'Anonymous Customer',
        location: testimonialForm.location || 'Verified Buyer',
        rating: testimonialForm.rating || 5,
        quote: testimonialForm.quote || 'Outstanding audio performance!',
        purchased_item: testimonialForm.purchased_item || 'EarCraft Product'
      };
      dispatch(addTestimonial(newT));
      showToast('New review added!');
    }
    setIsTestimonialModalOpen(false);
  };

  // ==================== 7. FAQS MODAL STATE ====================
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [faqForm, setFaqForm] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'General'
  });

  const handleOpenFaqModal = (faq?: FAQItem) => {
    if (faq) {
      setEditingFaq(faq);
      setFaqForm(faq);
    } else {
      setEditingFaq(null);
      setFaqForm({ question: '', answer: '', category: 'General' });
    }
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      dispatch(updateFAQ(faqForm as FAQItem));
      showToast('FAQ updated!');
    } else {
      const newFaq: FAQItem = {
        id: `faq-${Date.now()}`,
        question: faqForm.question || 'New Question',
        answer: faqForm.answer || 'Answer details...',
        category: faqForm.category || 'General'
      };
      dispatch(addFAQ(newFaq));
      showToast('New FAQ item added!');
    }
    setIsFaqModalOpen(false);
  };

  // ==================== 8. ANNOUNCEMENT & SETTINGS ====================
  const [brandName, setBrandName] = useState(settings.brand_name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [announcementText, setAnnouncementText] = useState(announcement.text);
  const [announcementBg, setAnnouncementBg] = useState(announcement.background_color);
  const [announcementColor, setAnnouncementColor] = useState(announcement.text_color);
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement.enabled);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateSettings({ brand_name: brandName, tagline }));
    dispatch(updateAnnouncement({
      enabled: announcementEnabled,
      text: announcementText,
      background_color: announcementBg,
      text_color: announcementColor
    }));
    showToast('Announcement & Site Settings synced live!');
  };

  return (
    <div className="space-y-8 max-w-6xl font-display text-slate-900 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Home Page Admin & CMS Manager</h1>
          <p className="text-xs text-slate-500 mt-1">Full CRUD management for Hero Slides, Featured Banners, Features, 360 Renders, Reviews & FAQs.</p>
        </div>
        {toastMessage && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {toastMessage}
          </span>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'hero', label: '1. Hero Carousel', icon: ImageIcon },
          { key: 'collections', label: '2. Featured Collections', icon: Layers },
          { key: 'features', label: '3. Why Features', icon: Sliders },
          { key: 'showcase', label: '4. 360° Showcase', icon: Eye },
          { key: 'lifestyle', label: '5. Lifestyle Banner', icon: Layout },
          { key: 'testimonials', label: '6. Reviews Praise', icon: MessageSquareQuote },
          { key: 'faqs', label: '7. FAQ Accordion', icon: HelpCircle },
          { key: 'announcement', label: '8. Announcement & Brand', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as CMSTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-[#6D5EF6] text-white border-[#6D5EF6] shadow-md shadow-[#6D5EF6]/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================== TAB 1: HERO CAROUSEL CRUD ==================== */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hero Carousel Slides</h2>
              <p className="text-xs text-slate-500">Manage high-impact hero banners displayed at the top of the Home page.</p>
            </div>
            <button
              onClick={() => handleOpenHeroModal()}
              className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Hero Slide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroSlides.map((slide) => (
              <div key={slide.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 bg-slate-100">
                  <img src={slide.background_image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => dispatch(toggleHeroSlideActive(slide.id))}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        slide.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {slide.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#6D5EF6] uppercase tracking-wider">Order #{slide.order}</span>
                    <h3 className="text-base font-extrabold text-slate-900">{slide.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">{slide.subtitle}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">CTA: {slide.cta_text} ({slide.cta_link})</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenHeroModal(slide)}
                        className="p-2 text-slate-600 hover:text-[#6D5EF6] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                        title="Edit Slide"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteHeroSlide(slide.id));
                          showToast('Hero slide deleted.');
                        }}
                        className="p-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 2: FEATURED COLLECTIONS CRUD ==================== */}
      {activeTab === 'collections' && (
        <form onSubmit={handleSaveCollections} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#6D5EF6]" /> 1. Crafted Series Header Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Badge Tagline</label>
                <input
                  type="text"
                  value={craftedForm.badge}
                  onChange={(e) => setCraftedForm({ ...craftedForm, badge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Headline Title</label>
                <input
                  type="text"
                  value={craftedForm.title}
                  onChange={(e) => setCraftedForm({ ...craftedForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Description Paragraph</label>
                <textarea
                  rows={2}
                  value={craftedForm.description}
                  onChange={(e) => setCraftedForm({ ...craftedForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={craftedForm.cta_text}
                  onChange={(e) => setCraftedForm({ ...craftedForm, cta_text: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">CTA Link Route</label>
                <input
                  type="text"
                  value={craftedForm.cta_link}
                  onChange={(e) => setCraftedForm({ ...craftedForm, cta_link: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#6D5EF6]" /> 2. Unisex Series Header Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Badge Tagline</label>
                <input
                  type="text"
                  value={unisexForm.badge}
                  onChange={(e) => setUnisexForm({ ...unisexForm, badge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Headline Title</label>
                <input
                  type="text"
                  value={unisexForm.title}
                  onChange={(e) => setUnisexForm({ ...unisexForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Description Paragraph</label>
                <textarea
                  rows={2}
                  value={unisexForm.description}
                  onChange={(e) => setUnisexForm({ ...unisexForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={unisexForm.cta_text}
                  onChange={(e) => setUnisexForm({ ...unisexForm, cta_text: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">CTA Link Route</label>
                <input
                  type="text"
                  value={unisexForm.cta_link}
                  onChange={(e) => setUnisexForm({ ...unisexForm, cta_link: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6D5EF6] hover:bg-[#5847E4] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Save className="w-4 h-4" /> Save Collection Headers
          </button>
        </form>
      )}

      {/* ==================== TAB 3: WHY FEATURES CRUD ==================== */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Why EarCraft Feature Cards</h2>
              <p className="text-xs text-slate-500">Manage acoustic highlights and engineering features displayed in the 8-card grid.</p>
            </div>
            <button
              onClick={() => handleOpenFeatureModal()}
              className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Feature Card
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyFeatures.map((feat) => (
              <div key={feat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-[#6D5EF6]/10 text-[#6D5EF6] text-xs font-mono font-bold">
                    Icon: {feat.icon}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenFeatureModal(feat)}
                    className="p-2 text-slate-600 hover:text-[#6D5EF6] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteWhyFeature(feat.id));
                      showToast('Feature card removed.');
                    }}
                    className="p-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 4: 360° SHOWCASE ANGLES CRUD ==================== */}
      {activeTab === 'showcase' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">360° Studio Showcase Inspection Angles</h2>
              <p className="text-xs text-slate-500">Configure interactive angle inspection renders shown on the home page.</p>
            </div>
            <button
              onClick={() => handleOpenAngleModal()}
              className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Inspection Angle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {showcaseAngles.map((angle) => (
              <div key={angle.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="h-44 bg-slate-50 p-4 flex items-center justify-center">
                  <img src={angle.img} alt={angle.label} className="w-full h-full object-contain" />
                </div>
                <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{angle.label}</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenAngleModal(angle)}
                      className="p-1.5 text-slate-600 hover:text-[#6D5EF6] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteShowcaseAngle(angle.id));
                        showToast('Showcase angle deleted.');
                      }}
                      className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 5: LIFESTYLE BANNER CRUD ==================== */}
      {activeTab === 'lifestyle' && (
        <form onSubmit={handleSaveLifestyle} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Lifestyle Experience Banner</h2>
            <p className="text-xs text-slate-500">Configure full-width studio immersion banner.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Badge Headline</label>
              <input
                type="text"
                value={lifestyleForm.badge}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, badge: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Main Banner Title</label>
              <input
                type="text"
                value={lifestyleForm.title}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Subtitle Description</label>
              <input
                type="text"
                value={lifestyleForm.subtitle}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, subtitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">CTA Button Label</label>
              <input
                type="text"
                value={lifestyleForm.cta_text}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, cta_text: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">CTA Link Route</label>
              <input
                type="text"
                value={lifestyleForm.cta_link}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, cta_link: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Background Image URL</label>
              <input
                type="text"
                value={lifestyleForm.image_url}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, image_url: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6D5EF6] hover:bg-[#5847E4] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Save className="w-4 h-4" /> Save Lifestyle Banner
          </button>
        </form>
      )}

      {/* ==================== TAB 6: TESTIMONIALS CRUD ==================== */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Customer Testimonials & Reviews</h2>
              <p className="text-xs text-slate-500">Manage buyer praise and reviews displayed on the storefront home page.</p>
            </div>
            <button
              onClick={() => handleOpenTestimonialModal()}
              className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Review
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900">{t.customer_name}</span>
                    <span className="text-xs text-slate-400">{t.location}</span>
                  </div>
                  <div className="flex text-[#6D5EF6]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#6D5EF6]" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic">"{t.quote}"</p>
                  {t.purchased_item && (
                    <span className="inline-block text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                      Purchased: {t.purchased_item}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenTestimonialModal(t)}
                    className="p-1.5 text-slate-600 hover:text-[#6D5EF6] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteTestimonial(t.id));
                      showToast('Testimonial removed.');
                    }}
                    className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 7: FAQS CRUD ==================== */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">Manage accordion FAQ questions and answers.</p>
            </div>
            <button
              onClick={() => handleOpenFaqModal()}
              className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add FAQ Item
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6D5EF6] uppercase tracking-wider">{faq.category}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenFaqModal(faq)}
                      className="p-1.5 text-slate-600 hover:text-[#6D5EF6] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteFAQ(faq.id));
                        showToast('FAQ deleted.');
                      }}
                      className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 8: ANNOUNCEMENT & BRAND SETTINGS ==================== */}
      {activeTab === 'announcement' && (
        <form onSubmit={handleSaveAnnouncement} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#6D5EF6]" /> Brand Identity & Tagline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6D5EF6] text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#6D5EF6]" /> Announcement Ticker Banner
              </h3>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <span>Enabled</span>
                <input
                  type="checkbox"
                  checked={announcementEnabled}
                  onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#6D5EF6] rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ticker Message Text</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Background Hex Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={announcementBg}
                      onChange={(e) => setAnnouncementBg(e.target.value)}
                      className="w-9 h-9 rounded-lg bg-transparent border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={announcementBg}
                      onChange={(e) => setAnnouncementBg(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:border-[#6D5EF6]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Text Hex Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={announcementColor}
                      onChange={(e) => setAnnouncementColor(e.target.value)}
                      className="w-9 h-9 rounded-lg bg-transparent border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={announcementColor}
                      onChange={(e) => setAnnouncementColor(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:border-[#6D5EF6]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6D5EF6] hover:bg-[#5847E4] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Save className="w-4 h-4" /> Save Brand & Announcement Ticker
          </button>
        </form>
      )}

      {/* ==================== HERO SLIDE MODAL ==================== */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingHeroSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
              </h3>
              <button onClick={() => setIsHeroModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHeroSlide} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Headline Title</label>
                <input
                  type="text"
                  required
                  value={heroForm.title || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  placeholder="e.g. CRAFTED TO SHINE"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Subtitle Description</label>
                <textarea
                  rows={2}
                  value={heroForm.subtitle || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  placeholder="Designed for Everyday Style..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={heroForm.cta_text || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, cta_text: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CTA Link Route</label>
                  <input
                    type="text"
                    value={heroForm.cta_link || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, cta_link: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Background Image URL</label>
                <input
                  type="text"
                  required
                  value={heroForm.background_image || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, background_image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroForm.is_active ?? true}
                    onChange={(e) => setHeroForm({ ...heroForm, is_active: e.target.checked })}
                    className="w-4 h-4 text-[#6D5EF6] rounded"
                  />
                  <span>Active on Home Page</span>
                </label>

                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                >
                  Save Hero Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== FEATURE MODAL ==================== */}
      {isFeatureModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingFeature ? 'Edit Feature Card' : 'Add New Feature Card'}
              </h3>
              <button onClick={() => setIsFeatureModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFeature} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Icon</label>
                <select
                  value={featureForm.icon}
                  onChange={(e) => setFeatureForm({ ...featureForm, icon: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                >
                  {availableIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Feature Title</label>
                <input
                  type="text"
                  required
                  value={featureForm.title || ''}
                  onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={featureForm.desc || ''}
                  onChange={(e) => setFeatureForm({ ...featureForm, desc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                >
                  Save Feature Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== SHOWCASE ANGLE MODAL ==================== */}
      {isAngleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingAngle ? 'Edit Inspection Angle' : 'Add Inspection Angle'}
              </h3>
              <button onClick={() => setIsAngleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAngle} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Angle Label</label>
                <input
                  type="text"
                  required
                  value={angleForm.label || ''}
                  onChange={(e) => setAngleForm({ ...angleForm, label: e.target.value })}
                  placeholder="e.g. Front Chassis"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Render Image URL</label>
                <input
                  type="text"
                  required
                  value={angleForm.img || ''}
                  onChange={(e) => setAngleForm({ ...angleForm, img: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                >
                  Save Angle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== TESTIMONIAL MODAL ==================== */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingTestimonial ? 'Edit Customer Review' : 'Add Customer Review'}
              </h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.customer_name || ''}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, customer_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={testimonialForm.location || ''}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={testimonialForm.rating || 5}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                >
                  <option value={5}>5 Stars (★★★★★)</option>
                  <option value={4}>4 Stars (★★★★☆)</option>
                  <option value={3}>3 Stars (★★★☆☆)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Review Quote</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.quote || ''}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Purchased Product Item</label>
                <input
                  type="text"
                  value={testimonialForm.purchased_item || ''}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, purchased_item: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== FAQ MODAL ==================== */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingFaq ? 'Edit FAQ Item' : 'Add FAQ Item'}
              </h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={faqForm.category || ''}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                  placeholder="e.g. Battery & Charging"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={faqForm.question || ''}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Answer</label>
                <textarea
                  rows={3}
                  required
                  value={faqForm.answer || ''}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6D5EF6]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-[#6D5EF6] hover:bg-[#5847E4] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
