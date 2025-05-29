import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useCategory = (page?: number, limit?: number, title?: string) => {
  return useQuery({
    queryKey: ["categories", page, limit, title],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories", {
        params: {
          title,
          page,
          limit,
        },
      });
      return response.data;
    }
  });
}