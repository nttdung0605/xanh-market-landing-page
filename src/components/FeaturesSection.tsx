import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Shield, Users, BarChart3, Leaf, CheckCircle } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: QrCode,
      title: "Truy xuất nguồn gốc",
      description: "Quét mã QR để biết rõ nguồn gốc, quy trình sản xuất và chất lượng sản phẩm nông nghiệp.",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "An toàn thực phẩm",
      description: "Đảm bảo chất lượng và an toàn thực phẩm thông qua hệ thống kiểm soát chặt chẽ.",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Kết nối nông dân",
      description: "Kết nối trực tiếp với nông dân, hỗ trợ tiêu thụ sản phẩm và chia sẻ kinh nghiệm.",
      color: "text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Quản lý thông minh",
      description: "Hệ thống quản lý tự động giúp theo dõi sản phẩm từ khâu gieo trồng đến tiêu thụ.",
      color: "text-orange-600"
    },
    {
      icon: Leaf,
      title: "Nông nghiệp xanh",
      description: "Khuyến khích canh tác hữu cơ và phương pháp nông nghiệp bền vững.",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      title: "Chứng nhận chất lượng",
      description: "Hệ thống chứng nhận và đánh giá chất lượng sản phẩm đáng tin cậy.",
      color: "text-indigo-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Xanh Market cung cấp giải pháp toàn diện cho việc quản lý và truy xuất nguồn gốc sản phẩm nông nghiệp
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-all duration-300 border-border hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                        <IconComponent className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;