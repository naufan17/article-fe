import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useCategory = (page?: number, limit?: number, search?: string) => {
  return useQuery({
    queryKey: ["categories", page, limit, search],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories", {
        params: {
          search,
          page,
          limit,
        },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  });
}