import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import placeholder from "@/assets/cartPlaceholder.webp";

export const EmptyCart = (): JSX.Element => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/products");
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-8 py-8 text-center">
      <h2 className="mb-2 text-3xl font-bold text-gray-800">
        Your cart is empty
      </h2>
      <p className="mb-8 text-lg text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <img
        src={placeholder}
        alt="Empty cart"
        loading="lazy"
        width="300"
        height="300"
        className="mb-8 h-[300px] w-[300px] object-contain animate-[bounce_3s_ease-in-out_infinite]"
      />

      <Button
        onClick={handleShopClick}
        className="bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        Start Shopping
      </Button>
    </div>
  );
};
