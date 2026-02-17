import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import koorkaImg from "@/assets/koorka.jpg";

const premiumPickles = [
    
  {
    name: "Koorka Special Pickle",
    description: "Traditional homemade pickle prepared with authentic spices",
    image: koorkaImg,
  },
];

const PremiumPickles = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
<section className="relative bg-gradient-to-r from-orange-600 to-red-500 text-white">
  <button
    onClick={() => navigate(-1)}
    className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-foreground shadow hover:bg-white transition"
  >
    <ArrowLeft size={18} />
    Back
  </button>

  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Premium Pickles
    </h1>
    <p className="text-lg max-w-2xl mx-auto">
      Handcrafted pickles prepared with love, tradition, and purity.
    </p>
  </div>
</section>


      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {premiumPickles.map((product) => (
            <Card
              key={product.name}
              className="overflow-hidden hover:shadow-lg transition"
            >
              {/* ✅ IMAGE ADDED */}
              <img
                src={product.image}
                alt={product.name}
                className="h-58 w-full object-cover"
                loading="lazy"
              />

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PremiumPickles;
