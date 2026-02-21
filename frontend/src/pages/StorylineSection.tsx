import storyImage from "@/assets/hero-banner.jpg"; // 👈 add your image

const StorylineSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-6xl px-5 md:px-10">

        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* ================= IMAGE ================= */}
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={storyImage}
              alt="Traditional homemade preparation"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* ================= TEXT ================= */}
          <div className="text-center md:text-left">

            <h2 className="font-display text-2xl font-bold text-foreground md:text-5xl">
              Food the way it was meant to be
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg font-medium leading-relaxed text-orange-500">
                In a world full of preservatives, shortcuts, and artificial flavors,
                we chose a different path.
              </p>

              <p className="text-lg font-sans  leading-relaxed text-orange-500">
                Every pickle we prepare, every wellness blend we craft, begins with
                real ingredients, slow processes, and generations of tradition.
              </p>

              <p className="text-sm font-sans text-foreground md:text-lg">
                Because good food doesn’t just fill you — it cares for you.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default StorylineSection;