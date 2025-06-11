import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await axiosInstance.delete(`/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ["categories"] 
    }),
  });
}