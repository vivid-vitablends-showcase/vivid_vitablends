import { useState, useEffect } from 'react';
import { reviewApi } from '@/services/api/reviewApi';
import { Review } from '@/types/Review';
import { toast } from 'sonner';

export const useReviews = (showInHero?: boolean) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewApi.getAll();
        setReviews(showInHero ? data.filter(r => r.showInHero) : data);
      } catch (err) {
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [showInHero]);

  return { reviews, loading };
};
