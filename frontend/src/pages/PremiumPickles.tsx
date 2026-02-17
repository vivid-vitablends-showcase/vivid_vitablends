import ProductPageLayout from "@/components/ProductPageLayout";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import koorkaImg from "@/assets/koorka.jpg";

const premiumPickles: Product[] = [
  {
    name: "Koorka Special Pickle",
    description: "Traditional homemade pickle prepared with authentic spices",
    image: koorkaImg,
  },
];

const PremiumPickles = () => (
  <ProductPageLayout
    title="Premium Pickles"
    description="Handcrafted pickles prepared with love, tradition, and purity."
    gradientFrom="from-orange-600"
    gradientTo="to-red-500"
  >
    {premiumPickles.map((product) => (
      <ProductCard key={product.name} product={product} />
    ))}
  </ProductPageLayout>
);

export default PremiumPickles;
