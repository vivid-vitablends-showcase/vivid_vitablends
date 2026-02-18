import { Tag } from "lucide-react";
import comboPickles from "@/assets/product-combo-pickles.jpg";
import comboPowders from "@/assets/product-combo-powders.jpg";

const combos = [
  {
    name: "Pickle Lovers Pack",
    desc: "3 bestselling pickles in one combo",
    image: comboPickles,
    price: 499,
    originalPrice: 597,
    save: 98,
    tag: "Most Loved"
  },
  {
    name: "Health Essentials Pack",
    desc: "Complete wellness powder collection",
    image: comboPowders,
    price: 549,
    originalPrice: 648,
    save: 99,
    tag: "Popular"
  },
];

const ComboOffers = () => {
  return (
    <section id="combos" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">🔥 Bundle & Save Big</h2>
          <p className="mt-2 text-muted-foreground">Get more, pay less — Limited time offers</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {combos.map((combo) => (
            <div key={combo.name} className="card-hover group relative flex flex-col overflow-hidden rounded-lg bg-card">
              <div className="relative img-zoom h-64">
                <img src={combo.image} alt={combo.name} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
                  <Tag size={14} />
                  {combo.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="inline-block w-fit rounded-full bg-earthy-green/10 px-4 py-1.5 text-sm font-bold text-earthy-green">
                  💰 Save ₹{combo.save}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{combo.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{combo.desc}</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-accent">₹{combo.price}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{combo.originalPrice}</span>
                </div>
                <button className="mt-5 w-full rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-all hover:brightness-110 hover:shadow-lg">
                  Try Fresh Batch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboOffers;
