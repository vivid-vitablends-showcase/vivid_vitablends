import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useCombos } from "@/hooks/useProducts";
import { Product } from "@/types/Product";
import { useState } from "react";
import ProductDetailModal from "@/components/ProductDetailModal";

const ComboOffers = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: combos } = useCombos();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    navigate("/checkout", {
      state: {
        buyNowItem: {
          ...product,
          quantity: 1,
        },
      },
    });
  };

  if (combos.length === 0) return null;

  return (
    <section id="combos" className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="mb-0 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Bundle & Save
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Combo Offers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8">
          {combos.map((combo) => {
            const savings =
              combo.originalPrice && combo.originalPrice > combo.price
                ? combo.originalPrice - combo.price
                : null;

            return (
              <div
                key={combo.id}
                onClick={() => setSelectedProduct(combo)}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition hover:shadow-xl md:flex-row cursor-pointer"
              >
                {/* Image */}
                <div className="h-64 md:h-auto md:w-1/2">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  {/* Dynamic Badge */}
                  {combo.badge && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                      {combo.badge}
                    </span>
                  )}

                  {/* Savings */}
                  {savings && (
                    <span className="mb-3 inline-block w-fit rounded-md bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                      Save ₹{savings}
                    </span>
                  )}

                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {combo.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {combo.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-accent">
                      ₹{combo.price}
                    </span>

                    {combo.originalPrice && (
                      <span className="text-base text-muted-foreground line-through">
                        ₹{combo.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={(e) => handleBuyNow(e, combo)}
                      className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 active:scale-95"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={(e) => handleAddToCart(e, combo)}
                      className="flex-1 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default ComboOffers;
