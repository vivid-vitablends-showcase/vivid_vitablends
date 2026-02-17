import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => (
  <Card className="card-hover">
    <div className="img-zoom aspect-square">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover rounded-t-lg"
        loading="lazy"
      />
    </div>
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-muted-foreground mb-4">{product.description}</p>
      {onViewDetails && (
        <Button className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      )}
    </CardContent>
  </Card>
);

export default ProductCard;
