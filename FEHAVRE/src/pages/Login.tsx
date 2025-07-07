import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChefHat, Eye, EyeOff, AlertCircle } from "lucide-react";
import { bakeryInfo } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/authSlice";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { RootState } from "@/lib/store";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Try API login first
      const response = await authAPI.login(formData);
      // Store token
      if (response?.data?.token) {
        localStorage.setItem('authToken', response.token);
      }
      else{
        throw new Error('Token not provided');
      }
      // Dispatch login action with user data
      dispatch(login({
        email: formData.email,
        password: formData.password,
        userData: response.user
      }));

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      // Navigate based on user role
      navigate('/')
    } catch (error: any) {
      console.log('API login failed, using mock authentication');

      // Fallback to mock authentication

      toast({
        title: "Somthing Went Wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-100">
      <main className="container-responsive py-8 xs:py-12 sm:py-16 md:py-20 safe-area-top">
        <div className="max-w-md mx-auto">
          {/* Enhanced Mobile-First Header */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12">
            <div className="flex items-center justify-center mb-4 xs:mb-6">
              <div className="flex h-12 w-12 xs:h-16 xs:w-16 items-center justify-center rounded-xl xs:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg">
                <ChefHat className="h-6 w-6 xs:h-8 xs:w-8 text-white" />
              </div>
            </div>
            <div className="inline-flex items-center px-3 xs:px-4 py-1.5 xs:py-2 bg-amber-100 text-amber-800 rounded-full text-xs xs:text-sm font-semibold uppercase tracking-wide mb-4 xs:mb-6">
              Member Login
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900 mb-3 xs:mb-4 tracking-tight">
              WELCOME BACK
            </h1>
            <p className="text-base xs:text-lg text-gray-700 font-medium px-4">
              Sign in to your {bakeryInfo.name} account
            </p>
          </div>

          {/* Enhanced Mobile-First Login Form */}
          <div className="p-0 xs:p-0 shadow-none rounded-none">
            

            <form onSubmit={handleSubmit} className="space-y-5 xs:space-y-6">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 xs:h-5 xs:w-5" />
                  <AlertDescription className="text-red-800 text-sm xs:text-base">{error}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    Sign In
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-semibold">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-900 font-semibold">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 min-w-touch min-h-touch w-10 h-10 p-0 hover:bg-gray-100 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-amber-600 hover:text-amber-700 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 xs:py-5 rounded-lg font-semibold text-base xs:text-lg min-h-touch"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-600">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="font-semibold text-amber-600 hover:text-amber-700 hover:underline"
              >
                Sign up here
              </Link>
            </div>
          </div>

          {/* Enhanced Demo Credentials */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6">
            <div className="text-center text-sm">
              <p className="font-semibold text-gray-900 mb-3">
                Demo Credentials:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Admin:</strong> admin@bakery.com / admin
                </p>
                <p>
                  <strong>Customer:</strong> customer@example.com / password
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
