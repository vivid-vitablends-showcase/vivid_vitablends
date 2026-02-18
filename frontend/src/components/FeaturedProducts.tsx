import { ShoppingCart } from "lucide-react";
import productKoorka from "@/assets/koorka.jpg";
import productAbc from "@/assets/abc.jpg";
import productComboPickles from "@/assets/product-combo-pickles.jpg";

const products = [
  { name: "Koorka Pickle", price: 199, image: productKoorka, tag: "Bestseller" },
  { name: "ABC Juice Powder", price: 349, image: productAbc, tag: "Popular" },
  { name: "Mixed Pickle Combo", price: 499, originalPrice: 597, image: productComboPickles, tag: "Save ₹98" },
];

const FeaturedProducts = () => {
  return (
    <section id="bestsellers" className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Our Bestsellers</h2>
          <p className="mt-2 text-muted-foreground">Most loved by our customers</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.name}
              className="group card-hover rounded-lg bg-card p-5"
            >
              <div className="relative img-zoom aspect-square mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full rounded-lg object-cover"
                  loading="lazy"
                />
                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
                    {p.tag}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">₹{p.price}</span>
                {p.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{p.originalPrice}</span>
                )}
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all hover:brightness-110">
                <ShoppingCart size={18} />
                Taste This Today
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a href="#categories" className="inline-flex items-center text-sm font-semibold text-accent hover:underline">
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
