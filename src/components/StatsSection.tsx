const StatsSection = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Nông dân tin tưởng",
      description: "Tham gia hệ thống"
    },
    {
      number: "50,000+",
      label: "Sản phẩm được truy xuất",
      description: "Mỗi tháng"
    },
    {
      number: "99.9%",
      label: "Độ tin cậy",
      description: "Thông tin chính xác"
    },
    {
      number: "24/7",
      label: "Hỗ trợ khách hàng",
      description: "Luôn sẵn sàng"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Con số ấn tượng
          </h2>
          <p className="text-lg text-muted-foreground">
            Niềm tin từ cộng đồng là động lực để chúng tôi phát triển
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-background rounded-2xl p-8 shadow-elegant group-hover:shadow-glow transition-all duration-300">
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;