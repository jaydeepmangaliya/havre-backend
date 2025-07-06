import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/lib/cart-context";
import { ImagePreloader, preloadCriticalImages } from "@/components/ui/image-preloader";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { PageLoader } from "@/components/ui/page-loader";
import { featuredProducts } from "@/lib/data";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductDetail from "@/pages/ProductDetail";
import ScrollToTop from "./ScrollToTop";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SimilarProducts from "@/pages/SimilarProducts";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

// Critical images to preload for better performance
const criticalImages = [
  "https://picsum.photos/600/750?random=999", // Hero image
  ...featuredProducts.slice(0, 3).map(product => product.image), // First 3 featured products
];

// Preload critical images immediately
if (typeof window !== 'undefined') {
  preloadCriticalImages(criticalImages);
}

function AnimatedRoutesWithLoader() {
  const location = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setIsRouteLoading(true), 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  // Helper to hide loader after animation
  const handleAnimationComplete = () => setIsRouteLoading(false);
  return (
    <>
      <PageLoader isLoading={isRouteLoading} message="Loading page..." />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Home /></motion.div></Layout>} />
          <Route path="/products" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Products /></motion.div></Layout>} />
          <Route path="/about" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><About /></motion.div></Layout>} />
          <Route path="/contact" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Contact /></motion.div></Layout>} />
          <Route path="/cart" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Cart /></motion.div></Layout>} />
          <Route path="/checkout" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Checkout /></motion.div></Layout>} />
          <Route path="/order-success" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><OrderSuccess /></motion.div></Layout>} />
          <Route path="/login" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Login /></motion.div></Layout>} />
          <Route path="/signup" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Signup /></motion.div></Layout>} />
          {/* <Route path="/admin" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><AdminDashboard /></motion.div></Layout>} /> */}
          <Route path="/profile" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><Profile /></motion.div></Layout>} />
          <Route path="/products/:id" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><ProductDetail /></motion.div></Layout>} />
          <Route path="/similar-products" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><SimilarProducts /></motion.div></Layout>} />
          <Route path="*" element={<Layout><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onAnimationComplete={handleAnimationComplete}><NotFound /></motion.div></Layout>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      // Wait for critical resources to load
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAppLoading(false);
    };

    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <ImagePreloader images={criticalImages} priority={true} />
          <PerformanceMonitor enabled={process.env.NODE_ENV === 'development'} />
          <PageLoader
            isLoading={isAppLoading}
            message="Loading Havre Bakery"
          />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutesWithLoader />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
