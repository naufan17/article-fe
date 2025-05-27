import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: { 
      username: string; 
      password: string; 
      Role: string 
    }) => await axiosInstance.post("/auth/register", data)
  });
};