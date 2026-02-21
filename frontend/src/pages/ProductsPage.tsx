import { Home, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/Product";

type SectionProps = {
  title: string;
  category: string;
};

const Section = ({ title, category }: SectionProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: filteredProducts } = useProducts(category);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (product: Product) => {
    navigate("/checkout", {
      state: {
        buyNowItem: {
          ...product,
          quantity: 1,
        },
      },
    });
  };

  if (filteredProducts.length === 0) return null;

  return (
    <section className="mb-20">
      <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl bg-card p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex h-56 items-center justify-center overflow-hidden rounded-xl bg-muted p-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="mb-2 text-sm font-semibold text-foreground">
              {product.name}
            </h3>

            <p className="mb-4 text-xs text-muted-foreground">
              {product.description}
            </p>

            <p className="mb-4 text-sm font-bold text-green-600">
              ₹{product.price}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleBuyNow(product)}
                className="flex-1 rounded-md border border-earthy-brown px-3 py-2 text-xs font-semibold text-black hover:bg-earthy-brown/10"
              >
                Buy Now
              </button>

              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 rounded-md border border-earthy-brown px-3 py-2 text-xs font-semibold text-black hover:bg-earthy-brown/10"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <main className="min-h-screen bg-secondary">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-zinc-400 px-5 py-4 shadow-md md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg p-2 text-black hover:bg-white/20"
          >
            <Home size={22} />
          </button>

          <h1 className="font-display text-xl font-bold tracking-wide text-black">
            Our Products
          </h1>

          <button
            onClick={() => navigate("/cart")}
            className="relative rounded-lg p-2 text-black hover:bg-white/20"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-5 py-14 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="max-w-2xl text-sm text-muted-foreground">
              Explore our homemade pickles and healthy smoothie & juice powders
              — crafted with care and no preservatives.
            </p>
          </div>

          <Section title="Health Products" category="health" />
          <Section title="Pickles" category="pickle" />
          <Section title="Combos" category="combo" />
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
