import categoryPickles from "@/assets/category-pickles.jpg";
import categoryPowders from "@/assets/category-powders.jpg";

const categories = [
  {
    name: "Premium Pickles",
    image: categoryPickles,
    desc: "Traditional recipes, bold flavors",
  },
  {
    name: "Health Powders",
    image: categoryPowders,
    desc: "Nature's goodness, powdered",
  },
];

const CategoryGrid = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        {/* 🔥 Changed grid to always 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative h-[220px] md:h-[450px] overflow-hidden rounded-xl"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all group-hover:from-black/80" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-4 md:p-8">
                <h2 className="font-display text-lg font-bold text-white md:text-4xl">
                  {cat.name}
                </h2>

                <p className="mt-1 text-xs text-white/80 md:text-sm">
                  {cat.desc}
                </p>

                <span className="mt-2 inline-block text-xs font-semibold text-warm-gold transition-transform group-hover:translate-x-2 md:text-sm">
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
