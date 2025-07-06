// Bakery information
export const bakeryInfo = {
  name: "Havre Bakery",
  tagline: "Freshly Baked with Love",
  description: "A family-owned bakery serving the finest pastries, breads, and desserts since 1985.",
  address: "123 Main Street, Downtown",
  phone: "(555) 123-4567",
  email: "hello@havrebakery.com",
  hours: {
    weekdays: "6:00 AM - 8:00 PM",
    weekends: "7:00 AM - 9:00 PM"
  },
  social: {
    facebook: "https://facebook.com/havrebakery",
    instagram: "https://instagram.com/havrebakery",
    twitter: "https://twitter.com/havrebakery"
  },
  features: [
    "Fresh ingredients sourced daily",
    "Traditional recipes passed down through generations",
    "Artisan techniques with modern quality standards",
    "Custom orders for special occasions",
    "Gluten-free and vegan options available"
  ]
};

// Product categories
export const categories = [
  {
    id: "all",
    name: "All Products",
    value: "all",
    label: "All Products",
    icon: "🍞",
    description: "Browse our complete selection"
  },
  {
    id: "breads",
    name: "Breads",
    value: "bread",
    label: "Artisan Breads",
    icon: "🍞",
    description: "Fresh baked daily with traditional methods"
  },
  {
    id: "pastries",
    name: "Pastries",
    value: "pastries",
    label: "French Pastries",
    icon: "🥐",
    description: "Buttery, flaky, and irresistibly delicious"
  },
  {
    id: "cakes",
    name: "Cakes",
    value: "cakes",
    label: "Custom Cakes",
    icon: "🎂",
    description: "Perfect for celebrations and special occasions"
  },
  {
    id: "cookies",
    name: "Cookies",
    value: "cookies",
    label: "Homemade Cookies",
    icon: "🍪",
    description: "Classic recipes with premium ingredients"
  },
  {
    id: "desserts",
    name: "Desserts",
    value: "muffins",
    label: "Sweet Treats",
    icon: "🧁",
    description: "Indulgent desserts to satisfy your sweet tooth"
  }
];

// Optimized image URLs with faster CDN and smaller sizes
const getOptimizedImageUrl = (category: string, id: string) => {
  const baseUrl = "https://picsum.photos";
  const categorySeeds = {
    breads: 100 + parseInt(id),
    pastries: 200 + parseInt(id),
    cakes: 300 + parseInt(id),
    cookies: 400 + parseInt(id),
    desserts: 500 + parseInt(id),
  };

  const seed = categorySeeds[category as keyof typeof categorySeeds] || 600 + parseInt(id);
  return `${baseUrl}/400/300?random=${seed}`;
};

// Fallback placeholder generator
const generatePlaceholder = (text: string) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa"/>
      <rect x="20" y="20" width="360" height="260" fill="#e9ecef" rx="8"/>
      <text x="200" y="140" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif" font-size="16" font-weight="500">
        ${text}
      </text>
      <text x="200" y="170" text-anchor="middle" dy=".3em" fill="#adb5bd" font-family="Arial, sans-serif" font-size="12">
        Fresh from our bakery
      </text>
    </svg>
  `)}`;
};

