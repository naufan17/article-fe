import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useArticle = (page: number, limit: number, title?: string, category?: string) => {
  return useQuery({
    queryKey: ["articles", page, limit, title, category],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles", {
        params: {
          title,
          category,
          page,
          limit,
        },
      });
      return response.data;
    }
  });
}