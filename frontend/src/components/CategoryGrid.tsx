import { Link } from "react-router-dom";
import categoryPickles from "@/assets/category-pickles.jpg";
import categoryPowders from "@/assets/category-powders.jpg";
import categorySpices from "@/assets/category-spices.jpg";
import categoryJams from "@/assets/category-jams.jpg";
import categoryCookies from "@/assets/cookies.jpg";
import categoryChocolates from "@/assets/ChocolateCandies.jpg";
import categoryFruitVeg from "@/assets/Fruits&vegitable powders.jpg";

const categories = [
  {
    name: "Premium Pickles",
    image: categoryPickles,
    desc: "Traditional recipes, bold flavors",
    path: "/premium-pickles",
  },
  {
    name: "Health Powders",
    image: categoryPowders,
    desc: "Nature's goodness, powdered",
    path: "/health-powders",
  },
  {
    name: "Everyday Essentials Powders (Spices)",
    image: categorySpices,
    desc: "Authentic aroma & rich flavor",
    path: "/spices",
  },
  {
    name: "Jams",
    image: categoryJams,
    desc: "Sweet, fruity & delightful",
    path: "/jams",
  },
  {
    name: "Cookies",
    image: categoryCookies,
    desc: "Freshly baked happiness",
    path: "/cookies",
  },
  {
    name: "Chocolate Candies",
    image: categoryChocolates,
    desc: "Indulgent & irresistible",
    path: "/chocolates",
  },
  {
    name: "Fruit & Vegetable Powders",
    image: categoryFruitVeg,
    desc: "Natural nutrition in every scoop",
    path: "/fruit-veg-powders",
  },
];

const CategoryGrid = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
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

              {/* Text */}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;