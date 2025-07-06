import { useEffect } from "react";

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

export function ImagePreloader({ images, priority = false }: ImagePreloaderProps) {
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
        
        // Add priority hint for critical images
        if (priority) {
          img.loading = "eager";
          img.fetchPriority = "high";
        }
      });
    });

    // Preload all images
    Promise.allSettled(preloadImages).then((results) => {
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;
      
      if (failed > 0) {
        console.warn(`Failed to preload ${failed} out of ${images.length} images`);
      }
      
      if (successful > 0) {
        console.log(`Successfully preloaded ${successful} images`);
      }
    });
  }, [images, priority]);

  return null; // This component doesn't render anything
}

// Hook for preloading images
export function useImagePreloader(images: string[], priority = false) {
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = images.map((src) => {
      const img = new Image();
      if (priority) {
        img.loading = "eager";
        img.fetchPriority = "high";
      }
      img.src = src;
      return img;
    });

    return () => {
      // Cleanup: cancel any ongoing loads
      preloadImages.forEach(img => {
        img.src = '';
      });
    };
  }, [images, priority]);
}

// Utility function to preload critical images
export function preloadCriticalImages(images: string[]) {
  if (typeof window === 'undefined') return;
  
  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
}
