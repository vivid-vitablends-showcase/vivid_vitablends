import { Product } from "@/types/Product";
import abcImg from "@/assets/abc.jpg";
import bananaImg from "@/assets/banana.jpg";
import koorkaImg from "@/assets/koorka.jpg";
import comboPowders from "@/assets/product-combo-powders.jpg";

export const products: Product[] = [
{
  id: "abc-juice",
  name: "ABC Juice Powder",
  description: "Rich in antioxidants and essential nutrients.",
  price: 249,
  image: abcImg,
  category: "health",
  featured: true,
  badge: "New",
  
},
  {
    id: "banana-dates",
    name: "Banana-Dates Smoothie Powder",
    description: "Supports immunity and reduces inflammation",
    price: 199,
    image: bananaImg,
    category: "health",
   
  },
  {
    id: "koorka-special",
    name: "Koorka Special Pickle",
    description: "Traditional homemade pickle prepared with authentic spices",
    price: 399,
    image: koorkaImg,
    category: "pickle",
    featured: true,
     badge: "Limited",
  },
  {
  id: "health-pack",
  name: "Health Essentials Pack",
  description: "ABC Juice + Banana Dates Smoothie combo",
  price: 549,
  originalPrice: 648,
  image: comboPowders,
  category: "combo",
  badge: "Limited",
      featured: true,

},


];