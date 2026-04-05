import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { EmptyCart } from "@/components/EmptyCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showDetails, setShowDetails] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const discount = subtotal > 1999 ? 200 : 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            Your Cart
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-semibold text-yellow-800">
              {cart.length}
            </span>
          </h1>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cart Items List */}
            <div className="flex-1 w-full space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
                >
                  {/* Image */}
                  <div className="h-32 w-32 sm:h-36 sm:w-36 flex-shrink-0 rounded-xl bg-gray-50 p-3 border border-gray-100 self-center sm:self-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="text-lg font-bold text-gray-900 whitespace-nowrap hidden sm:block">
                          ₹ {item.price * item.quantity}
                        </div>
                      </div>

                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Mobile Price Display */}
                      <div className="mt-3 text-sm font-medium text-gray-600 sm:hidden bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span>₹ {item.price}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 mt-1">
                          <span>Total</span>
                          <span>₹ {item.price * item.quantity}</span>
                        </div>
                      </div>

                      {/* Desktop Price Display */}
                      <div className="mt-2 text-sm text-gray-500 hidden sm:block">
                        ₹ {item.price} each
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-4 sm:mt-6 flex items-center justify-between border-t border-gray-100 sm:border-none pt-4 sm:pt-0">
                      <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1 bg-gray-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-600 transition-all bg-white shadow-sm sm:bg-transparent sm:shadow-none"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="flex w-10 sm:w-12 items-center justify-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-600 transition-all bg-white shadow-sm sm:bg-transparent sm:shadow-none"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-red-50 bg-red-50/50 sm:bg-transparent"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary (Desktop) */}
            <div className="hidden lg:block w-[380px] flex-shrink-0">
              <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="mb-6 text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-yellow-500" />
                  Order Summary
                </h3>

                <div className="space-y-4 text-sm max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-gray-600"
                    >
                      <div className="flex gap-2 line-clamp-1 pr-4">
                        <span className="font-semibold text-gray-900">
                          {item.quantity}x
                        </span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900 whitespace-nowrap">
                        ₹ {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-6 border-t border-dashed border-gray-200" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹ {subtotal}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (Orders above ₹1999)</span>
                      <span className="font-medium">-₹ {discount}</span>
                    </div>
                  )}
                </div>

                <div className="my-6 border-t border-dashed border-gray-200" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹ {total}
                  </span>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full h-14 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 text-base font-bold transition-colors shadow-sm"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>

            {/* Bottom Mobile Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-4 pb-6 lg:hidden shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                <div
                  className="flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
                  onClick={() => setShowDetails(true)}
                >
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Total ({cart.length} item{cart.length > 1 ? "s" : ""})
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-gray-900">₹ {total}</p>
                    <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider underline underline-offset-2">
                      Details
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="h-12 px-8 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 font-bold shadow-sm"
                >
                  Checkout
                </Button>
              </div>
            </div>

            {/* Mobile Details Modal Overlay */}
            {showDetails && (
              <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
                onClick={() => setShowDetails(false)}
              >
                {/* Modal Content */}
                <div
                  className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col rounded-t-[2rem] bg-white shadow-2xl animate-in slide-in-from-bottom-full duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <ShoppingBag size={20} className="text-yellow-500" />
                      Order Details
                    </h3>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="overflow-y-auto p-6 space-y-6">
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start gap-4 text-sm"
                        >
                          <div className="flex gap-3 items-center flex-1">
                            <div className="h-12 w-12 rounded-lg bg-gray-50 border border-gray-100 p-1 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain mix-blend-multiply"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 line-clamp-2">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.quantity} x ₹ {item.price}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-gray-900 whitespace-nowrap pt-3">
                            ₹ {item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed border-gray-200" />

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ₹ {subtotal}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount (Orders &gt; ₹1999)</span>
                          <span className="font-medium">-₹ {discount}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-dashed border-gray-200" />

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹ {total}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-t-xl pb-6">
                    <Button
                      onClick={() => {
                        setShowDetails(false);
                        navigate("/checkout");
                      }}
                      className="w-full h-14 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 text-base font-bold transition-colors shadow-sm"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
