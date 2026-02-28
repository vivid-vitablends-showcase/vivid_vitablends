import { useQuery } from "@tanstack/react-query";
import { orderApi } from "@/services/api/orderApi";
import { authStorage } from "@/lib/storage";

export const useAdminOrders = () => {
  const token = authStorage.getToken();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => orderApi.getAll(token || ""),
    enabled: !!token,
  });

  return {
    orders: data?.data || [],
    loading: isLoading,
    error,
    refetch,
  };
};
