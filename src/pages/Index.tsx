import DownloadSection from "@/components/DownloadSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <DownloadSection />
      <Footer />
    </div>
  );
};

export default Index;