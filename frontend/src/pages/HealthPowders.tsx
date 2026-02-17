import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import abcpowder from "@/assets/abc.jpg";
import bananadates from "@/assets/banana.jpg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const healthPowders = [
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

const HealthPowders = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Health Powders
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Pure, natural health powders crafted to boost your daily wellness.
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="container mx-auto px-4 py-16">
                <button
  onClick={() => navigate(-1)}
  className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-foreground shadow hover:bg-white transition"
  aria-label="Go back"
>
  <ArrowLeft size={18} />
  Back
</button>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {healthPowders.map((product) => (
                        <Card key={product.name} className="hover:shadow-lg transition">
                            <CardContent className="p-6">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-58 w-full object-cover"
                                    loading="lazy"
                                />

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

export default HealthPowders;
