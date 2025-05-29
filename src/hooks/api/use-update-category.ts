import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { 
      id: string; 
      name: string;
    }) => await axiosInstance.put(`/categories/${data.id}`, {
      name: data.name
    }),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ["categories"] 
    }),
  });
}