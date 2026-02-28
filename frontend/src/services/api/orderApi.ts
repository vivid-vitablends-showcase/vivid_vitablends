import { API_BASE_URL } from "@/lib/config";

export interface CreateOrderData {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  sendWhatsApp?: boolean;
}

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  total: number;
  status: string;
  whatsappSent: boolean;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const orderApi = {
  create: async (data: CreateOrderData) => {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  },

  getAll: async (
    token: string
  ): Promise<{ success: boolean; data: Order[] }> => {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },
};
