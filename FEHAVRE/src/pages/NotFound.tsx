import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            {/* Enhanced 404 Illustration */}
            <div className="mb-12">
              <div className="text-9xl font-black text-gray-200 select-none">
                404
              </div>
              <div className="text-6xl mb-6">🥖</div>
            </div>

            {/* Enhanced Content */}
            <div className="space-y-6 mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
                Page Not Found
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                OOPS! PAGE NOT FOUND
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                It looks like this page has been eaten! The page you're looking
                for doesn't exist or may have been moved.
              </p>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold" asChild>
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full font-semibold" asChild>
                <Link to="/products">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Products
                </Link>
              </Button>
            </div>

            {/* Enhanced Help text */}
            <div className="mt-12 text-gray-600">
              <p className="font-medium">
                Need help? Try visiting our{" "}
                <Link to="/products" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold">
                  products page
                </Link>{" "}
                or{" "}
                <Link to="/contact" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold">
                  contact us
                </Link>{" "}
                directly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
