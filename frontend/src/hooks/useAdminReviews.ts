import { useState, useEffect, useMemo, useCallback } from "react";
import { reviewApi } from "@/services/api/reviewApi";
import { Review } from "@/types/Review";
import { toast } from "sonner";

export const useAdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await reviewApi.getAll();
      setReviews(data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load reviews"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const toggleShowInHero = useCallback(
    async (id: string, currentValue: boolean) => {
      setUpdating(id);
      try {
        await reviewApi.updateShowInHero(id, !currentValue);
        setReviews((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, showInHero: !currentValue } : r
          )
        );
        toast.success(
          `Review ${!currentValue ? "added to" : "removed from"} hero section`
        );
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update review"
        );
      } finally {
        setUpdating(null);
      }
    },
    []
  );

  const stats = useMemo(() => {
    const total = reviews.length;
    const averageRating =
      total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const heroCount = reviews.filter((r) => r.showInHero).length;

    return { total, averageRating, heroCount };
  }, [reviews]);

  return { reviews, loading, stats, toggleShowInHero, updating };
};
