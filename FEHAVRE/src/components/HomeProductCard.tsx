import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

interface HomeProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    fallbackImage?: string;
  };
  className?: string;
}

export function HomeProductCard({ product, className }: HomeProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className={cn("group block", className)}
    >
      <div className="flex flex-col h-[450px] items-center">
        <div className="relative aspect-square w-full h-[450px] overflow-hidden">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            fallbackSrc={product.fallbackImage}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full py-3 flex-1">
          <h3 className="text-center text-sm font-medium text-foreground leading-tight mb-1 w-full">
            {product.name}
          </h3>
          <p className="text-center text-sm text-muted-foreground w-full">
            ${product.price.toFixed(2)} USD
          </p>
        </div>
      </div>
    </Link>
  );
}
