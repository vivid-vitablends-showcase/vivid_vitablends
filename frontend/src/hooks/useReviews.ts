import { useState, useEffect } from "react";
import { reviewApi } from "@/services/api/reviewApi";
import { Review } from "@/types/Review";
import { toast } from "sonner";

export const useReviews = (heroOnly = false) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = heroOnly
          ? await reviewApi.getHeroReviews()
          : await reviewApi.getAll();
        setReviews(data);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load reviews"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [heroOnly]);

  return { reviews, loading };
};
