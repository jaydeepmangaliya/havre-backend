import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-bakery-cream to-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Enhanced Content */}
          <div className="space-y-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-bakery-light text-bakery-dark rounded-full text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition-all duration-300 mobile-fade-in">
              ✨ Fresh Daily Since 1985
            </div>

            {/* Enhanced Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-none tracking-tight">
                FRESH
                <br />
                <span className="text-bakery-gold">BAKED</span>
                <br />
                DAILY
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                Experience the finest artisan baked goods. From our family to yours,
                every bite tells a story of passion and craftsmanship.
              </p>
            </div>

            {/* Enhanced CTA */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:bg-bakery-gold hover:scale-[1.02] transition-all duration-300 mobile-touch-target"
                >
                  <Link to="/products" className="flex items-center justify-center">
                    🛍️ Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-primary text-primary px-8 py-4 rounded-xl text-base font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg mobile-touch-target"
                >
                  <Link to="/about" className="flex items-center justify-center">
                    📖 Our Story
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Free delivery over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Fresh guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Gallery */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              {/* Main Featured Image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=400&fit=crop&crop=center"
                  alt="Fresh croissants and pastries"
                  className="object-cover w-full h-full"
                  loading="eager"
                  width={800}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Fresh Pastries</h3>
                  <p className="text-sm opacity-90">Baked every morning</p>
                </div>
              </div>

              {/* Two Smaller Images */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center"
                  alt="Artisan cakes"
                  className="object-cover w-full h-full"
                  loading="eager"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Premium Cakes</h4>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center"
                  alt="Fresh bread"
                  className="object-cover w-full h-full"
                  loading="eager"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Artisan Bread</h4>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-bakery-gold text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center font-bold text-sm shadow-xl">
              NEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
