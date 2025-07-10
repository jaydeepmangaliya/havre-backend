import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productAPI } from "@/lib/api";
import { Search, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Simple Product Card Component
interface ProductCardProps {
  product: any;
  onClick: () => void;
}

function SimpleProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] min-h-touch"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images?.[0]?.url || product.image || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900 text-sm sm:text-base">
            ${Number(product.price)?.toFixed(2) || '0.00'}
          </span>
          {(product.stock > 0 || product.isAvailable !== false) ? (
            <Badge variant="default" className="text-xs">
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setpagination] = useState({})
  const { toast } = useToast();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await productAPI.getProducts();
        setpagination(productsData?.data?.pagination || {});
        setProducts(productsData?.data?.items || productsData || []);
      } catch (error) {
        console.log('API not available, using mock data');
        // Fallback to mock data if API is not available
        // setProducts(mockProducts);
        toast({
          title: "Server not available",
          description: "Please try again later.",
        });

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    if(pagination?.hasNext){
       const fetchProducts = async () => {
        try {
          const productsData = await productAPI.getProducts({page:pagination.currentPage + 1});
          setpagination(productsData?.data?.pagination );
          setProducts( [...products, ...productsData?.data?.items]);
        } catch (error) {
          console.log('API not available, using mock data');
        } 

      fetchProducts();
    }
  }
  }, [pagination])
  
  // Filter products by search query only
  const filteredProducts = useMemo(() => {
    let filtered = products;
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product: any) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.ingredients && product.ingredients.some((ingredient: string) =>
            ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          ))
      );
    }

    return filtered;
  }, [products, searchQuery]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Our Products
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fresh baked goods made daily with the finest ingredients
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Simplified Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product: any) => (
              <SimpleProductCard
                key={product.id || product._id}
                product={product}
                onClick={() => navigate(`/products/${product.id || product._id}`, {
                  state: { image: product.images?.[0]?.url || product.image }
                })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? `No products match "${searchQuery}". Try a different search term.`
                  : "No products available at the moment."
                }
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
