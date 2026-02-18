import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya M.", text: "The pickles taste exactly like my grandmother's recipe! Authentic and fresh.", rating: 5, tag: "Repeat Customer" },
  { name: "Rajesh K.", text: "ABC juice powder has become part of my daily routine. Highly recommend!", rating: 5, tag: "Verified Buyer" },
  { name: "Anita S.", text: "100% natural ingredients. You can taste the quality in every bite.", rating: 5, tag: "Verified Buyer" },
];

const SocialProof = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Loved by Thousands</h2>
          <p className="mt-2 text-muted-foreground">Real reviews from real customers</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="relative rounded-lg bg-card p-6 shadow-sm">
              <Quote className="absolute right-4 top-4 text-accent/20" size={32} />
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 relative z-10">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">⭐ Rated 4.9/5 by 500+ happy customers</p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
