import { useQuery } from "@tanstack/react-query";
import { getComingSoonProducts } from "@/services/api/comingSoonApi";
import { Skeleton } from "@/components/ui/skeleton";

const ComingSoonSection = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comingSoon"],
    queryFn: getComingSoonProducts,
  });

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-[hsl(var(--warm-cream))]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[hsl(var(--primary))]">
            Coming Soon
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[hsl(var(--warm-cream))]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[hsl(var(--primary))]">
          Coming Soon
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold text-center">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
