import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useArticleId = (id: string) => {
  return useQuery({
    queryKey: ["articles", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/articles/${id}`);
      return response.data;
    }
  });
}