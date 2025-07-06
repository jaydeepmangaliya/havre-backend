import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  label: string;
  value: string;
  image: string;
  className?: string;
}

export function CategoryCard({ label, value, image, className }: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${value}`}
      className={cn("group block", className)}
    >
      <div className="flex flex-col h-[300px] items-center">
        <div className="relative aspect-square w-full h-[450px] overflow-hidden">
          <OptimizedImage
            src={image}
            alt={label}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full py-3 flex-1">
          <h3 className="text-center text-sm font-medium text-foreground leading-tight mb-1 w-full">
            {label}
          </h3>
          <p className="text-center text-sm text-muted-foreground w-full">
            Premium Quality
          </p>
        </div>
      </div>
    </Link>
  );
}
