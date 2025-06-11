import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await axiosInstance.delete(`/articles/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ["articles"] 
    }),
  });
}