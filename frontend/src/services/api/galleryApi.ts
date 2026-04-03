import { API_BASE_URL } from "@/lib/config";
import { apiClient } from "@/lib/apiClient";

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const galleryApi = {
  getAll: async (): Promise<GalleryImage[]> => {
    const res = await fetch(`${API_BASE_URL}/api/gallery`);
    if (!res.ok) throw new Error("Failed to fetch gallery");
    const json = await res.json();
    return json.data;
  },

  create: async (payload: {
    title: string;
    image: string;
    displayOrder?: number;
  }): Promise<GalleryImage> => {
    const res = await apiClient(`${API_BASE_URL}/api/gallery`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || "Failed to add image");
    }
    const json = await res.json();
    return json.data;
  },

  delete: async (id: string): Promise<void> => {
    const res = await apiClient(`${API_BASE_URL}/api/gallery/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || "Failed to delete image");
    }
  },
};
