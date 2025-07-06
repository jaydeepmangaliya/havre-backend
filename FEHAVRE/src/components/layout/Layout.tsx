import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cartItemCount={itemCount}
        isAuthenticated={isAuthenticated}
        userRole={user?.role || "customer"}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 