import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useArticle = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles");
      return response.data;
    }
  });
}