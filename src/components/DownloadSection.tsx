import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";

const DownloadSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 lg:p-16 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Tải ứng dụng Xanh Market ngay hôm nay
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                Trải nghiệm mua sắm thông minh với khả năng truy xuất nguồn gốc sản phẩm 
                ngay trên điện thoại của bạn.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="elegant" 
                size="lg"
                className="bg-background text-primary hover:bg-background/90 min-w-[200px]"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Tải cho iOS
              </Button>
              <Button 
                variant="elegant" 
                size="lg"
                className="bg-background text-primary hover:bg-background/90 min-w-[200px]"
              >
                <Download className="mr-2 h-5 w-5" />
                Tải cho Android
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-primary-foreground/80 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-foreground rounded-full"></span>
                <span>Miễn phí hoàn toàn</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-foreground rounded-full"></span>
                <span>Không quảng cáo</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-foreground rounded-full"></span>
                <span>Bảo mật cao</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;