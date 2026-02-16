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
  },
  {
    name: "Health Essentials Pack",
    desc: "Complete wellness powder collection",
    image: comboPowders,
    price: 549,
    originalPrice: 648,
    save: 99,
  },
];

const ComboOffers = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Bundle & Save</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Combo Offers</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {combos.map((combo) => (
            <div key={combo.name} className="card-hover group flex flex-col overflow-hidden rounded-lg bg-card md:flex-row">
              <div className="img-zoom h-64 md:h-auto md:w-1/2">
                <img src={combo.image} alt={combo.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                <span className="inline-block w-fit rounded-md bg-earthy-green/10 px-3 py-1 text-xs font-bold text-earthy-green">
                  Save ₹{combo.save}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{combo.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{combo.desc}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-accent">₹{combo.price}</span>
                  <span className="text-base text-muted-foreground line-through">₹{combo.originalPrice}</span>
                </div>
                <button className="mt-5 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 md:w-auto">
                  Add to Cart
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
