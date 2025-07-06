import { useEffect } from "react";

interface PerformanceMonitorProps {
  enabled?: boolean;
}

export function PerformanceMonitor({ enabled = true }: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      });
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observer.observe({ entryTypes: ['first-input'] });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Performance Observer not fully supported');
    }

    // Monitor image loading performance
    const imageObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'img') {
          const loadTime = entry.responseEnd - entry.startTime;
          if (loadTime > 1000) { // Log slow images (>1s)
            console.warn(`Slow image load: ${entry.name} took ${loadTime.toFixed(2)}ms`);
          }
        }
      });
    });

    try {
      imageObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource timing not supported');
    }

    return () => {
      observer.disconnect();
      imageObserver.disconnect();
    };
  }, [enabled]);

  return null;
}

// Hook for measuring custom performance metrics
export function usePerformanceMetric(name: string, enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${name} took ${duration.toFixed(2)}ms`);
    };
  }, [name, enabled]);
}

// Utility to measure image load time
export function measureImageLoad(src: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
}
