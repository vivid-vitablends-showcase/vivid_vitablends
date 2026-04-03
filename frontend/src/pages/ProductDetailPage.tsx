import {
  ArrowLeft,
  ShoppingCart,
  ShoppingBag,
  Zap,
  CheckCircle2,
  XCircle,
  Tag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const { products, loading } = useProducts();

  const product = products.find((p) => p.id === id);
  const isOutOfStock = product?.inStock === false;
  const discount =
    product?.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate("/checkout", {
      state: { buyNowItem: { ...product, quantity: 1 } },
    });
  };

  return (
    <main className="min-h-screen bg-secondary">
      {/* ================= TOP BAR ================= */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-warm-gold to-amber-600 px-4 py-3 shadow-lg md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="line-clamp-1 max-w-[60%] text-center font-display text-base font-bold tracking-wide text-white md:text-xl">
            {loading ? "Loading…" : (product?.name ?? "Product")}
          </h1>
          <button
            onClick={() => navigate("/cart")}
            className="relative rounded-lg p-2 text-white transition-colors hover:bg-white/20"
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

      {/* ================= LOADING SKELETON ================= */}
      {loading && (
        <div className="px-4 py-6 md:px-10 md:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="mb-6 aspect-square animate-pulse rounded-2xl bg-card lg:mb-0" />
              <div className="flex flex-col gap-4">
                <div className="h-5 w-1/4 animate-pulse rounded-lg bg-card" />
                <div className="h-8 w-3/4 animate-pulse rounded-lg bg-card" />
                <div className="h-24 animate-pulse rounded-xl bg-card" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-lg bg-card" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-card" />
                  <div className="h-4 w-2/3 animate-pulse rounded-lg bg-card" />
                </div>
                <div className="flex gap-3 pt-2">
                  <div className="h-12 flex-1 animate-pulse rounded-xl bg-card" />
                  <div className="h-12 flex-1 animate-pulse rounded-xl bg-card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= NOT FOUND ================= */}
      {!loading && !product && (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
          <div className="rounded-full bg-card p-6 shadow-md">
            <ShoppingBag size={48} className="text-muted-foreground" />
          </div>
          <div className="text-center">
            <h2 className="mb-2 text-xl font-bold text-foreground">
              Product not found
            </h2>
            <p className="text-sm text-muted-foreground">
              This product may have been removed or the link is incorrect.
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="rounded-xl bg-warm-gold px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-600 active:scale-95"
          >
            Browse All Products
          </button>
        </div>
      )}

      {/* ================= PRODUCT CONTENT ================= */}
      {!loading && product && (
        <div className="px-4 py-6 md:px-10 md:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
              {/* ---- IMAGE PANEL ---- */}
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-card shadow-md lg:sticky lg:top-[68px] lg:mb-0">
                <div className="flex aspect-square items-center justify-center p-6 md:p-12">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Stock badge */}
                {isOutOfStock && (
                  <span className="absolute right-4 top-4 rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-white shadow">
                    Out of Stock
                  </span>
                )}

                {/* Discount badge */}
                {!isOutOfStock && discount && (
                  <span className="absolute left-4 top-4 rounded-lg bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">
                    {discount}% OFF
                  </span>
                )}

                {/* Custom badge */}
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-lg bg-warm-gold px-3 py-1 text-xs font-bold text-white shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* ---- DETAILS PANEL ---- */}
              <div className="flex min-w-0 flex-col gap-5">
                {/* Category tag */}
                {product.category && (
                  <div className="flex items-center gap-1.5">
                    <Tag size={13} className="text-warm-gold" />
                    <span className="text-xs font-semibold capitalize tracking-wide text-warm-gold">
                      {product.category.name}
                    </span>
                  </div>
                )}

                {/* Product name */}
                <h2 className="font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {product.name}
                </h2>

                {/* Price block */}
                <div className="rounded-xl bg-card p-4 shadow-sm">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-bold text-green-600">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <>
                          <span className="text-base text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                            Save ₹
                            {(
                              product.originalPrice - product.price
                            ).toLocaleString("en-IN")}
                          </span>
                        </>
                      )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    {isOutOfStock ? (
                      <>
                        <XCircle size={14} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">
                          Out of Stock
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-xs font-medium text-green-600">
                          In Stock
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="overflow-hidden rounded-xl bg-card p-4 shadow-sm">
                  <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    About this product
                  </h3>
                  <p className="break-words text-sm leading-relaxed text-foreground/80 md:text-base">
                    {product.description}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-warm-gold py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-600 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Zap size={15} />
                    {isOutOfStock ? "Out of Stock" : "Buy Now"}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-warm-gold py-3.5 text-sm font-semibold text-warm-gold transition-all hover:bg-warm-gold hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;
