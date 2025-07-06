import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface Category {
  value: string;
  label: string;
  image?: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-8 sm:py-12 md:py-16 premium-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 animate-slide-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            SHOP BY CATEGORY
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto shadow-sm"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.value}
              to={`/products?category=${category.value}`}
              className="group block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-[300px] items-center">
                <div className="relative aspect-square w-full h-[450px] overflow-hidden">
                  <OptimizedImage
                    src={category.image ||
                      (category.value === "bread"
                        ? "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&crop=center"
                        : category.value === "cakes"
                        ? "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&crop=center"
                        : category.value === "pastries"
                        ? "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&h=300&fit=crop&crop=center"
                        : category.value === "cookies"
                        ? "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop&crop=center"
                        : category.value === "muffins"
                        ? "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=300&fit=crop&crop=center"
                        : "https://images.unsplash.com/photo-1555507036-ab794f0eedc4?w=300&h=300&fit=crop&crop=center")
                    }
                    alt={category.label}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-full py-3 flex-1">
                  <h3 className="text-center text-sm font-medium text-foreground leading-tight mb-1 w-full">
                    {category.label}
                  </h3>
                  <p className="text-center text-sm text-muted-foreground w-full">
                    Premium Quality
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
