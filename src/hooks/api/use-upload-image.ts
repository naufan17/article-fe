import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosinstance"

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (data: { 
      image: File 
    }) => {
      const formData = new FormData();
      formData.append("image", data.image);

      return await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  });
}