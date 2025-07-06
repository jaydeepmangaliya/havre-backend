import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import { bakeryInfo } from "@/lib/data";

export default function OrderSuccess() {
  const location = useLocation();
  const { orderTotal, orderNumber } = location.state || {};

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Enhanced Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
              Order Confirmed
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              ORDER CONFIRMED!
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Thank you for your order. We're preparing your delicious treats!
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Order Number
                  </span>
                  <p className="font-mono font-semibold">
                    #{orderNumber || "ABC123456"}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Order Total
                  </span>
                  <p className="font-semibold">
                    {orderTotal ? formatPrice(orderTotal) : "$25.99"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-600">
                    Estimated Delivery Time
                  </p>
                  <p className="text-sm text-blue-600">45-60 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Order Received</p>
                    <p className="text-sm text-muted-foreground">
                      We've received your order and payment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-muted border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Preparing Your Order</p>
                    <p className="text-sm text-muted-foreground">
                      Our bakers are carefully preparing your fresh items
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-muted border-2 border-muted-foreground rounded-full flex items-center justify-center text-xs text-muted-foreground font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Out for Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your order will be on its way shortly
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-muted border-2 border-muted-foreground rounded-full flex items-center justify-center text-xs text-muted-foreground font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Delivered
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Enjoy your fresh baked goods!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Call us</p>
                    <p className="text-sm text-muted-foreground">
                      {bakeryInfo.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visit our bakery</p>
                    <p className="text-sm text-muted-foreground">
                      {bakeryInfo.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold" asChild>
              <Link to="/products">Order Again</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full font-semibold" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
