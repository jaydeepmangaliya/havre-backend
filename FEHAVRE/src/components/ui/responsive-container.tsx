import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 xs:px-6',
  md: 'px-4 xs:px-6 sm:px-8',
  lg: 'px-4 xs:px-6 sm:px-8 lg:px-12',
  xl: 'px-4 xs:px-6 sm:px-8 lg:px-12 xl:px-16',
};

/**
 * Responsive container component with consistent spacing and max-width
 */
export function ResponsiveContainer({
  children,
  className,
  maxWidth = '2xl',
  padding = 'md',
  as: Component = 'div',
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const gapClasses = {
  sm: 'gap-3 xs:gap-4',
  md: 'gap-4 xs:gap-5 sm:gap-6',
  lg: 'gap-5 xs:gap-6 sm:gap-8',
  xl: 'gap-6 xs:gap-8 sm:gap-10',
};

/**
 * Responsive grid component with breakpoint-specific column counts
 */
export function ResponsiveGrid({
  children,
  className,
  cols = { default: 2, sm: 2, lg: 3 },
  gap = 'md',
}: ResponsiveGridProps) {
  const gridCols = [];
  
  if (cols.default) gridCols.push(`grid-cols-${cols.default}`);
  if (cols.xs) gridCols.push(`xs:grid-cols-${cols.xs}`);
  if (cols.sm) gridCols.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) gridCols.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) gridCols.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) gridCols.push(`xl:grid-cols-${cols.xl}`);
  if (cols['2xl']) gridCols.push(`2xl:grid-cols-${cols['2xl']}`);

  return (
    <div
      className={cn(
        'grid',
        gridCols.join(' '),
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: {
    default?: 'row' | 'col';
    xs?: 'row' | 'col';
    sm?: 'row' | 'col';
    md?: 'row' | 'col';
    lg?: 'row' | 'col';
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

/**
 * Responsive flex stack component
 */
export function ResponsiveStack({
  children,
  className,
  direction = { default: 'col', sm: 'row' },
  gap = 'md',
  align = 'start',
  justify = 'start',
}: ResponsiveStackProps) {
  const directionClasses = [];
  
  if (direction.default) {
    directionClasses.push(direction.default === 'row' ? 'flex-row' : 'flex-col');
  }
  if (direction.xs) {
    directionClasses.push(direction.xs === 'row' ? 'xs:flex-row' : 'xs:flex-col');
  }
  if (direction.sm) {
    directionClasses.push(direction.sm === 'row' ? 'sm:flex-row' : 'sm:flex-col');
  }
  if (direction.md) {
    directionClasses.push(direction.md === 'row' ? 'md:flex-row' : 'md:flex-col');
  }
  if (direction.lg) {
    directionClasses.push(direction.lg === 'row' ? 'lg:flex-row' : 'lg:flex-col');
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex',
        directionClasses.join(' '),
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
    >
      {children}
    </div>
  );
}

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: {
    default?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    xs?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    sm?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    md?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    lg?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  };
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  align?: {
    default?: 'left' | 'center' | 'right';
    xs?: 'left' | 'center' | 'right';
    sm?: 'left' | 'center' | 'right';
    md?: 'left' | 'center' | 'right';
    lg?: 'left' | 'center' | 'right';
  };
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Responsive text component with breakpoint-specific sizing
 */
export function ResponsiveText({
  children,
  className,
  size = { default: 'base' },
  weight = 'normal',
  align = { default: 'left' },
  as: Component = 'p',
}: ResponsiveTextProps) {
  const sizeClasses = [];
  
  if (size.default) sizeClasses.push(`text-${size.default}`);
  if (size.xs) sizeClasses.push(`xs:text-${size.xs}`);
  if (size.sm) sizeClasses.push(`sm:text-${size.sm}`);
  if (size.md) sizeClasses.push(`md:text-${size.md}`);
  if (size.lg) sizeClasses.push(`lg:text-${size.lg}`);

  const alignClasses = [];
  if (align.default) alignClasses.push(`text-${align.default}`);
  if (align.xs) alignClasses.push(`xs:text-${align.xs}`);
  if (align.sm) alignClasses.push(`sm:text-${align.sm}`);
  if (align.md) alignClasses.push(`md:text-${align.md}`);
  if (align.lg) alignClasses.push(`lg:text-${align.lg}`);

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
  };

  return (
    <Component
      className={cn(
        sizeClasses.join(' '),
        alignClasses.join(' '),
        weightClasses[weight],
        className
      )}
    >
      {children}
    </Component>
  );
}
