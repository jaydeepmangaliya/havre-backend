import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/lib/cartSlice";
import { mockProducts } from "@/lib/data";
import { ArrowLeft, CreditCard, Truck, Clock, Store, Info } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { orderAPI ,productAPI } from "@/lib/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const items = useSelector((state: RootState) => state.cart.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("car");
  const [showStoreInfo, setShowStoreInfo] = useState<{open: boolean, store: any | null}>({open: false, store: null});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cartItemsWithDetails, setcartItemsWithDetails] = useState([])
  const [formData, setFormData] = useState({
    // Contact Info
    email: user?.email || "",
    phone: user?.phone || "",

    // Delivery Address
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zip || "",

    // Store Pickup
    storeLocation: "",
    pickupDate: "",
    pickupTime: "",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "",

    // Special Instructions
    instructions: "",
  });
  useEffect(() => {
    console.log(user);
    
  }, [])
  
  // Get product details for cart items with error handlind
  useEffect(() => {
  let itme=[];
    items.map(async(cartItem) => {
    productAPI.getProduct(cartItem.id).then((data)=>{;
      itme =[...itme, {...cartItem, product: data.data}]
      console.log(itme);
      
    }).then(() => {
      setcartItemsWithDetails(itme);
    })

    // setcartItemsWithDetails(itme);
  });

  }, [items])

  // const [formData, setFormData] = useState({
  //   // Contact Info
  //   email: user?.email || "",
  //   phone: user?.phone || "",

  //   // Delivery Address
  //   firstName: user?.firstName || "",
  //   lastName: user?.lastName || "",
  //   address: user?.address?.street || "",
  //   city: user?.address?.city || "",
  //   state: user?.address?.state || "",
  //   zipCode: user?.address?.zip || "",

  //   // Store Pickup
  //   storeLocation: "",
  //   pickupDate: "",
  //   pickupTime: "",

  //   // Payment Info
  //   cardNumber: "",
  //   expiryDate: "",
  //   cvv: "",
  //   nameOnCard: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "",

  //   // Special Instructions
  //   instructions: "",
  // });

  // Store data for pickup
 

  // Add pickup hours for all stores (customize per store if needed)
  const pickupHours = [
    { day: 'Mon', time: '11:30 AM - 6:00 PM' },
    { day: 'Tue', time: '11:30 AM - 6:00 PM' },
    { day: 'Wed', time: '11:30 AM - 6:00 PM' },
    { day: 'Thu', time: '11:30 AM - 6:00 PM' },
    { day: 'Fri', time: '11:30 AM - 6:00 PM' },
    { day: 'Sat', time: '11:30 AM - 6:00 PM' },
    { day: 'Sun', time: '11:30 AM - 6:00 PM' },
  ];

  // Calculate totals

  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const delivery = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + delivery;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await orderAPI.createOrder({
        customerName : `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: `${formData.address} ${formData.city} ${formData.state} ${formData.zipCode}`,
        total,
        transactionId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        ordertype :deliveryMethod ,
        status: 'pending',
        deliveryDate: formData.pickupDate,
        deliverySlot: formData.pickupTime,
        products : items,
        // ...formData,
        // items,
        // deliveryMethod,
        // paymentMethod,
      }).then((res) => {
        console.log(res);
        if(res.success){
          toast({
            title: "Order placed successfully",
            description: "Thank you for your order!",
          });
          dispatch(clearCart());
          // navigate("/order-success", {
          //   state: {
          //     orderTotal: total,
          //     orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          //   },
          // });
        }else{
          toast({
            title: "Order processing failed",
            description: "Please try again later.",
          });
        }
      });
    } catch (error) {
      console.error("Order processing failed:", error);
      toast({
        title: "Order processing failed",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-8">
              Checkout
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              CART IS EMPTY
            </h1>
            <p className="text-xl text-gray-700 mb-12 font-medium">
              You need items in your cart to checkout.
            </p>
            <Button className="bg-primary hover:bg-bakery-gold text-primary-foreground px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <div className="mb-12">
          <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-all duration-200" asChild>
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <div className="text-center">
           
            <img
              src="/images/bakery/logo/havre-logo.png"
              alt="Bakery Logo"
              className="mx-auto mb-4 h-20 w-auto object-contain"
            />
            <div className="text-3xl font-serif font-extrabold tracking-widest text-bakery-dark drop-shadow-sm mb-2" style={{letterSpacing: '0.18em'}}>Havre</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enhanced Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-gray-900 font-semibold">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-semibold">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method Selection */}
              <div>
                <Label className="block text-base font-semibold mb-2">Choose Delivery Method</Label>
                <div className="flex gap-4 mb-4">
                  <div
                    className={`flex-1 cursor-pointer rounded-xl border-2 flex flex-col items-center py-6 px-2 transition-all duration-200 ${deliveryMethod === 'car' ? 'bg-primary/10 border-primary shadow' : 'bg-white border-border/50 hover:border-primary/60'}`}
                    onClick={() => setDeliveryMethod('car')}
                    role="button"
                    tabIndex={0}
                  >
                    <Truck className={`h-8 w-8 mb-2 ${deliveryMethod === 'car' ? 'text-primary' : 'text-gray-400'}`} strokeWidth={0.9}/>
                    <span className={`font-semibold text-base ${deliveryMethod === 'car' ? 'text-primary' : 'text-gray-700'}`}>Deliver by Car</span>
                  </div>
                  <div
                    className={`flex-1 cursor-pointer rounded-xl border-2 flex flex-col items-center py-6 px-2 transition-all duration-200 ${deliveryMethod === 'pickup' ? 'bg-primary/10 border-primary shadow' : 'bg-white border-border/50 hover:border-primary/60'}`}
                    onClick={() => setDeliveryMethod('pickup')}
                    role="button"
                    tabIndex={0}
                  >
                    <Store className={`h-8 w-8 mb-2 ${deliveryMethod === 'pickup' ? 'text-primary' : 'text-gray-400'}`} strokeWidth={0.9} />
                    <span className={`font-semibold text-base ${deliveryMethod === 'pickup' ? 'text-primary' : 'text-gray-700'}`}>Pickup</span>
                  </div>
                </div>
              </div>

              {/* Date and Time Slot Selection (always visible after delivery method) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Label htmlFor="pickupDate">Date *</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    <input
                      id="pickupDate"
                      name="pickupDate"
                      type="text"
                      className="block w-full border-0 border-b border-gray-400 focus:border-black focus:border-b-1 focus:outline-none text-gray-900 pl-10 pr-3 py-2 bg-transparent placeholder:text-gray-900 shadow-none transition-colors duration-200 ms-1 "
                      value={formData.pickupDate ? formData.pickupDate : ''}
                      onClick={() => setShowDatePicker((v) => !v)}
                      readOnly
                      placeholder="Select a date"
                      required
                      autoComplete="off"
                    />
                    {showDatePicker && (
                      <div className="absolute z-50 mt-2 w-full" style={{background: 'none', boxShadow: 'none', border: 'none'}}>
                        <DatePicker
                          selected={formData.pickupDate ? new Date(formData.pickupDate) : null}
                          onChange={(date) => {
                            setFormData((prev) => ({ ...prev, pickupDate: date ? date.toISOString().slice(0, 10) : "" }));
                            setShowDatePicker(false);
                          }}
                          inline
                          minDate={new Date()}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="pickupTime">Time Slot *</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <select
                      id="pickupTime"
                      name="pickupTime"
                      className="block w-full border-0 border-b border-gray-400 focus:border-black focus:border-b-1 focus:outline-none text-gray-900 pl-10 pr-3 py-2 bg-transparent placeholder:text-gray-400 shadow-none transition-colors duration-200"
                      value={formData.pickupTime || ''}
                      onChange={handleInputChange}
                      
                      required
                    >
                      <option value="" disabled hidden>Select a time slot</option>
                      <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM</option>
                      <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                      <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              

              {/* Delivery Address (conditional) */}
              {deliveryMethod === 'car' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required={deliveryMethod === 'car'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required={deliveryMethod === 'car'}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={deliveryMethod === 'car'}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required={deliveryMethod === 'car'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required={deliveryMethod === 'car'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required={deliveryMethod === 'car'}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-4 p-4 border rounded-lg">
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card *</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItemsWithDetails.map((item) => (
                      <div
                        key={item.product!.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.product!.name} × {item.quantity}
                        </span>
                        <span>
                          {formatPrice(item.product!.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>
                        {delivery === 0 ? "Free" : formatPrice(delivery)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Discount/Coupon Code */}
                  <div className="space-y-2">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">Discount Code or Gift Coupon</label>
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        name="coupon"
                        type="text"
                        placeholder="Enter code"
                        className="flex-1"
                        // value={couponCode}
                        // onChange={handleCouponChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        // onClick={applyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: 45-60 minutes</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : `Place Order - ${formatPrice(total)}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
