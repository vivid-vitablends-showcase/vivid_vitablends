import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import BrandPromise from "@/components/BrandPromise";
import FeaturedProducts from "@/components/FeaturedProducts";
import ComboOffers from "@/components/ComboOffers";
import VideoSection from "@/components/VideoSection";
import ContactCards from "@/components/ContactCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <BrandPromise />
        <FeaturedProducts />
        <ComboOffers />
        <VideoSection />
        <ContactCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
