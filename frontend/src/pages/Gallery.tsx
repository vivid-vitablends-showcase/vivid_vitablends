import React, { useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BentoGallery from "@/components/Gallery/BentoGallery";

const Gallery = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 overflow-hidden">
        <section className="px-4 py-16 md:py-24 md:px-12 mx-auto w-full max-w-7xl">
          <div className="mb-12 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-earthy-green font-semibold tracking-[0.15em] text-xs md:text-sm uppercase mb-4 block">
                The Collection
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[#0A0A0A] leading-[1.1]">
                Visual <br />
                <span className="text-warm-gold italic">Symphony</span>
              </h1>
            </div>
            <p className="font-sans text-[#0A0A0A]/60 max-w-md text-base md:text-lg tracking-wide leading-relaxed">
              Step into an immersive showcase of purity and wellness. Explore
              the natural essence, vibrant textures, and mindful moments that
              define our organic roots.
            </p>
          </div>

          <BentoGallery />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
