import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { galleryApi, GalleryImage } from "@/services/api/galleryApi";

// Repeating mosaic blueprint — col span × row span out of a 4-col grid
// Each "block" of 12 tiles fills the grid with no gaps
const PATTERN: [number, number][] = [
  [2, 2], // big square
  [1, 1], // small
  [1, 1], // small
  [1, 2], // tall
  [1, 1], // small
  [2, 1], // wide
  [1, 1], // small
  [1, 2], // tall
  [2, 1], // wide
  [1, 1], // small
  [1, 1], // small
  [2, 2], // big square
];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { data: items = [], isSuccess } = useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: galleryApi.getAll,
  });

  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) =>
      i !== null ? (i - 1 + items.length) % items.length : null
    );
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % items.length : null));

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lightbox, items.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 py-20 px-6 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #f0c060 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4aa50 0%, transparent 40%)",
          }}
        />
        <button
          onClick={() => navigate("/")}
          className="absolute left-6 top-6 text-amber-300/70 hover:text-amber-300 text-sm flex items-center gap-1 transition-colors"
        >
          <ChevronLeft size={16} /> Home
        </button>
        <p className="text-xs tracking-[0.4em] uppercase text-amber-400/80 mb-3">
          Visual Collection
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-amber-100 mb-4">
          Our Gallery
        </h1>
        <p className="text-amber-300/60 text-sm max-w-md mx-auto">
          Handcrafted with love — every jar tells a story of tradition and
          taste.
        </p>
      </section>

      {/* Mosaic */}
      <main className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        {isSuccess && items.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            No gallery images yet.
          </div>
        ) : (
          <div className="mosaic-grid">
            {items.map((item, idx) => {
              const [colSpan, rowSpan] = PATTERN[idx % PATTERN.length];
              return (
                <div
                  key={item.id}
                  className="mosaic-cell group"
                  style={{
                    gridColumn: `span ${colSpan}`,
                    gridRow: `span ${rowSpan}`,
                    opacity: isSuccess ? 1 : 0,
                    transform: isSuccess ? "scale(1)" : "scale(0.96)",
                    transition: `opacity 0.5s ease ${Math.min(idx * 55, 450)}ms, transform 0.5s ease ${Math.min(idx * 55, 450)}ms`,
                  }}
                  onClick={() => setLightbox(idx)}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-semibold text-sm leading-snug drop-shadow-md line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                    {/* Zoom */}
                    <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn size={13} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className="relative max-w-3xl w-full mx-16 md:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightbox}
              src={items[lightbox].image}
              alt={items[lightbox].title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
              style={{ animation: "lb-in 0.3s ease" }}
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">
                {items[lightbox].title}
              </p>
            </div>
            <p className="absolute -bottom-7 right-0 text-white/30 text-xs">
              {lightbox + 1} / {items.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      <style>{`
        .mosaic-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 160px;
          gap: 6px;
        }
        @media (min-width: 640px) {
          .mosaic-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 180px;
            gap: 8px;
          }
        }
        @media (min-width: 1024px) {
          .mosaic-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 220px;
            gap: 10px;
          }
        }
        .mosaic-cell {
          min-height: 0;
          min-width: 0;
        }
        @keyframes lb-in {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
