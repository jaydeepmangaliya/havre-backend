import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useCart } from "@/lib/cart-context";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { itemCount } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="nike-section bg-background">
          <div className="nike-container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="nike-heading-xl text-foreground">
                GET IN TOUCH
              </h1>
              <p className="nike-body-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions about our products or want to place a custom order? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="nike-section bg-background">
          <div className="nike-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {/* Contact Information - MATCH SEND MESSAGE CARD */}
              <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 bg-background border border-[#ede5df] rounded-xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h2 className="nike-heading-lg text-foreground mb-6">
                    VISIT US
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <Label className="text-foreground font-medium mb-2 block">Location</Label>
                      <div className="block w-full border-0 border-b border-[#d6d3ce] text-gray-900 bg-transparent pb-2">
                        123 Bakery Street<br />New York, NY 10001<br />United States
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground font-medium mb-2 block">Phone</Label>
                      <div className="block w-full border-0 border-b border-[#d6d3ce] text-gray-900 bg-transparent pb-2">
                        <a href="tel:+1234567890" className="hover:text-primary transition-colors duration-200">(123) 456-7890</a>
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground font-medium mb-2 block">Email</Label>
                      <div className="block w-full border-0 border-b border-[#d6d3ce] text-gray-900 bg-transparent pb-2">
                        <a href="mailto:hello@havre.com" className="hover:text-primary transition-colors duration-200">hello@havre.com</a>
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground font-medium mb-2 block">Hours</Label>
                      <div className="block w-full border-0 border-b border-[#d6d3ce] text-gray-900 bg-transparent pb-2">
                        Monday - Friday: 6:00 AM - 8:00 PM<br />Saturday - Sunday: 7:00 AM - 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>
                {/* Store Image */}
                <div className="relative rounded-xl overflow-hidden shadow-sm mt-8">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1555507036-ab794f0eedc4?w=600&h=400&fit=crop&crop=center"
                    alt="HAVRE Bakery storefront"
                    className="object-cover w-full h-[180px] md:h-[220px] lg:h-[180px] xl:h-[220px]"
                    height={180}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2 bg-background border border-[#ede5df] rounded-xl p-6 md:p-8">
                <h2 className="nike-heading-lg text-foreground mb-6">
                  SEND MESSAGE
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-medium mb-2 block">
                        Name *
                      </Label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="block w-full border-0 border-b border-[#d6d3ce] focus:border-black focus:border-b-2 focus:outline-none text-gray-900 bg-transparent placeholder:text-gray-400 shadow-none transition-colors duration-200"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium mb-2 block">
                        Email *
                      </Label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="block w-full border-0 border-b border-[#d6d3ce] focus:border-black focus:border-b-2 focus:outline-none text-gray-900 bg-transparent placeholder:text-gray-400 shadow-none transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-foreground font-medium mb-2 block">
                      Subject *
                    </Label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="block w-full border-0 border-b border-[#d6d3ce] focus:border-black focus:border-b-2 focus:outline-none text-gray-900 bg-transparent placeholder:text-gray-400 shadow-none transition-colors duration-200"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground font-medium mb-2 block">
                      Message *
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="block w-full border-0 border-b border-[#d6d3ce] focus:border-black focus:border-b-2 focus:outline-none text-gray-900 bg-transparent placeholder:text-gray-400 shadow-none transition-colors duration-200 resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full btn-primary-enhanced mt-2">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section - MATCH CARD STYLE */}
        <section className="nike-section bg-background">
          <div className="nike-container">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <div className="w-full bg-background border border-[#ede5df] rounded-xl p-6 md:p-8 mb-8">
                <h2 className="nike-heading-lg text-foreground mb-6">FIND US</h2>
                <div className="bg-white/80 rounded-2xl shadow-md h-96 flex items-center justify-center mb-6">
                  <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                </div>
                <div className="block w-full border-0 border-b border-[#d6d3ce] text-gray-900 bg-transparent pb-2 mb-4">
                  Located in the heart of downtown, we're easily accessible by public transport and have parking available nearby.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="nike-section bg-black text-white">
          <div className="nike-container text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="nike-heading-lg text-white">
                READY TO ORDER?
              </h2>
              <p className="nike-body-lg text-gray-300 max-w-2xl mx-auto">
                Browse our full selection of fresh, artisan baked goods available for pickup or delivery.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
