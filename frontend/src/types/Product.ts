export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "health" | "pickle" | "combo";
  featured?: boolean;
  badge?: string;
  originalPrice?: number;
};
