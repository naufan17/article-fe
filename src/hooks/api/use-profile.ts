import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    }
  });
}