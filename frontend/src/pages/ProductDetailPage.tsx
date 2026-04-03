import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const { products } = useProducts();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </main>
    );
  }

  const isOutOfStock = product.inStock === false;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { buyNowItem: { ...product, quantity: 1 } } });
  };

  return (
    <main className="min-h-screen bg-secondary">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-warm-gold to-amber-600 px-4 py-3 shadow-lg md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display text-base font-bold tracking-wide text-white md:text-xl line-clamp-1 max-w-[60%] text-center">
            {product.name}
          </h1>
          <button
            onClick={() => navigate("/cart")}
            className="relative rounded-lg p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="View cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-2xl">
          {/* IMAGE */}
          <div className="relative mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-card p-6 shadow-md aspect-square max-h-80 md:max-h-96">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
            {isOutOfStock && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                Out of Stock
              </span>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 bg-warm-gold text-white text-xs font-bold px-3 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* DETAILS */}
          <div className="rounded-2xl bg-card p-5 shadow-md space-y-4">
            <h2 className="text-lg font-bold text-foreground md:text-2xl">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-xl font-bold text-green-600 md:text-2xl">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-green-600">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 rounded-xl bg-warm-gold py-3 text-sm font-semibold text-white transition-all hover:bg-amber-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? "Out of Stock" : "Buy Now"}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 rounded-xl border-2 border-warm-gold py-3 text-sm font-semibold text-warm-gold transition-all hover:bg-warm-gold hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
