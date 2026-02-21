import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        buyNowItem: {
          ...product,
          quantity: 1,
        },
      },
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  };

  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      <div className="flex h-48 items-center justify-center bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-contain"
          loading="lazy"
        />
      </div>

      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>

        <p className="mb-4 text-muted-foreground">{product.description}</p>

        <div className="mb-4">
          <span className="text-lg font-bold text-green-600">
            ₹{product.price}
          </span>
        </div>

        <div className="flex gap-3">
          <Button className="w-1/2" onClick={handleBuyNow}>
            Buy Now
          </Button>

          <Button variant="outline" className="w-1/2" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
