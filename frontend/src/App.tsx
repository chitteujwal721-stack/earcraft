import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navbar } from './components/layout/Navbar';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/storefront/CartDrawer';

// Storefront Pages
import { Home } from './pages/storefront/Home';
import { Shop } from './pages/storefront/Shop';
import { ProductDetail } from './pages/storefront/ProductDetail';
import { Checkout } from './pages/storefront/Checkout';
import { TrackOrder } from './pages/storefront/TrackOrder';
import { CustomerDashboard } from './pages/storefront/CustomerDashboard';
import { BlogsPage } from './pages/storefront/BlogsPage';
import { FAQPage } from './pages/storefront/FAQPage';
import { AboutPage } from './pages/storefront/AboutPage';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          
          {/* Storefront Layout Routes */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <AnnouncementBar />
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/collections/:slug" element={<Shop />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="/wishlist" element={<CustomerDashboard />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:slug" element={<BlogsPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/about-us" element={<AboutPage />} />
                    <Route path="/gallery" element={<Home />} />
                    <Route path="/offers" element={<Shop />} />
                    <Route path="/policies" element={<FAQPage />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
                <CartDrawer />
              </div>
            }
          />

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
