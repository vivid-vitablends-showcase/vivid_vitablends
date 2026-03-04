import { useState, useEffect, useMemo } from "react";
import { categoryApi } from "@/services/api/productApi";
import { Category } from "@/types/Category";
import { EXCLUDED_CATEGORY_NAMES } from "@/lib/constants";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryApi.getAll();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch categories")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const displayCategories = useMemo(
    () =>
      categories.filter(
        (cat) => !EXCLUDED_CATEGORY_NAMES.includes(cat.name.toLowerCase())
      ),
    [categories]
  );

  const getHomepageCategories = useMemo(
    () =>
      categories
        .filter((cat) => cat.showOnHome)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [categories]
  );

  return {
    categories,
    displayCategories,
    getHomepageCategories,
    loading,
    error,
  };
};
