export type Product = {
  badge?: "Bestseller" | "New" | "Limited";
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "health" | "pickle" | "combo";
  featured?: boolean;
  
};
