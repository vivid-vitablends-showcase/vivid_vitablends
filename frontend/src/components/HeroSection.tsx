import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[500px] md:h-[85vh]">
        <img
          src={heroBanner}
          alt="Vivid Vitablends premium homemade food products"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
            <div className="max-w-lg animate-fade-up">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-warm-gold">
                Handcrafted with Love
              </p>
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
                Pure. Traditional.{" "}
                <span className="text-warm-gold">Authentic.</span>
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/80 animate-fade-up-delay-1">
                Premium homemade pickles & health powders crafted from age-old recipes
              </p>
              <div className="flex gap-4 animate-fade-up-delay-2">
                <a
                  href="#featured"
                  className="inline-flex items-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 hover:shadow-lg"
                >
                  Shop Now
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
                >
                  Our Story
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
