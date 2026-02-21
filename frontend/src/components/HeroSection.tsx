import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[500px] md:h-[85vh]">
        {/* <img
          src={heroBanner}
          alt="Vivid Vitablends premium homemade food products"
          className="h-full w-full object-cover"
          loading="eager"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
            <div className="max-w-lg animate-fade-up">
              <p className="mb-12 text-sm font-semibold uppercase tracking-[0.2em] text-warm-gold">
                No Preservatives, Just real ingredients
              </p>
              <h1 className="mb-12 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
                Pure. Natural.{" "}
                <span className="text-warm-gold text-3xl md:text-5xl lg:text-6xl">
                  Crafted with Care.
                </span>
              </h1>
              <p className="mb-12 text-lg text-primary-foreground/80 animate-fade-up-delay-1">
                Pickles, wellness blends & everyday essentials
              </p>
              <div className="flex gap-4 animate-fade-up-delay-2">
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 hover:shadow-lg"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
