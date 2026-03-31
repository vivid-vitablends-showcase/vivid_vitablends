import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import hero1 from "@/assets/hero1.png";
import hero2 from "@/assets/hero2.png";
import hero3 from "@/assets/hero3.png";
import hero4 from "@/assets/hero4.png";
import hero5 from "@/assets/hero5.png";

// desktop images
import hero1desk from "@/assets/hero1desk.png";
import hero2desk from "@/assets/hero2desk.png";
import hero3desk from "@/assets/hero3desk.png";
import hero4desk from "@/assets/hero4desk.png";
import hero5desk from "@/assets/hero5desk.png";

const MOBILE_SLIDES = [hero1, hero5, hero2, hero3, hero4];

const DESKTOP_SLIDES = [hero1desk, hero2desk, hero3desk, hero4desk, hero5desk];

const COLLECTIONS = [
  "Spice Powders",
  "Health Powders",
  "Pickles",
  "Cookies",
  "Jams",
  "Chocolate Candies",
  "Fruit Powder",
  "Vegetable Powder",
];

const DURATION = 5000;

const HeroSection = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % MOBILE_SLIDES.length);
      setProgressKey((prev) => prev + 1);
    }, DURATION);

    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setProgressKey((prev) => prev + 1);
  };

  return (
    <section id="hero" className="w-full md:px-6 lg:px-8">
      {/* ================= MOBILE VIEW ================= */}
      <div
        className="relative w-full overflow-hidden md:hidden"
        style={{ aspectRatio: "3/2", maxHeight: "80vh" }}
      >
        {MOBILE_SLIDES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <img
              src={src}
              alt={`Hero ${i + 1}`}
              onClick={() => navigate("/products")}
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {MOBILE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-[3px] rounded-full overflow-hidden"
              style={{
                width: i === current ? 48 : 24,
                transition: "width 0.4s ease",
              }}
            >
              <span className="absolute inset-0 bg-white/30 rounded-full" />

              {i === current && (
                <span
                  key={progressKey}
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  style={{
                    animation: `hero-progress ${DURATION}ms linear forwards`,
                  }}
                />
              )}

              {i < current && (
                <span className="absolute inset-0 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block relative w-full overflow-hidden rounded-[32px] shadow-xl h-[85vh]">
        {DESKTOP_SLIDES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: i === current % DESKTOP_SLIDES.length ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              pointerEvents:
                i === current % DESKTOP_SLIDES.length ? "auto" : "none",
            }}
          >
            <img
              src={src}
              alt={`Hero Desktop ${i + 1}`}
              onClick={() => navigate("/products")}
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* desktop indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {DESKTOP_SLIDES.map((_, i) => {
            const desktopCurrent = current % DESKTOP_SLIDES.length;

            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-[3px] rounded-full overflow-hidden"
                style={{
                  width: i === desktopCurrent ? 48 : 24,
                  transition: "width 0.4s ease",
                }}
              >
                <span className="absolute inset-0 bg-white/30 rounded-full" />

                {i === desktopCurrent && (
                  <span
                    key={`${progressKey}-desktop`}
                    className="absolute inset-y-0 left-0 bg-white rounded-full"
                    style={{
                      animation: `hero-progress ${DURATION}ms linear forwards`,
                    }}
                  />
                )}

                {i < desktopCurrent && (
                  <span className="absolute inset-0 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= COLLECTIONS ================= */}
      <div className="py-8 md:py-10 px-4">
        <h2 className="text-center text-xl md:text-3xl font-bold text-foreground">
          Our Collections
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {COLLECTIONS.map((item) => (
            <span
              key={item}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-3 py-1.5 text-xs md:text-sm font-medium text-foreground shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {" "}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
