import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks/useProducts";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: featured } = useFeaturedProducts();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Handpicked For You
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Featured Products
          </h2>
        </div>

        {/* ================= MOBILE SLIDER ================= */}
        <div className="relative overflow-hidden md:hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {featured.map((product) => (
              <div key={product.id} className="w-full flex-shrink-0 px-4">
                <div className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition hover:shadow-xl">
                  {product.badge && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
                      {product.badge}
                    </span>
                  )}

                  <div className="flex h-56 items-center justify-center bg-muted p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">
                      {product.name}
                    </h3>

                    <p className="mb-4 text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mb-5 text-xl font-bold text-accent">
                      ₹{product.price}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="w-1/2"
                        onClick={() =>
                          navigate("/checkout", {
                            state: {
                              buyNowItem: { ...product, quantity: 1 },
                            },
                          })
                        }
                      >
                        Buy Now
                      </Button>

                      <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden grid-cols-3 gap-8 md:grid">
          {featured.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition hover:shadow-xl"
            >
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
                  {product.badge}
                </span>
              )}

              <div className="flex h-56 items-center justify-center bg-muted p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>

                <p className="mb-4 text-sm text-muted-foreground">
                  {product.description}
                </p>

                <div className="mb-5 text-xl font-bold text-accent">
                  ₹{product.price}
                </div>

                <div className="flex gap-3">
                  <Button
                    className="w-1/2"
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          buyNowItem: { ...product, quantity: 1 },
                        },
                      })
                    }
                  >
                    Buy Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
