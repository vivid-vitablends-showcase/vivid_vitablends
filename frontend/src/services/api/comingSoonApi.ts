import { API_BASE_URL } from "@/lib/config";
import { apiClient } from "@/lib/apiClient";

export interface ComingSoonProduct {
  id: string;
  name: string;
  image: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const getComingSoonProducts = async (): Promise<ComingSoonProduct[]> => {
  const response = await apiClient(`${API_BASE_URL}/api/coming-soon`, {
    method: "GET",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch");
  }
  const data = await response.json();
  return data.data;
};

export const addOrRemoveComingSoon = async (payload: {
  id?: string;
  name?: string;
  image?: string;
  displayOrder?: number;
}): Promise<ComingSoonProduct | { message: string }> => {
  const response = await apiClient(`${API_BASE_URL}/api/coming-soon`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to update");
  }
  const data = await response.json();
  return data.data;
};
