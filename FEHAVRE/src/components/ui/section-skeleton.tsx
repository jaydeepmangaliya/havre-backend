import { cn } from "@/lib/utils";
import { Skeleton } from "./loading-spinner";

// Stats section skeleton
export function StatsSkeleton() {
  return (
    <section className="py-16 bg-bakery-cream/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex justify-center mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-8 w-16 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-3 w-32 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Categories section skeleton
export function CategoriesSkeleton() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <div className="space-y-4 animate-fade-in">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-card rounded-lg border overflow-hidden animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative">
                <Skeleton className="aspect-video w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 space-y-1">
                  <Skeleton className="h-5 w-32 bg-white/20" />
                  <Skeleton className="h-3 w-40 bg-white/15" />
                </div>
              </div>
              <div className="p-4">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured products section skeleton
export function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i}
              className="bg-card rounded-lg border overflow-hidden animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative">
                <Skeleton className="aspect-[4/3] w-full" />
                {/* Product card overlay elements */}
                <div className="absolute top-4 left-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="absolute top-4 right-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-9 w-28 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features section skeleton
export function FeaturesSkeleton() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content skeleton */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <Skeleton className="h-6 w-24 mb-4 rounded-full" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Skeleton className="h-6 w-6 rounded-full mt-0.5" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Skeleton className="h-12 w-32 rounded-md" />
              <Skeleton className="h-12 w-36 rounded-md" />
            </div>
          </div>

          {/* Image skeleton */}
          <div className="relative animate-scale-in">
            <div className="aspect-square relative">
              <Skeleton className="w-full h-full rounded-2xl" />
              
              {/* Floating testimonial skeleton */}
              <div className="absolute -bottom-6 -left-6 max-w-sm">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                      <Skeleton className="h-4 w-24 mt-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-bakery-gold/10 rounded-full blur-xl animate-pulse-soft" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-bakery-warm/10 rounded-full blur-2xl animate-pulse-soft" />
          </div>
        </div>
      </div>
    </section>
  );
}
