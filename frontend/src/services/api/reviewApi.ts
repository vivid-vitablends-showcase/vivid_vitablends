import { API_BASE_URL } from "@/lib/config";
import { Review } from "@/types/Review";

export const reviewApi = {
  getAll: async (): Promise<Review[]> => {
    const res = await fetch(`${API_BASE_URL}/api/reviews`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    const json = await res.json();
    return json.data || json;
  },
};
