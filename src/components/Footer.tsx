import { ShoppingCart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Sản phẩm": [
      "Tính năng",
      "Giá cả",
      "Bảo mật",
      "Tài liệu API"
    ],
    "Công ty": [
      "Về chúng tôi",
      "Blog",
      "Tuyển dụng",
      "Đối tác"
    ],
    "Hỗ trợ": [
      "Trung tâm trợ giúp",
      "Liên hệ",
      "Báo cáo lỗi",
      "Góp ý"
    ]
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">Xanh Market</span>
            </div>
            <p className="text-background/80 leading-relaxed max-w-md">
              Nền tảng quản lý và truy xuất nguồn gốc sản phẩm nông nghiệp hàng đầu Việt Nam. 
              Kết nối nông dân với người tiêu dùng một cách minh bạch và hiệu quả.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-background/80">
                <Mail className="h-4 w-4" />
                <span>support@xanhmarket.vn</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <Phone className="h-4 w-4" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <MapPin className="h-4 w-4" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-background/80 hover:text-green-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              © 2024 Xanh Market. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-green-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-background/80 hover:text-green-400 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-background/80 hover:text-green-400 transition-colors">
                Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;