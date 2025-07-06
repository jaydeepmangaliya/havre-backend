import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc,
  loading = "lazy",
  width,
  height,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    }
    
    onError?.();
  }, [fallbackSrc, currentSrc, onError]);

  // Generate a placeholder based on dimensions
  const generatePlaceholder = (w: number = 400, h: number = 300) => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
          Loading...
        </text>
      </svg>
    `)}`;
  };

  const defaultFallback = generatePlaceholder(width, height);

  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400 text-sm",
          className
        )}
        style={{ width, height }}
      >
        Image not available
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      {/* Main image */}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        }}
      />
      
      {/* Fallback placeholder if no src provided */}
      {!currentSrc && (
        <img
          src={defaultFallback}
          alt={alt}
          className={className}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
