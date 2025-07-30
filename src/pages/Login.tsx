import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For now, let's use a simple approach - you can replace this with actual API call
      // This is a temporary solution until we have the proper auth endpoints
      const response = await fetch("https://xanhmarket-api.hpcc.vn/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.data?.token || data.token;
        
        if (token) {
          login(token);
          navigate("/blog");
        } else {
          setError("Invalid response from server");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Temporary test login function
  const handleTestLogin = () => {
    // This is a temporary solution for testing
    // In production, you should use proper authentication
    const testToken = "test-token-" + Date.now();
    login(testToken);
    navigate("/blog");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Đăng nhập</CardTitle>
              <p className="text-muted-foreground">
                Đăng nhập để tạo và quản lý blog
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="text-sm text-destructive text-center">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>

              {/* Temporary test login button */}
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={handleTestLogin}
                  className="w-full"
                >
                  🧪 Test Login (Tạm thời)
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Sử dụng để test tính năng tạo blog
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Chưa có tài khoản?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký ngay
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;