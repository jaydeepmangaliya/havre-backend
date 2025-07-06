import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import "./header-animations.css";

interface HeaderProps {
  cartItemCount?: number;
  isAuthenticated?: boolean;
  userRole?: "customer" | "admin";
}

export function Header({
  cartItemCount = 0,
  isAuthenticated = false,
  userRole = "customer",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <header className="backdrop-blur-lg bg-background/80 border-b border-border sticky top-0 z-50 safe-area-top transition-all duration-300">
      <div className="container mx-auto px-4 flex h-16 sm:h-18 md:h-20 items-center justify-between relative max-w-7xl">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 gap-4">
          <Link to="/" className="flex items-center group">
            <img
              src="/images/bakery/logo/havre-logo.png"
              alt="Havre Bakery Logo"
              className="h-8 w-auto sm:h-10 md:h-12 object-contain transition-all duration-200"
              style={{ maxWidth: '100px' }}
            />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-foreground">HAVRE</span>
          </Link>
        </div>

        {/* Center: Brand Name - Hidden on small screens to prevent overlap */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center pointer-events-none select-none">
          
        </div>
        {/* Right: Navigation and Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
          {/* Desktop Navigation - Better responsive breakpoints */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link-animated text-sm xl:text-base font-medium py-2 px-3 flex items-center transition-colors",
                  isCurrentPath(item.href)
                    ? "active text-primary"
                    : "text-gray-700 hover:text-gray-900",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions with better responsive sizing */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Cart Button - Simplified sizing */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <Link to="/cart" className="flex items-center justify-center w-full h-full">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600 text-white rounded-full font-bold min-w-[20px] min-h-[20px] z-20 border-2 border-white shadow"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart with {cartItemCount} items</span>
              </Link>
            </Button>

            {/* Auth Actions - Simplified responsive design */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-2">
                {userRole === "admin" && (
                  <Button
                    size="sm"
                    className="h-10 text-sm px-3"
                    asChild
                  >
                    <Link to="/admin" className="flex items-center justify-center">Admin</Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-lg hover:bg-muted transition-colors duration-200"
                  asChild
                >
                  <Link to="/profile" className="flex items-center justify-center w-full h-full">
                    <User className="h-5 w-5 text-foreground" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 text-sm px-3 rounded-lg hover:bg-muted transition-colors duration-200"
                  asChild
                >
                  <Link to="/login" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="h-10 text-sm px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                  asChild
                >
                  <Link to="/signup" className="flex items-center justify-center">Join Us</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu - Show on medium and smaller screens */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="lg:hidden w-10 h-10 p-0 rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-200"
                  size="sm"
                >
                  <Menu className="h-5 w-5 text-foreground" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] bg-background border-l border-border"
              >
                <nav className="flex flex-col space-y-2 pt-6 pb-4">
                  <div className="pb-4 border-b border-border">
                    <span className="text-xl font-black text-foreground tracking-tight">
                      HAVRE
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">Artisan Bakery</p>
                  </div>

                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "nav-link-animated flex text-base font-medium py-3 px-4 items-center rounded-lg transition-colors",
                        isCurrentPath(item.href)
                          ? "active bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="pt-4 border-t border-border space-y-2">
                    {isAuthenticated ? (
                      <>
                        {userRole === "admin" && (
                          <Button
                            className="w-full text-base font-medium py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                            asChild
                          >
                            <Link
                              to="/admin"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-center"
                            >
                              Admin Dashboard
                            </Link>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          className="w-full text-base font-medium justify-start py-3 px-4 rounded-lg hover:bg-muted"
                          asChild
                        >
                          <Link
                            to="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center"
                          >
                            <User className="h-4 w-4 mr-3" />
                            Profile
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full text-base font-medium py-3 rounded-lg hover:bg-muted"
                          asChild
                        >
                          <Link
                            to="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center"
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </Link>
                        </Button>
                        <Button
                          className="w-full text-base font-medium py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                          asChild
                        >
                          <Link
                            to="/signup"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center"
                          >
                            Join Us
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
