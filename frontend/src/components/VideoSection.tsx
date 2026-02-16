import { Play } from "lucide-react";
import { useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Our Story</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
          Made with Love, Served with Pride
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Every jar tells a story of tradition, care, and purity. Watch how we bring our grandmother's recipes to your table.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg">
          {!playing ? (
            <div
              className="group relative cursor-pointer"
              onClick={() => setPlaying(true)}
              role="button"
              aria-label="Play video"
            >
              <img
                src={heroBanner}
                alt="Video thumbnail - Our story"
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-colors group-hover:bg-foreground/40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform group-hover:scale-110">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-foreground/5 flex items-center justify-center rounded-lg">
              <p className="text-muted-foreground">Video player placeholder — Add your video URL here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
