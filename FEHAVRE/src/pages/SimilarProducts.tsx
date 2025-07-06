import React from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { useNavigate } from "react-router-dom";

// Mock similar products data
const similarProducts = [
  {
    id: "sim-1",
    name: "Chocolate Croissant",
    image: "/images/bakery/products/croissant.jpg",
    price: 3.5,
    description: "Flaky croissant filled with rich chocolate.",
  },
  {
    id: "sim-2",
    name: "Almond Danish",
    image: "/images/bakery/products/almond-danish.jpg",
    price: 4.0,
    description: "Buttery danish topped with toasted almonds.",
  },
  {
    id: "sim-3",
    name: "Raspberry Tart",
    image: "/images/bakery/products/raspberry-tart.jpg",
    price: 4.5,
    description: "Sweet tart with fresh raspberries and cream.",
  },
];

const SimilarProducts: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-8 w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Similar Products</h2>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {similarProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <CategoryCard
              label={product.name}
              value={product.id} // fallback to id since category is missing
              image={product.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;