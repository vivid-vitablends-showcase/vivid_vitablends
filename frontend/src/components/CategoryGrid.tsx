import categoryPickles from "@/assets/category-pickles.jpg";
import categoryPowders from "@/assets/category-powders.jpg";

const categories = [
  { name: "Premium Pickles", image: categoryPickles, desc: "Bold flavors, traditional recipes", tag: "Best for: Taste lovers" },
  { name: "Health Powders", image: categoryPowders, desc: "Daily nutrition, natural goodness", tag: "Best for: Immunity & Fitness" },
];

const CategoryGrid = () => {
  return (
    <section id="categories" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Discover Our Collections</h2>
          <p className="mt-2 text-muted-foreground">Handpicked categories for your wellness journey</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative img-zoom h-[350px] md:h-[450px] rounded-lg overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent transition-all group-hover:from-foreground/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold bg-accent/90 text-accent-foreground rounded-full">{cat.tag}</span>
                <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                  {cat.name}
                </h2>
                <p className="mt-2 text-sm text-primary-foreground/70">{cat.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-warm-gold transition-transform group-hover:translate-x-2">
                  Explore →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
