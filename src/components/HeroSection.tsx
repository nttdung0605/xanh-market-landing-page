import { Button } from "@/components/ui/button";
import { Play, Smartphone } from "lucide-react";
import heroImage from "@/assets/mobile-app.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-subtle min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Quản lý và truy xuất{" "}
                <span className="text-primary">nguồn gốc sản phẩm</span>{" "}
                một cách thông minh, minh bạch và hiệu quả.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Nền tảng giúp người tiêu dùng truy xuất nguồn gốc sản phẩm nông nghiệp, 
                đảm bảo an toàn thực phẩm và hỗ trợ nông dân quản lý sản phẩm hiệu quả.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
              >
                <Smartphone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Tải ứng dụng ngay
              </Button>
              
              <Button 
                variant="elegant" 
                size="lg"
                className="group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Xem demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">✓</span>
                </div>
                <span>100% miễn phí</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">✓</span>
                </div>
                <span>Dễ sử dụng</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">✓</span>
                </div>
                <span>An toàn bảo mật</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center items-center">
  <div className="relative z-10 animate-float">
    <img
      src={heroImage}
      alt="Fresh agricultural products"
      className="w-auto h-[32rem] max-w-full rounded-2xl shadow-elegant"
    />
  </div>
  {/* Background decoration */}
  <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-primary rounded-2xl opacity-20 -z-10"></div>
</div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-100 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-100 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;