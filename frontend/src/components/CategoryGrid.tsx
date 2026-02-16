import categoryPickles from "@/assets/category-pickles.jpg";
import categoryPowders from "@/assets/category-powders.jpg";

const categories = [
  { name: "Premium Pickles", image: categoryPickles, desc: "Traditional recipes, bold flavors" },
  { name: "Health Powders", image: categoryPowders, desc: "Nature's goodness, powdered" },
];

const CategoryGrid = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
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
