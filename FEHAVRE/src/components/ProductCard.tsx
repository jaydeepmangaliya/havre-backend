import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({
  product,
  className,
}: ProductCardProps) {


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, type: "spring" }}
      className={cn(
        "flex flex-col h-full items-center group mobile-theme-card hover:shadow-lg transition-all duration-300",
        className,
      )}
    >
      <Link to={`/products/${product.id}`} className="block w-full">
        <div className="relative aspect-square w-full h-[225px] overflow-hidden">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            fallbackSrc={product.fallbackImage}
            className="object-cover w-full  group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width={400}
            height={225}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-between w-full py-5 flex-1">
        <div className="flex flex-col items-center w-full">
          <Link to={`/products/${product.id}`} className="w-full">
            <h3 className="text-center text-sm font-medium text-foreground leading-tight mb-1 w-full">
              {product.name}
            </h3>
          </Link>
          <p className="text-center text-sm text-muted-foreground w-full">
            ${product.price.toFixed(2)} USD
          </p>
        </div>

      </div>
    </motion.div>
  );
}
