import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { 
      username: string; 
      password: string 
    }) => await axiosInstance.post("/auth/login", data)
  });
}