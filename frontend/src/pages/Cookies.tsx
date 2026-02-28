import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const Cookies = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { products: cookieProducts } = useProducts("cookies");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Cart Button */}
      <div className="fixed right-6 top-6 z-50">
        <button
          onClick={() => navigate("/cart")}
          className="relative bg-transparent p-3 transition hover:scale-105"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section
        className="
          relative text-black
          bg-gradient-to-b from-amber-600 via-orange-500 to-white
          md:bg-gradient-to-r md:from-amber-600 md:via-orange-500 md:to-orange-700
        "
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-foreground hover:bg-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-1 text-2xl font-bold md:text-5xl">
            Cookies
          </h1>
          <p className="mx-auto text-sm max-w-2xl text-lg">
            Freshly baked, crunchy and delicious cookies made with premium ingredients.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cookieProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cookies;