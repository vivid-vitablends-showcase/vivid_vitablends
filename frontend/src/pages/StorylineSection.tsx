const StorylineSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-5xl px-5 md:px-10 text-center">
       

        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl animate-fade-up-delay-1">
          Food the way it was meant to be
        </h2>

        <div className="mt-10 space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up-delay-2">
            In a world full of preservatives, shortcuts, and artificial flavors,
            we chose a different path.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up-delay-3">
            Every pickle we prepare, every wellness blend we craft, begins with
            real ingredients, slow processes, and generations of tradition.
          </p>

          <p className="text-lg font-semibold text-foreground animate-fade-up-delay-4">
            Because good food doesn’t just fill you — it cares for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorylineSection;
