import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Simple spinner component to avoid import issues
function SimpleSpinner({ size = "xl" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent text-primary",
        sizeClasses[size]
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
  progress?: number;
  className?: string;
}

export function PageLoader({ 
  isLoading, 
  message = "Loading...", 
  progress,
  className 
}: PageLoaderProps) {
  const [dots, setDots] = useState("");

  // Animate loading dots
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-background/98 backdrop-blur-md z-[9999] flex items-center justify-center min-h-screen",
      className
    )}>
      <div className="text-center space-y-8 max-w-md mx-auto px-8 py-12">
        {/* Brand Logo */}
        <div className="flex justify-center animate-pulse">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-bakery-gold/30 to-bakery-warm/30 flex items-center justify-center shadow-lg">
              <div className="text-3xl animate-bounce">🥖</div>
            </div>
            <div className="absolute inset-0 rounded-full bg-bakery-gold/10 animate-ping"></div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Havre Bakery
          </h1>
          <p className="text-sm text-muted-foreground">
            Fresh Daily Baked Goods
          </p>
        </div>

        {/* Spinner */}
        <div className="flex justify-center">
          <SimpleSpinner size="xl" />
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-foreground">
            {message}{dots}
          </p>

          {/* Progress bar */}
          {progress !== undefined && (
            <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-bakery-gold to-bakery-warm h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}

          <p className="text-sm text-muted-foreground animate-pulse">
            Preparing fresh content for you...
          </p>
        </div>

        {/* Loading dots indicator */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-bakery-gold rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-bakery-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-bakery-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Hook for managing page loading states
export function usePageLoader(initialLoading = false) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [message, setMessage] = useState("Loading...");
  const [progress, setProgress] = useState(0);

  const startLoading = (loadingMessage = "Loading...") => {
    setMessage(loadingMessage);
    setProgress(0);
    setIsLoading(true);
  };

  const updateProgress = (newProgress: number, newMessage?: string) => {
    setProgress(newProgress);
    if (newMessage) setMessage(newMessage);
  };

  const stopLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
  };

  return {
    isLoading,
    message,
    progress,
    startLoading,
    updateProgress,
    stopLoading
  };
}

// Component for section loading
interface SectionLoaderProps {
  isLoading: boolean;
  height?: string;
  message?: string;
  className?: string;
}

export function SectionLoader({
  isLoading,
  height = "min-h-[16rem]",
  message = "Loading section...",
  className
}: SectionLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className={cn(
      "flex items-center justify-center w-full",
      height,
      className
    )}>
      <div className="text-center space-y-6 max-w-xs mx-auto px-4">
        {/* Animated container */}
        <div className="relative">
          <div className="absolute inset-0 bg-bakery-gold/5 rounded-full animate-ping"></div>
          <div className="relative bg-background/50 backdrop-blur-sm rounded-full p-6 border border-border/50">
            <SimpleSpinner size="lg" />
          </div>
        </div>

        {/* Message with dots */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">{message}</p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-bakery-gold rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-bakery-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-bakery-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Smooth loading transition wrapper
interface LoadingTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LoadingTransition({ 
  isLoading, 
  children, 
  fallback,
  className 
}: LoadingTransitionProps) {
  return (
    <div className={cn("transition-opacity duration-300", className)}>
      {isLoading ? (
        <div className="opacity-50">
          {fallback || children}
        </div>
      ) : (
        <div className="opacity-100">
          {children}
        </div>
      )}
    </div>
  );
}
