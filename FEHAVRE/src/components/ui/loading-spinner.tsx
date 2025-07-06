import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "secondary" | "bakery" | "white";
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  color = "primary" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    bakery: "text-bakery-gold",
    white: "text-white"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Skeleton loader for content
interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export function Skeleton({ className, variant = "rectangular" }: SkeletonProps) {
  const variantClasses = {
    text: "h-4 w-full",
    rectangular: "h-20 w-full",
    circular: "h-12 w-12 rounded-full"
  };

  return (
    <div
      className={cn(
        "skeleton rounded",
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading content"
    />
  );
}

// Product card skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border overflow-hidden animate-fade-in">
      <div className="relative">
        <Skeleton className="aspect-[4/3] w-full" />
        {/* Overlay badges skeleton */}
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
  );
}

// Page loading overlay
interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({ message = "Loading...", className }: PageLoaderProps) {
  return (
    <div className={cn(
      "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center",
      className
    )}>
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" color="bakery" />
        <p className="text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}

// Inline loader for components
interface InlineLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showMessage?: boolean;
}

export function InlineLoader({
  message = "Loading...",
  size = "md",
  className,
  showMessage = true
}: InlineLoaderProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4",
      className
    )}>
      <div className="text-center space-y-4 max-w-sm">
        {/* Spinner with subtle background */}
        <div className="relative">
          <div className="absolute inset-0 bg-bakery-gold/5 rounded-full animate-ping"></div>
          <LoadingSpinner size={size} color="bakery" />
        </div>

        {/* Message */}
        {showMessage && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{message}</p>
            <div className="flex justify-center space-x-1">
              <div className="w-1 h-1 bg-bakery-gold rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-bakery-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-bakery-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bakery-cream/30 via-background to-bakery-cream/20">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content skeleton */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              {/* Rating stars skeleton */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                  ))}
                </div>
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Title skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
              </div>

              {/* Subtitle skeleton */}
              <Skeleton className="h-6 w-2/3" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-40 rounded-md" />
              <Skeleton className="h-12 w-36 rounded-md" />
            </div>
          </div>

          {/* Image skeleton */}
          <div className="relative animate-scale-in">
            <div className="aspect-square lg:aspect-[4/5] relative">
              <Skeleton className="w-full h-full rounded-2xl" />

              {/* Floating card skeleton */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="text-right space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-bakery-gold/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-bakery-warm/10 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured products skeleton
export function FeaturedProductsSkeleton() {
  return (
    <div className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
