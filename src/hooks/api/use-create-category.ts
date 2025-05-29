import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { 
      name: string; 
    }) => await axiosInstance.post("/categories", data),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ["categories"] 
    }),
  });
}