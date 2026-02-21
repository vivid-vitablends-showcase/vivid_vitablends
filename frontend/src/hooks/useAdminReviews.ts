import { useState, useEffect, useMemo } from 'react';
import { reviewApi } from '@/services/api/reviewApi';
import { Review } from '@/types/Review';
import { toast } from 'sonner';

export const useAdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewApi.getAll();
        setReviews(data);
      } catch (err) {
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const stats = useMemo(() => {
    const total = reviews.length;
    const averageRating = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total 
      : 0;
    const heroCount = reviews.filter(r => r.showInHero).length;
    
    return { total, averageRating, heroCount };
  }, [reviews]);

  return { reviews, loading, stats };
};
