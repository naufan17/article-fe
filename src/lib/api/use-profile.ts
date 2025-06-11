import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  });
}