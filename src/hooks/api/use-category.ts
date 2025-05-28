import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    }
  });
}