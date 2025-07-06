import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChefHat, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { bakeryInfo } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/lib/authSlice";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { RootState } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/", { state: { message: "Account created successfully!" } });
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return "Please fill in all required fields";
    }
    if (!formData.email.includes("@")) {
      return "Please enter a valid email address";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation) {
      setValidationError(validation);
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    try {
      // Try API registration first
      const response = await authAPI.register({
        email: formData.email,
        password: formData.password,
        firstname: formData.firstName,
        lastname: formData.lastName,
        phone: formData.phone,
        confrompassword: formData.confirmPassword,
      });

      // Store token if provided
      // console.log(response,'response');
      
      // if (response.token) {
      //   localStorage.setItem('authToken', response.token);
      // }
      // else{
      //   throw new Error('Token not provided');
      // }
      // Dispatch signup action with user data
      // dispatch(signup({
      //   email: formData.email,
      //   password: formData.password,
      //   name: formData.firstName + ' ' + formData.lastName,
      //   userData: response.user
      // }));

      toast({
        title: "Account created successfully",
        description: "Welcome to Havre Bakery!",
      });

      navigate("/login");
    } catch (error: any) {
      console.log(error.response.data.error.message);
      toast({
        title: error?.response?.data?.error?.message || "Somthing Went Wrong",
        description:error?.response?.data?.error?.message ? "please Try to Login" : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="min-h-screen">
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
              New Member
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900 mb-3 xs:mb-4 tracking-tight">
              JOIN US TODAY
            </h1>
            <p className="text-base xs:text-lg text-gray-700 font-medium px-4">
              Create your {bakeryInfo.name} account
            </p>
          </div>

          {/* Enhanced Mobile-First Signup Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
                {(error || validationError) && (
                  <Alert variant="destructive" className="rounded-lg">
                    <AlertCircle className="h-4 w-4 xs:h-5 xs:w-5" />
                    <AlertDescription className="text-sm xs:text-base">
                      {validationError || error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div className="space-y-2 xs:space-y-3">
                    <Label htmlFor="firstName" className="text-sm xs:text-base font-semibold">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="rounded-lg py-3 xs:py-4 text-base min-h-touch"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="space-y-2 xs:space-y-3">
                    <Label htmlFor="lastName" className="text-sm xs:text-base font-semibold">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="rounded-lg py-3 xs:py-4 text-base min-h-touch"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>

                <div className="space-y-2 xs:space-y-3">
                  <Label htmlFor="email" className="text-sm xs:text-base font-semibold">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="rounded-lg py-3 xs:py-4 text-base min-h-touch"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                <div className="space-y-2 xs:space-y-3">
                  <Label htmlFor="phone" className="text-sm xs:text-base font-semibold">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="rounded-lg py-3 xs:py-4 text-base min-h-touch"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                <div className="space-y-2 xs:space-y-3">
                  <Label htmlFor="password" className="text-sm xs:text-base font-semibold">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="rounded-lg py-3 xs:py-4 pr-12 xs:pr-14 text-base min-h-touch"
                      style={{ fontSize: '16px' }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 min-w-touch min-h-touch w-10 h-10 xs:w-12 xs:h-12 p-0 hover:bg-gray-100 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 xs:h-5 xs:w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 xs:h-5 xs:w-5 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </Button>
                  </div>
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 w-full rounded ${
                              i < strength
                                ? strength <= 1
                                  ? "bg-red-500"
                                  : strength <= 2
                                    ? "bg-orange-500"
                                    : strength <= 3
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength:{" "}
                        {strength <= 1
                          ? "Weak"
                          : strength <= 2
                            ? "Fair"
                            : strength <= 3
                              ? "Good"
                              : "Strong"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 xs:space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm xs:text-base font-semibold">
                    Confirm Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="rounded-lg py-3 xs:py-4 pr-12 xs:pr-14 text-base min-h-touch"
                      style={{ fontSize: '16px' }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 min-w-touch min-h-touch w-10 h-10 xs:w-12 xs:h-12 p-0 hover:bg-gray-100 rounded-lg"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 xs:h-5 xs:w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 xs:h-5 xs:w-5 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </Button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Passwords match</span>
                      </div>
                    )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 xs:py-5 rounded-lg font-semibold text-base xs:text-lg min-h-touch"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-600">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="font-semibold text-amber-600 hover:text-amber-700 hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
