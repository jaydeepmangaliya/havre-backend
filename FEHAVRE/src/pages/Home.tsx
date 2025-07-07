import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {  categories } from "@/lib/data";
import { productAPI } from "@/lib/api";

import { CategorySection } from "@/components/CategorySection";
import { CategoryCard } from "@/components/CategoryCard";
import {  useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import { FeatureGrid } from "@/components/FeatureGrid";

export default function Home() {
  // Get featured products (first 6 products for homepage)
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch featured products from API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const productsData = await productAPI.getProducts();
        setFeaturedProducts(productsData?.data?.items || []);
      } catch (error) {
        console.log('API not available, using mock data');
        // Keep using mock data if API is not available
        // setFeaturedProducts(mockProducts.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Customer reviews state (static for demo, can be replaced with API)
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      user: "Alice",
      rating: 5,
      comment: "Absolutely delicious! Will buy again.",
      date: "2024-06-20",
    },
    {
      user: "Bob",
      rating: 4,
      comment: "Great taste, but a bit pricey.",
      date: "2024-06-18",
    },
  ]);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews([
      {
        user: user?.email || "Anonymous",
        rating: 5,
        comment: reviewText,
        date: new Date().toISOString().slice(0, 10),
      },
      ...reviews,
    ]);
    setReviewText("");
  };

  // Preview images from the products folder
  const previewImages = [
    "IMG-20250628-WA0019.jpg",
    "IMG-20250628-WA0021.jpg",
    "IMG-20250628-WA0022.jpg",
    "IMG-20250629-WA0033.jpg",
    "IMG-20250629-WA0042.jpg",
    "IMG-20250629-WA0043.jpg",
    "IMG-20250629-WA0044.jpg",
    "IMG-20250629-WA0045.jpg",
    "IMG-20250629-WA0054.jpg",
    "IMG-20250629-WA0055.jpg",
    "IMG-20250629-WA0056.jpg",
    "IMG-20250629-WA0057.jpg",
    "WhatsApp Image 2025-06-29 at 23.28.03_0bd0c522.jpg",
  ];

  // Attach preview images to categories for Shop by Category
  const categoriesWithImages = categories.map((cat, idx) => ({
    ...cat,
    image: `/images/bakery/products/${previewImages[idx % previewImages.length]}`,
  }));

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section with Image from Hero Folder */}
        <section className="relative h-[85vh] bg-black overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/bakery/hero/WhatsApp Image 2025-06-28 at 6.03.11 AM.jpeg"
              alt="Havre Bakery Hero Image"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-20 flex flex-col items-center justify-center h-[85vh] px-4 sm:px-6 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-8 drop-shadow-lg">
              FRESH
              <br />
              DAILY
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-10 font-light">
              Artisan bakery crafting exceptional baked goods with passion and tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors"
                asChild
              >
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
                asChild
              >
                <Link to="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <FeatureGrid />

        {/* Categories Section - Product Card Style */}
        <CategorySection categories={categoriesWithImages} />

        {/* Featured Products Section - Same Style as Categories */}
        <section className="py-8 sm:py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 animate-slide-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
                FEATURED PRODUCTS
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-primary mx-auto shadow-sm"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {featuredProducts.map((product) => (

                <CategoryCard
                  key={product.id}
                  label={product.name}
                  value={product.category}
                  image={product.images[0].url}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="bg-bakery-cream border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Customer Reviews</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto"></div>
            </div>
            {isAuthenticated && (
              <div className="mb-10">
                <form onSubmit={handleReviewSubmit} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Write a Review</label>
                      <textarea
                        className="w-full border border-border rounded-lg p-4 text-sm min-h-[100px] focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none placeholder:text-muted-foreground"
                        placeholder="Share your thoughts about this bakery..."
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2.5 rounded-lg text-sm transition-all duration-200"
                      >
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border col-span-full max-w-lg w-full mx-auto">
                  <div className="text-4xl mb-4">💬</div>
                  <div className="text-lg font-medium text-muted-foreground mb-1">No reviews yet</div>
                  <p className="text-sm text-muted-foreground">Be the first to review this bakery</p>
                </div>
              ) : (
                reviews.map((review, idx) => (
                  <div key={idx} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-200 max-w-lg w-full mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary-foreground font-semibold text-sm">
                          {review.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">{review.user}</h4>
                            <div className="flex items-center gap-1 mt-0.5">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-1">{review.rating}/5</span>
                            </div>
                          </div>
                          <time className="text-xs text-muted-foreground flex-shrink-0">{review.date}</time>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          "{review.comment}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
