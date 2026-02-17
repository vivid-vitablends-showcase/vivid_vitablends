import { useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import productKoorka from "@/assets/koorka.jpg";
import productSmoothie from "@/assets/banana.jpg";
import productAbc from "@/assets/abc.jpg";
import productComboPickles from "@/assets/product-combo-pickles.jpg";

const products = [
  { name: "Koorka Pickle", price: 199, image: productKoorka, tag: "Bestseller" },
  { name: "Dates & Banana Smoothie Powder", price: 299, image: productSmoothie, tag: "New" },
  { name: "ABC Juice Powder", price: 349, image: productAbc, tag: "Popular" },
  { name: "Mixed Pickle Combo", price: 499, originalPrice: 597, image: productComboPickles, tag: "Save ₹98" },
];

const FeaturedProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="featured" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Handpicked for You</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Featured Products</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible"
        >
          {products.map((p) => (
            <div
              key={p.name}
              className="group card-hover min-w-[75vw] snap-start rounded-lg bg-card p-4 md:min-w-0"
            >
              <div className="relative img-zoom aspect-square mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full rounded-lg object-cover"
                  loading="lazy"
                />
                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                    {p.tag}
                  </span>
                )}
                <button
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-lg opacity-0 transition-all group-hover:opacity-100 hover:bg-accent hover:text-accent-foreground"
                  aria-label={`Add ${p.name} to cart`}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{p.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold text-accent">₹{p.price}</span>
                {p.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{p.originalPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
