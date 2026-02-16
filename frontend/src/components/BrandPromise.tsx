import { Leaf, Home, ShieldCheck, BookOpen } from "lucide-react";

const promises = [
  { icon: Leaf, title: "100% Natural", desc: "Pure ingredients, no chemicals" },
  { icon: Home, title: "Homemade", desc: "Crafted in small batches" },
  { icon: ShieldCheck, title: "No Preservatives", desc: "Fresh & preservative-free" },
  { icon: BookOpen, title: "Traditional Recipe", desc: "Passed down generations" },
];

const BrandPromise = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {promises.map((p, i) => (
            <div
              key={p.title}
              className={`card-hover flex flex-col items-center rounded-lg bg-card p-6 text-center md:p-8 animate-fade-up-delay-${Math.min(i, 3)}`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <p.icon size={28} className="text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
