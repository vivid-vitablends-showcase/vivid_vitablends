import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const HealthPowders = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { products: healthPowders } = useProducts("health");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed right-6 top-6 z-50">
        <button
          onClick={() => navigate("/cart")}
          className="relative rounded-full bg-white p-3 shadow transition hover:scale-105"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-2  text-sm font-medium text-foreground  hover:bg-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Health Powders
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Pure, natural health powders crafted to boost your daily wellness.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {healthPowders.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealthPowders;
