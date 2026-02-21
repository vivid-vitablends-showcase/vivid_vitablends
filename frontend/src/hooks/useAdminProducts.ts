import { useState, useEffect, useCallback, useMemo } from "react";
import { productApi } from "@/services/api/productApi";
import { Product } from "@/types/Product";
import { toast } from "sonner";

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const stats = useMemo(() => {
    const byCategory = {
      health: products.filter((p) => p.category === "health").length,
      pickle: products.filter((p) => p.category === "pickle").length,
      combo: products.filter((p) => p.category === "combo").length,
    };
    const featuredCount = products.filter((p) => p.featured).length;

    return { byCategory, featuredCount, total: products.length };
  }, [products]);

  const createProduct = async (product: Omit<Product, "id">) => {
    try {
      await productApi.create(product);
      toast.success("Product created successfully");
      await fetchProducts();
    } catch (err) {
      toast.error("Failed to create product");
      throw err;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      await productApi.update(id, product);
      toast.success("Product updated successfully");
      await fetchProducts();
    } catch (err) {
      toast.error("Failed to update product");
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productApi.delete(id);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error("Failed to delete product");
      throw err;
    }
  };

  return {
    products,
    loading,
    stats,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
