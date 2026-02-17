import ProductPageLayout from "@/components/ProductPageLayout";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import abcpowder from "@/assets/abc.jpg";
import bananadates from "@/assets/banana.jpg";

const healthPowders: Product[] = [
  {
    name: "ABC Juice Powder",
    description: "Rich in antioxidants and essential nutrients",
    image: abcpowder,
  },
  {
    name: "Banana-Dates smoothie Powder",
    description: "Supports immunity and reduces inflammation",
    image: bananadates,
  },
];

const HealthPowders = () => (
  <ProductPageLayout
    title="Health Powders"
    description="Pure, natural health powders crafted to boost your daily wellness."
    gradientFrom="from-emerald-600"
    gradientTo="to-green-500"
  >
    {healthPowders.map((product) => (
      <ProductCard key={product.name} product={product} />
    ))}
  </ProductPageLayout>
);

export default HealthPowders;
