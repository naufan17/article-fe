import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

export const useUpdateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { 
      id: string;
      title: string; 
      content: string; 
      categoryId: string; 
      imageUrl: string
    }) => await axiosInstance.put(`/articles/${data.id}`, {
      title: data.title, 
      content: data.content, 
      categoryId: data.categoryId, 
      imageUrl: data.imageUrl
    }),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ["articles"] 
    }),
  })

}