// Mock products data
export const mockProducts = [
  {
    id: "1",
    name: "Artisan Sourdough",
    description: "Traditional sourdough bread with a crispy crust and tangy flavor",
    price: 8.99,
    image: getOptimizedImageUrl("breads", "1"),
    fallbackImage: generatePlaceholder("Artisan Sourdough"),
    category: "breads",
    inStock: true,
    prepTime: "2 hours",
    ingredients: ["Flour", "Water", "Salt", "Sourdough starter"],
    allergens: ["Gluten"],
    nutritionalInfo: {
      calories: 250,
      protein: 8,
      carbs: 48,
      fat: 2
    }
  },
  {
    id: "2",
    name: "Chocolate Croissant",
    description: "Buttery, flaky pastry filled with rich dark chocolate",
    price: 4.50,
    image: getOptimizedImageUrl("pastries", "2"),
    fallbackImage: generatePlaceholder("Chocolate Croissant"),
    category: "pastries",
    inStock: true,
    prepTime: "30 minutes",
    ingredients: ["Butter", "Flour", "Dark chocolate", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 320,
      protein: 6,
      carbs: 35,
      fat: 18
    }
  },
  {
    id: "3",
    name: "Red Velvet Cake",
    description: "Moist red velvet cake with cream cheese frosting",
    price: 24.99,
    image: getOptimizedImageUrl("cakes", "3"),
    fallbackImage: generatePlaceholder("Red Velvet Cake"),
    category: "cakes",
    inStock: true,
    prepTime: "1 hour",
    ingredients: ["Flour", "Cocoa", "Cream cheese", "Butter", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 450,
      protein: 5,
      carbs: 65,
      fat: 20
    }
  },
  {
    id: "4",
    name: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with premium chocolate chips",
    price: 12.99,
    image: getOptimizedImageUrl("cookies", "4"),
    fallbackImage: generatePlaceholder("Chocolate Chip Cookies"),
    category: "cookies",
    inStock: true,
    prepTime: "20 minutes",
    ingredients: ["Flour", "Chocolate chips", "Butter", "Sugar", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 180,
      protein: 3,
      carbs: 25,
      fat: 8
    }
  },
  {
    id: "5",
    name: "Blueberry Muffin",
    description: "Fresh blueberry muffins with a golden top",
    price: 3.25,
    image: getOptimizedImageUrl("desserts", "5"),
    fallbackImage: generatePlaceholder("Blueberry Muffin"),
    category: "desserts",
    inStock: true,
    prepTime: "25 minutes",
    ingredients: ["Flour", "Fresh blueberries", "Sugar", "Eggs", "Milk"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 280,
      protein: 4,
      carbs: 42,
      fat: 11
    }
  },
  {
    id: "6",
    name: "French Baguette",
    description: "Traditional French baguette with a crispy crust",
    price: 3.99,
    image: getOptimizedImageUrl("breads", "6"),
    fallbackImage: generatePlaceholder("French Baguette"),
    category: "breads",
    inStock: true,
    prepTime: "3 hours",
    ingredients: ["Flour", "Water", "Salt", "Yeast"],
    allergens: ["Gluten"],
    nutritionalInfo: {
      calories: 200,
      protein: 7,
      carbs: 40,
      fat: 1
    }
  },
  {
    id: "7",
    name: "Almond Croissant",
    description: "Buttery croissant filled with sweet almond cream",
    price: 5.25,
    image: getOptimizedImageUrl("pastries", "7"),
    fallbackImage: generatePlaceholder("Almond Croissant"),
    category: "pastries",
    inStock: false,
    prepTime: "45 minutes",
    ingredients: ["Butter", "Flour", "Almond cream", "Sliced almonds"],
    allergens: ["Gluten", "Dairy", "Nuts", "Eggs"],
    nutritionalInfo: {
      calories: 380,
      protein: 8,
      carbs: 32,
      fat: 25
    }
  },
  {
    id: "8",
    name: "Tiramisu Cake",
    description: "Italian-inspired tiramisu cake with coffee and mascarpone",
    price: 28.99,
    image: getOptimizedImageUrl("cakes", "8"),
    fallbackImage: generatePlaceholder("Tiramisu Cake"),
    category: "cakes",
    inStock: true,
    prepTime: "2 hours",
    ingredients: ["Mascarpone", "Coffee", "Ladyfingers", "Cocoa powder"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 45,
      fat: 24
    }
  }
];

// Featured products (subset of mockProducts)
export const featuredProducts = mockProducts.slice(0, 4);

// Testimonials
export const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    comment: "The best bakery in town! Their sourdough is absolutely incredible.",
    date: "2024-01-15"
  },
  {
    id: "2",
    name: "Mike Chen",
    rating: 5,
    comment: "Amazing pastries and friendly service. Highly recommend!",
    date: "2024-01-10"
  },
  {
    id: "3",
    name: "Emily Davis",
    rating: 4,
    comment: "Great selection and quality. The chocolate croissants are my favorite!",
    date: "2024-01-08"
  }
];

// Gallery images (auto-generated list)
export const galleryImages = [
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.29.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.29 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.29 (2).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.30.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.30 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.31.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.31 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.32.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.32 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.33.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.33 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.34.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.34 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.35.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.35 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.35 (2).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.36.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.36 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.37.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.37 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.38.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.38 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.38 (2).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.39.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.39 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.40.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.40 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.40 (2).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.41.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.41 (1).jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.42.jpeg',
  '/images/bakery/gallery/WhatsApp Image 2025-06-23 at 23.39.42 (1).jpeg',
];
