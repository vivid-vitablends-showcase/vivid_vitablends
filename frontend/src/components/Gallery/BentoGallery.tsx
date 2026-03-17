import React from "react";
import { cn } from "@/lib/utils";

const mockImages = [
  {
    src: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800",
    title: "Pure Essence",
    className:
      "col-span-12 md:col-span-4 aspect-square md:aspect-[3/4] md:mt-24",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200",
    title: "Vibrant Health",
    className: "col-span-12 md:col-span-8 aspect-[4/3] md:aspect-video",
  },
  {
    src: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000",
    title: "Mindful Moments",
    className:
      "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-square md:-mt-32",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    title: "Organic Roots",
    className: "col-span-12 md:col-span-3 aspect-square md:aspect-[2/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    title: "Vitality",
    className:
      "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-[3/4] md:mt-16",
  },
  {
    src: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1200",
    title: "Holistic",
    className: "col-span-12 md:col-span-7 md:col-start-3 aspect-video",
  },
];

const BentoGallery = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-8 auto-rows-min">
      {mockImages.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "group relative overflow-hidden bg-muted rounded-2xl",
            item.className
          )}
        >
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Text reveal on hover */}
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <h3 className="text-white font-display text-2xl md:text-3xl lg:text-4xl tracking-tight drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGallery;
