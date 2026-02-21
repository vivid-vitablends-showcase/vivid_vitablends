import { API_BASE_URL } from '@/lib/config';

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
}

export const orderApi = {
  create: async (data: CreateOrderData) => {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  },
};
