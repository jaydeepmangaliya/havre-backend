import { Link } from "react-router-dom";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Footer } from "@/components/layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, clearCart, setCart } from "@/lib/cartSlice";
import { mockProducts } from "@/lib/data";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Get product details for cart items with error handling
  const cartItemsWithDetails = items.map((cartItem) => {
    const product = mockProducts.find((p) => p.id === cartItem.id);
    return {
      ...cartItem,
      product,
    };
  }).filter((item) => item.product); // Filter out items where product wasn't found

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08; // 8% tax
  const delivery = subtotal > 50 ? 0 : 5.99; // Free delivery over $50
  const orderTotal = subtotal + tax + delivery;

  // Format price utility function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Handle quantity update
  const handleQuantityUpdate = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(itemId));
    } else {
      // Update quantity by replacing the cart in Redux
      const updated = items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      dispatch(setCart(updated));
    }
  }, [dispatch, items]);

  // Handle clear cart with confirmation
  const handleClearCart = useCallback(() => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  }, [dispatch]);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <main className="container-responsive py-12 xs:py-16 sm:py-20 safe-area-top" role="main">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 xs:mb-10 sm:mb-12">
              <div className="inline-flex items-center px-3 xs:px-4 py-1.5 xs:py-2 bg-amber-100 text-amber-800 rounded-full text-xs xs:text-sm font-semibold uppercase tracking-wide mb-6 xs:mb-8">
                Your Cart
              </div>
              <ShoppingBag
                className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 mx-auto text-gray-400 mb-4 xs:mb-6"
                aria-hidden="true"
              />
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 xs:mb-6 tracking-tight">
                YOUR CART IS EMPTY
              </h1>
              <p className="text-base xs:text-lg sm:text-xl text-gray-700 mb-8 xs:mb-10 sm:mb-12 font-medium leading-relaxed px-4">
                Looks like you haven't added any delicious treats to your cart
                yet. Browse our fresh baked goods and find something you'll
                love!
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 justify-center">
              <Button
                size="lg"
                className="w-full xs:w-auto bg-primary text-primary-foreground px-6 xs:px-8 py-4 xs:py-5 rounded-xl font-semibold text-base xs:text-lg min-h-touch hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link to="/products">Browse Products</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full xs:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 xs:px-8 py-4 xs:py-5 rounded-xl font-semibold text-base xs:text-lg min-h-touch transition-all duration-300 shadow-md hover:shadow-lg"
                asChild
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
     
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container-responsive py-8 xs:py-10 sm:py-12 safe-area-top" role="main">
        {/* Enhanced Mobile-First Header */}
        <div className="mb-8 xs:mb-10 sm:mb-12">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 xs:mb-6 text-muted-foreground hover:text-foreground rounded-xl min-h-touch px-3 py-2 hover:bg-muted transition-all duration-200"
            asChild
          >
            <Link to="/products" aria-label="Continue shopping for more products" className="flex items-center">
              <ArrowLeft className="h-4 w-4 xs:h-5 xs:w-5 mr-2" aria-hidden="true" />
              Continue Shopping
            </Link>
          </Button>
          <div className="text-center">
            <div className="inline-flex items-center px-3 xs:px-4 py-1.5 xs:py-2 bg-bakery-light text-bakery-dark rounded-full text-xs xs:text-sm font-semibold uppercase tracking-wide mb-4 xs:mb-6 shadow-sm">
              Your Cart
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 xs:mb-4 tracking-tight">
              SHOPPING CART
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-gray-700 font-medium" aria-live="polite">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8">
          {/* Enhanced Mobile-First Cart Items */}
          <div className="lg:col-span-2 space-y-4 xs:space-y-6">
            {cartItemsWithDetails.map((item) => (
              <Card key={item.id} className="rounded-xl xs:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
                <CardContent className="p-4 xs:p-5 sm:p-6">
                  <div className="flex gap-3 xs:gap-4">
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      fallbackSrc={item.product?.fallbackImage}
                      className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 object-cover rounded-lg flex-shrink-0"
                      width={112}
                      height={112}
                      loading="lazy"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2 xs:mb-3">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-semibold text-base xs:text-lg sm:text-xl truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs xs:text-sm text-muted-foreground capitalize">
                            {item.product!.category}
                          </p>
                          {item.product!.allergens.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              Contains: {item.product!.allergens.join(", ")}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-destructive hover:text-destructive min-w-touch min-h-touch w-8 h-8 xs:w-10 xs:h-10 p-0 rounded-lg flex-shrink-0"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4 xs:h-5 xs:w-5" aria-hidden="true" />
                        </Button>
                      </div>

                      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4">
                        <div className="flex items-center gap-2 xs:gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="min-w-touch min-h-touch w-8 h-8 xs:w-10 xs:h-10 p-0 rounded-lg"
                          >
                            <Minus className="h-3 w-3 xs:h-4 xs:w-4" aria-hidden="true" />
                          </Button>
                          <span
                            className="w-10 xs:w-12 text-center font-medium text-sm xs:text-base"
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="min-w-touch min-h-touch w-8 h-8 xs:w-10 xs:h-10 p-0 rounded-lg"
                          >
                            <Plus className="h-3 w-3 xs:h-4 xs:w-4" aria-hidden="true" />
                          </Button>
                        </div>

                        <div className="text-left xs:text-right">
                          <div className="font-semibold text-base xs:text-lg">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-xs xs:text-sm text-muted-foreground">
                            {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex flex-col xs:flex-row justify-between items-stretch xs:items-center pt-4 xs:pt-6 gap-3 xs:gap-4">
              <Button
                className="w-full min-h-touch py-3 text-base font-semibold tracking-wide rounded-lg mt-0 bg-primary hover:bg-bakery-gold text-primary-foreground transition-all duration-300 shadow hover:shadow-lg font-sans"
                size="lg"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="ghost"
                asChild
                className="w-full xs:w-auto min-h-touch px-4 py-3 rounded-xl hover:bg-muted transition-all duration-200"
              >
                <Link to="/products">Add More Items</Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile-First Order Summary */}
          <div>
            <Card className="rounded-lg shadow border border-border/50 bg-white/90" style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-[#3a2c1a]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 pb-4 px-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Delivery</span>
                    <span className="font-medium">
                      {delivery === 0 ? (
                        <Badge variant="secondary" className="text-xs">Free</Badge>
                      ) : (
                        formatPrice(delivery)
                      )}
                    </span>
                  </div>
                  {subtotal < 50 && delivery > 0 && (
                    <p className="text-xs text-muted-foreground bg-amber-50 p-2 rounded-lg">
                      Add {formatPrice(50 - subtotal)} more for free delivery!
                    </p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
                <Button
                  className="w-full min-h-touch py-3 text-base font-semibold tracking-wide rounded-lg mt-4 bg-primary hover:bg-bakery-gold text-primary-foreground transition-all duration-300 shadow hover:shadow-lg font-sans"
                  size="lg"
                  asChild={true}
                >
                  <Link to="/checkout" className="flex items-center justify-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Proceed to Checkout
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center leading-relaxed mt-2">
                  Secure checkout powered by industry-standard encryption
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    
    </div>
  );
}
