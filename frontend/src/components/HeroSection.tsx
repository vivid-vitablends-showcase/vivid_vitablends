import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[500px] md:h-[85vh]">
        <img
          src={heroBanner}
          alt="Authentic homemade pickles and health powders"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
            <div className="max-w-2xl animate-fade-up">
              <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
                Authentic Homemade Pickles & Health Powders
              </h1>
              <p className="mb-8 text-xl text-primary-foreground/90 animate-fade-up-delay-1">
                Fresh, Natural & Chemical-Free — Made from Grandmother's Recipes
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up-delay-2">
                <a
                  href="#bestsellers"
                  className="inline-flex items-center rounded-lg bg-accent px-10 py-4 text-base font-bold text-accent-foreground transition-all hover:brightness-110 hover:shadow-xl"
                >
                  Shop Bestsellers
                </a>
                <a
                  href="#combos"
                  className="inline-flex items-center rounded-lg border-2 border-primary-foreground/40 bg-primary-foreground/10 backdrop-blur-sm px-10 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/20"
                >
                  View Combo Offers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
