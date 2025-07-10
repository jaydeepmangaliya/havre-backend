import { useParams, useNavigate, useLocation } from "react-router-dom";
import { productAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/cartSlice";
import { CategoryCard } from "@/components/CategoryCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/image-quality.css";
import { RootState } from "@/lib/store";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Swiper as SwiperType } from 'swiper';
import { cn } from "@/lib/utils";

import img1 from "../../public/images/bakery/products/IMG-20250629-WA0057.jpg";
import img2 from "../../public/images/bakery/products/IMG-20250629-WA0056.jpg";
import img3 from "../../public/images/bakery/products/IMG-20250629-WA0055.jpg";
import img4 from "../../public/images/bakery/products/IMG-20250629-WA0054.jpg";

// Static reviews for demo
const staticReviews = [
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
];

// 1. Update CakeSVG to be much larger (e.g., 96x96) and adjust animation offset
const CakeSVG = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="48" cy="81" rx="30" ry="9" fill="#111"/>
    <rect x="18" y="36" width="60" height="36" rx="9" fill="#222" stroke="#111" strokeWidth="3"/>
    <rect x="27" y="45" width="42" height="15" rx="4.5" fill="#111"/>
    <ellipse cx="48" cy="36" rx="30" ry="9" fill="#222"/>
    <circle cx="48" cy="27" r="6" fill="#111" stroke="#222" strokeWidth="3"/>
    <rect x="45" y="15" width="6" height="12" rx="3" fill="#222"/>
  </svg>
);

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(staticReviews);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const swiperRef = useRef<SwiperType | null>(null);
  // 2. Add state for animation:
  const [cakeAnim, setCakeAnim] = useState(false);
  const navigate = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const productData = await productAPI.getProduct(id);
        console.log(productData.data);
        
        setProduct(productData?.data);
      } catch (err) {
        console.log('API not available, using mock data');
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    // Use image from navigation state if available, else fallback to product.image
    if (location.state && location.state.image) {
      setSelectedImage(location.state.image);
    } else if (product) {
      setSelectedImage(product.images.filter((img: any) => img.id == 1).url);
    }
  }, [product, location.state]);

  // For gallery, use main image + fallback + placeholder
  const galleryImages = [
    selectedImage,
    product?.fallbackImage,
    selectedImage ? selectedImage + "&blur" : undefined
  ].filter(Boolean);

  // Similar products data
  const similarProducts = [
    {
      id: "sim-1",
      name: "Chocolate Croissant",
      image: img1,
      price: 3.5,
      description: "Flaky croissant filled with rich chocolate.",
      category: "pastries",
      ingredients: ["flour", "butter", "chocolate"],
      inStock: true,
      prepTime: "15 minutes",
      allergens: ["gluten", "dairy"],
      nutritionalInfo: { calories: 280, protein: 6, carbs: 32, fat: 14 },
    },
    {
      id: "sim-2",
      name: "Almond Danish",
      image: img2,
      price: 4.0,
      description: "Buttery danish topped with toasted almonds.",
      category: "pastries",
      ingredients: ["flour", "butter", "almonds"],
      inStock: true,
      prepTime: "20 minutes",
      allergens: ["gluten", "dairy", "nuts"],
      nutritionalInfo: { calories: 320, protein: 8, carbs: 35, fat: 16 },
    },
    {
      id: "sim-3",
      name: "Raspberry Tart",
      image: img3,
      price: 4.5,
      description: "Sweet tart with fresh raspberries and cream.",
      category: "desserts",
      ingredients: ["flour", "butter", "raspberries", "cream"],
      inStock: true,
      prepTime: "25 minutes",
      allergens: ["gluten", "dairy"],
      nutritionalInfo: { calories: 290, protein: 5, carbs: 38, fat: 12 },
    },
    {
      id: "sim-4",
      name: "Blueberry Muffin",
      image: img4,
      price: 2.5,
      description: "Fresh blueberry muffin with a golden top.",
      category: "muffins",
      ingredients: ["flour", "blueberries", "sugar"],
      inStock: true,
      prepTime: "10 minutes",
      allergens: ["gluten"],
      nutritionalInfo: { calories: 220, protein: 4, carbs: 42, fat: 6 },
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">
            {error || "Sorry, we couldn't find that product."}
          </p>
          <Button
            onClick={() => navigate('/products')}
            className="mt-4"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

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

  const inStock = product.inStock !== false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bakery-cream via-background to-bakery-light">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card shadow-2xl lg:shadow-none lg:bg-transparent">
          {/* Premium Image Gallery */}
          <div className="relative bg-gradient-to-br from-bakery-cream via-background to-bakery-cream lg:bg-gradient-to-br lg:from-bakery-light lg:via-background lg:to-bakery-light">
            <div className="aspect-square lg:aspect-[4/5] relative overflow-hidden bg-card shadow-inner">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-gray-800 !opacity-40 !w-2 !h-2',
                  bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !bg-gray-900'
                }}
                className="w-full h-full"
                onSlideChange={swiper => setSelectedImage(galleryImages[swiper.activeIndex])}
                initialSlide={galleryImages.findIndex(img => img === selectedImage) || 0}
                onSwiper={swiper => (swiperRef.current = swiper)}
              >
                {product.images.map((img) => (
                  <SwiperSlide key={img.id}>
                    <div className="relative w-full h-full group bg-card flex items-center justify-center">
                      <img
                        src={img.url}
                        alt={product.name }
                        className="w-full h-full object-contain object-center select-none transition-transform duration-700 group-hover:scale-105 bg-card product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.objectFit = 'cover';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Premium Thumbnail Strip */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-3 justify-center bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border/20">
                  {galleryImages.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 bg-card ${
                        selectedImage === img
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-card/95 scale-110 shadow-lg'
                          : 'hover:scale-105 opacity-70 hover:opacity-100 hover:shadow-md'
                      }`}
                      onClick={() => {
                        setSelectedImage(img);
                        if (swiperRef.current) swiperRef.current.slideTo(idx);
                      }}
                    >
                      <img
                        src={img}
                        alt={product.name + ' thumb ' + (idx + 1)}
                        className="w-full h-full object-contain bg-card p-1 thumbnail-image"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Premium Product Details */}
          <div className="bg-card lg:bg-bakery-cream flex flex-col">
            <div className="p-8 sm:p-12 lg:p-16 flex-1 flex flex-col justify-center max-w-2xl lg:max-w-none mx-auto lg:mx-0">

              {/* Product Header */}
              <div className="space-y-4 mb-8">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="text-xl sm:text-2xl font-semibold text-foreground">
                  ${Number(product.price).toFixed(2)}
                </div>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
              
              {/* Product Specifications */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-foreground mb-6 border-b border-border pb-2">Product Details</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.serving && (
                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Servings</dt>
                      <dd className="text-sm font-semibold text-foreground">{product.serving}</dd>
                    </div>
                  )}
                  {product.weight && (
                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Weight</dt>
                      <dd className="text-sm font-semibold text-foreground">{product.weight}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Purchase Section */}
              <div className="space-y-8">
                {/* Quantity Selector */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm sm:text-base lg:text-lg font-medium text-foreground">Quantity</label>
                  <div className="flex items-center">
                    <div className="flex items-center border border-border rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden bg-card shadow-sm w-fit">
                      <button
                        type="button"
                        className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-4 text-sm sm:text-lg lg:text-xl font-light text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <div className="px-3 sm:px-4 lg:px-8 py-1.5 sm:py-2 lg:py-4 text-sm sm:text-lg lg:text-xl font-medium text-foreground bg-muted border-x border-border min-w-[40px] sm:min-w-[60px] lg:min-w-[80px] text-center">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-4 text-sm sm:text-lg lg:text-xl font-light text-muted-foreground hover:bg-muted transition-all duration-200"
                        onClick={() => setQuantity(q => q + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <Button
                    asChild
                    className={cn(
                      "w-full font-medium rounded-lg sm:rounded-xl lg:rounded-2xl bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-visible",
                      cakeAnim ? "opacity-60" : "opacity-100"
                    )}
                    size="lg"
                    onClick={() => {
                      dispatch(addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity,
                      }));
                      toast({
                        title: 'Added to Cart',
                        description: `${product.name} added to your cart.`,
                        style: {
                          borderRadius: '1rem',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                          background: '#fff',
                          color: '#222',
                        },
                        className: 'fixed left-1/2 bottom-8 -translate-x-1/2 z-[9999] max-w-xs w-full',
                      });
                      setTimeout(() => setCakeAnim(false), 1100);
                    }}
                    disabled={!inStock}
                  >
                    <motion.button
                      animate={cakeAnim ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }}
                      transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'easeInOut' }}
                      className="w-full h-full flex items-center justify-center relative"
                      type="button"
                    >
                      {/* Cake Animation */}
                      <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.7 }}
                        animate={cakeAnim ? {
                          opacity: [0, 1, 1, 0],
                          y: [0, -40, 0],
                          scale: [0.7, 1, 0.7],
                          rotate: [0, 5, 0]
                        } : { opacity: 0, y: 0, scale: 0.7 }}
                        transition={{ duration: 1.1, times: [0, 0.3, 1], ease: 'easeInOut' }}
                        style={{ position: 'absolute', left: '50%', top: '0px', zIndex: 10, pointerEvents: 'none', transform: 'translateX(-50%)' }}
                      >
                        <CakeSVG />
                      </motion.div>
                      {inStock ? 'Add to Cart' : 'Sold Out'}
                    </motion.button>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full font-medium rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-border text-foreground"
                    size="lg"
                    disabled={!inStock}
                    onClick={() => {
                      dispatch(addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity,
                      }));
                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Clean Reviews Section */}
        <div className="bg-bakery-cream border-t border-border">
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
                        placeholder="Share your thoughts about this product..."
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

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <div className="text-4xl mb-4">💬</div>
                  <div className="text-lg font-medium text-muted-foreground mb-1">No reviews yet</div>
                  <p className="text-sm text-muted-foreground">Be the first to review this product</p>
                </div>
              ) : (
                reviews.map((review, idx) => (
                  <div key={idx} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
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
        </div>
        {/* Similar Products Section - centered and max width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Similar Products Section - Using ProductCard */}
          <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-bakery-cream via-background to-bakery-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
                  SIMILAR PRODUCTS
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {similarProducts.map((product) => (
                  <CategoryCard
                    key={product.id}
                    label={product.name}
                    value={product.category || product.id}
                    image={product.image}
                    className="animate-fade-in"
                  />
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </div>
  );
}