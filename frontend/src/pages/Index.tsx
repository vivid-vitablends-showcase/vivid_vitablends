import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandPromise from "@/components/BrandPromise";
import FeaturedProducts from "@/components/FeaturedProducts";
import ComboOffers from "@/components/ComboOffers";
import SocialProof from "@/components/SocialProof";
import VideoSection from "@/components/VideoSection";
import CategoryGrid from "@/components/CategoryGrid";
import ContactCards from "@/components/ContactCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <BrandPromise />
        <FeaturedProducts />
        <ComboOffers />
        <SocialProof />
        <VideoSection />
        <CategoryGrid />
        <ContactCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
