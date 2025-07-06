import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    // Enhanced responsive breakpoints for better device support
    screens: {
      'xs': '475px',      // Extra small devices (large phones)
      'sm': '640px',      // Small devices (tablets)
      'md': '768px',      // Medium devices (small laptops)
      'lg': '1024px',     // Large devices (laptops/desktops)
      'xl': '1280px',     // Extra large devices (large desktops)
      '2xl': '1536px',    // 2X large devices (larger desktops)
      '3xl': '1920px',    // 3X large devices (ultra-wide)

      // Device-specific breakpoints
      'mobile': {'max': '767px'},           // Mobile-only styles
      'tablet': {'min': '768px', 'max': '1023px'}, // Tablet-only styles
      'desktop': {'min': '1024px'},         // Desktop and up

      // Orientation-based breakpoints
      'portrait': {'raw': '(orientation: portrait)'},
      'landscape': {'raw': '(orientation: landscape)'},

      // High DPI screens
      'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        bakery: {
          warm: "hsl(var(--bakery-warm))",
          cream: "hsl(var(--bakery-cream))",
          brown: "hsl(var(--bakery-brown))",
          gold: "hsl(var(--bakery-gold))",
          dark: "hsl(var(--bakery-dark))",
          light: "hsl(var(--bakery-light))",
          medium: "hsl(var(--bakery-medium))",
        },
        // Additional earth tone colors for comprehensive theming
        earth: {
          50: "#fdf8f6",   // Very light warm white
          100: "#f2e8e5",  // Light cream
          200: "#eaddd7",  // Warm beige
          300: "#e0cfc5",  // Light brown
          400: "#d2bab0",  // Medium beige
          500: "#b8a082",  // Warm brown
          600: "#a0845c",  // Golden brown
          700: "#8b6914",  // Rich brown
          800: "#744c28",  // Dark brown
          900: "#5d3a1a",  // Very dark brown
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      // Enhanced spacing scale for better mobile/desktop consistency
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
      },
      // Mobile-friendly font sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Mobile-specific sizes
        'mobile-xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'mobile-sm': ['0.75rem', { lineHeight: '1rem' }],
        'mobile-base': ['0.875rem', { lineHeight: '1.25rem' }],
        'mobile-lg': ['1rem', { lineHeight: '1.5rem' }],
        'mobile-xl': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      // Touch-friendly sizing
      minHeight: {
        'touch': '44px',    // Minimum touch target size
        'touch-lg': '48px', // Large touch target
      },
      minWidth: {
        'touch': '44px',    // Minimum touch target size
        'touch-lg': '48px', // Large touch target
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          from: {
            opacity: "0",
            transform: "scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
