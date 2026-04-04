import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, Zap, CheckCircle2, XCircle, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Product } from "@/types/Product";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type ProductDetailModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const isOutOfStock = product.inStock === false;
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
    onClose();
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: { buyNowItem: { ...product, quantity: 1 } },
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-secondary border-none sm:rounded-2xl max-h-[90vh] flex flex-col">
        <VisuallyHidden>
          <DialogTitle>{product.name} Details</DialogTitle>
        </VisuallyHidden>
        <div className="overflow-y-auto w-full max-h-full">
          <div className="p-4 md:p-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
              {/* ---- IMAGE PANEL ---- */}
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-card shadow-md lg:sticky lg:top-0 lg:mb-0">
                <div className="flex aspect-square items-center justify-center p-6 md:p-10">
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
                <div className="flex flex-col gap-3 pt-1 sm:flex-row mt-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
