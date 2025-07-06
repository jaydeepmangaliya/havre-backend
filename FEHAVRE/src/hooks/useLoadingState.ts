import { useState, useEffect, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress: number;
}

interface UseLoadingStateOptions {
  initialLoading?: boolean;
  timeout?: number;
  minLoadingTime?: number;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const {
    initialLoading = false,
    timeout = 10000, // 10 seconds timeout
    minLoadingTime = 500 // Minimum loading time for better UX
  } = options;

  const [state, setState] = useState<LoadingState>({
    isLoading: initialLoading,
    error: null,
    progress: 0
  });

  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = useCallback((message?: string) => {
    setStartTime(Date.now());
    setState({
      isLoading: true,
      error: null,
      progress: 0
    });
  }, []);

  const updateProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress))
    }));
  }, []);

  const stopLoading = useCallback(async (error?: string) => {
    const elapsed = startTime ? Date.now() - startTime : 0;
    const remainingTime = Math.max(0, minLoadingTime - elapsed);

    // Ensure minimum loading time for better UX
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }

    setState({
      isLoading: false,
      error: error || null,
      progress: 100
    });
    setStartTime(null);
  }, [startTime, minLoadingTime]);

  // Auto timeout
  useEffect(() => {
    if (!state.isLoading) return;

    const timeoutId = setTimeout(() => {
      stopLoading('Loading timeout. Please try again.');
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [state.isLoading, timeout, stopLoading]);

  return {
    ...state,
    startLoading,
    stopLoading,
    updateProgress
  };
}

// Hook for component loading states
export function useComponentLoading(componentName: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const simulateLoading = useCallback(async (duration: number = 1000) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, duration));
      setIsLoading(false);
    } catch (err) {
      setError(`Failed to load ${componentName}`);
      setIsLoading(false);
    }
  }, [componentName]);

  useEffect(() => {
    simulateLoading();
  }, [simulateLoading]);

  return {
    isLoading,
    error,
    retry: () => simulateLoading()
  };
}

// Hook for image loading states
export function useImageLoading(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoading, hasError };
}

// Hook for data fetching with loading states
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
}
