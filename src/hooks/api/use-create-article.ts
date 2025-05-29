import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

export const useCreateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { 
      title: string; 
      content: string; 
      categoryId: string; 
      imageUrl: string
    }) => await axiosInstance.post("/articles", data),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ["articles"] 
    }),
  })

}