import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { mockProducts } from "@/lib/data";
import { adminAPI, productAPI } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    {
      title: "Total Products",
      value: mockProducts.length,
      change: "+2 this week",
      icon: Package,
    },
    {
      title: "Total Orders",
      value: "156",
      change: "+12% from last month",
      icon: TrendingUp,
    },
    {
      title: "Revenue",
      value: "$4,250",
      change: "+8% from last month",
      icon: DollarSign,
    },
    {
      title: "Customers",
      value: "89",
      change: "+5 new this week",
      icon: Users,
    },
  ]);
  const [products, setProducts] = useState(mockProducts.slice(0, 5));
  const [loading, setLoading] = useState(false);

  // Fetch dashboard data from backend
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Try to fetch from backend, fallback to mock data
      const dashboardStats = await adminAPI.getDashboardStats();
      setStats(dashboardStats);

      const productsData = await productAPI.getProducts({ limit: 5 });
      setProducts(productsData.products || productsData);
    } catch (error) {
      console.log('Using mock data - backend not available');
      // Keep using mock data if backend is not available
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={0} isAuthenticated={true} userRole="admin" />
      <main className="container py-6 max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your bakery
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboardData}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Simple Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple Products List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Products
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge
                          variant={product.isAvailable ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {product.isAvailable ? "Available" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Simple Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <Package className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <h3 className="font-medium text-gray-900 mb-2">Orders</h3>
                <p className="text-sm text-gray-600 mb-4">Manage customer orders</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Orders
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <h3 className="font-medium text-gray-900 mb-2">Customers</h3>
                <p className="text-sm text-gray-600 mb-4">View customer data</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Customers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
