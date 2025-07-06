import React from 'react';
import { cn } from '@/lib/utils';

interface TouchTargetProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const sizeClasses = {
  sm: 'min-w-[40px] min-h-[40px]',
  md: 'min-w-[44px] min-h-[44px]',
  lg: 'min-w-[48px] min-h-[48px]',
};

/**
 * Touch-friendly target component that ensures minimum touch target size
 * Following WCAG guidelines for touch targets (minimum 44x44px)
 */
export function TouchTarget({
  children,
  className,
  size = 'md',
  as: Component = 'button',
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}: TouchTargetProps) {
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
        'transition-all duration-200',
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
}

interface SwipeableProps {
  children: React.ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

/**
 * Swipeable component for touch gestures
 */
export function Swipeable({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: SwipeableProps) {
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isUpSwipe = distanceY > threshold;
    const isDownSwipe = distanceY < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp();
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown();
    }
  };

  return (
    <div
      className={cn('touch-pan-y', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
}

/**
 * Pull-to-refresh component for mobile interfaces
 */
export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  className,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [startY, setStartY] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, threshold * 1.5));
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
  };

  const refreshProgress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-gray-50 transition-all duration-200"
        style={{
          height: pullDistance,
          transform: `translateY(-${Math.max(0, threshold - pullDistance)}px)`,
        }}
      >
        {isRefreshing ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
        ) : (
          <div
            className="rounded-full h-6 w-6 border-2 border-gray-300 transition-transform duration-200"
            style={{
              transform: `rotate(${refreshProgress * 180}deg)`,
              borderTopColor: refreshProgress > 0.8 ? '#000' : '#d1d5db',
            }}
          >
            <div className="w-full h-full rounded-full border-t-2 border-transparent"></div>
          </div>
        )}
      </div>

      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${pullDistance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface VirtualKeyboardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Component that adjusts for virtual keyboard on mobile devices
 */
export function VirtualKeyboardAdjuster({
  children,
  className,
}: VirtualKeyboardProps) {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      const visualViewport = window.visualViewport;
      if (visualViewport) {
        const keyboardHeight = window.innerHeight - visualViewport.height;
        setKeyboardHeight(Math.max(0, keyboardHeight));
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div
      className={cn('transition-all duration-300', className)}
      style={{
        paddingBottom: keyboardHeight,
      }}
    >
      {children}
    </div>
  );
}
