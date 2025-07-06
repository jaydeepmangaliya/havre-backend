import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  threshold?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  className,
  fallbackSrc,
  width,
  height,
  threshold = 0.1,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setCurrentSrc(src);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, threshold]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoaded(false);
    }
    
    onError?.();
  }, [fallbackSrc, currentSrc, onError]);

  // Generate a lightweight placeholder
  const generatePlaceholder = (w: number = 400, h: number = 300) => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <rect x="10%" y="10%" width="80%" height="80%" fill="#e9ecef" rx="8"/>
        <circle cx="30%" cy="35%" r="8%" fill="#dee2e6"/>
        <rect x="20%" y="55%" width="60%" height="8%" fill="#dee2e6" rx="4"/>
        <rect x="20%" y="70%" width="40%" height="6%" fill="#dee2e6" rx="3"/>
      </svg>
    `)}`;
  };

  const placeholder = generatePlaceholder(width, height);

  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400 text-sm",
          className
        )}
        style={{ width, height }}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder while not in view or loading */}
      {(!isInView || !isLoaded) && (
        <img
          src={placeholder}
          alt=""
          className={cn("absolute inset-0 w-full h-full object-cover", className)}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      
      {/* Loading animation */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={isInView ? currentSrc : ""}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        }}
      />
    </div>
  );
}
