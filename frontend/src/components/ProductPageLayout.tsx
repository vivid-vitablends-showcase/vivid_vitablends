import { ReactNode } from "react";
import BackButton from "./BackButton";

interface ProductPageLayoutProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  children: ReactNode;
}

const ProductPageLayout = ({
  title,
  description,
  gradientFrom,
  gradientTo,
  children,
}: ProductPageLayoutProps) => (
  <div className="min-h-screen bg-background">
    <section className={`relative bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white`}>
      <div className="absolute left-4 top-4">
        <BackButton />
      </div>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      </div>
    </section>
  </div>
);

export default ProductPageLayout;
