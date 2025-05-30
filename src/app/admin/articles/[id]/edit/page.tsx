/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { use } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/hooks/api/use-category";
import { useUploadImage } from "@/hooks/api/use-upload-image";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, CircleAlert, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useArticleId } from "@/hooks/api/use-article-id";
import Image from "next/image";
import { useUpdateArticle } from "@/hooks/api/use-update-article";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().min(1, "Category is required"),
  imageUrl: z.string().min(1, "Image is required"),
})

export type FormData = z.infer<typeof formSchema>;

interface EditArticlePageProps {
  id: string
  params: Promise<{
    id: string
  }>
}

export default function Edit({ params }: EditArticlePageProps) {
  const { id } = use(params);
  const { data: article, isLoading } = useArticleId(id);
  const { data: categories } = useCategory(1, 100);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isSuccessImage, setIsSuccessImage] = useState<boolean>(false);
  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);
  const uploadImage = useUploadImage();
  const updateArticle = useUpdateArticle();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: article?.id,
      categoryId: article?.categoryId,
      imageUrl: article?.imageUrl
    }
  }); 

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoadingImage(true);
    setIsSuccessImage(false);
    setIsErrorImage(false);
    setLoading(true);

    uploadImage.mutate({ image: file }, {
      onSuccess: (data: any) => {
        console.log(data.data.imageUrl);
        setValue("imageUrl", data.data.imageUrl, { shouldValidate: true });
        setIsLoadingImage(false);
        setIsSuccessImage(true);
        setLoading(false);
      },
      onError: () => {
        setIsLoadingImage(false);
        setIsErrorImage(true);
        setLoading(false);
      },
    });
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);

    updateArticle.mutate(data, {
      onSuccess: () => {
        router.push("/admin/articles");
        setLoading(false);
        toast.success("Article updated successfully", {
          style: {
            color: 'green'
          }
        });
      },
      onError: () => {
        setLoading(false);
        toast.error("Failed to update article", {
          style: {
            color: 'red'
          }
        });
      },
    });
  };

  return (
    <div className="bg-white mx-8 my-8 border rounded-xl">
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="text-sm sm:text-base font-semibold">
          <Button
            onClick={() => router.back()}
            variant="link"
            className="text-black cursor-pointer"
            >
            <ArrowLeft className="mr-2" strokeWidth={3} size={48} />
          </Button>
          Edit an article
        </div>
      </div>
      <div className="flex w-full items-center justify-start p-4 sm:p-6">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
                {isLoading ? (
                  <div className="h-40 w-52 bg-slate-200 rounded-md animate-pulse"/> 
                ) : (
                  <>
                    <Label
                      htmlFor="thumbnail"
                      className="flex flex-col items-center justify-center p-2 w-52 h-40 border border-dashed border-slate-300 rounded-md cursor-pointer hover:border-slate-600 transition"
                    >
                      {isLoadingImage ? (
                        <div className="flex items-center justify-center p-4 sm:p-6">
                          <svg className="inline w-10 h-10 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>          
                        </div>                
                      ) : isErrorImage ? (
                        <>
                          <span className="h-16 w-16 bg-red-500 text-white rounded-full flex items-center justify-center mb-2">
                            <CircleAlert size={32}/>
                          </span>
                          <span className="text-red-500 text-sm">
                            Failed
                          </span>
                        </>
                      ) : isSuccessImage ? (
                        <>
                          <span className="h-16 w-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-2">
                            <Check size={32}/>
                          </span>
                          <span className="text-green-500 text-sm">
                            Success
                          </span>
                          {/* <Image
                            src={watch("imageUrl")}
                            alt="Thumbnail Preview"
                            width={240}
                            height={200}
                            className="mt-2 w-full object-cover rounded"
                          />                   */}
                        </>
                      ) : article?.imageUrl ? (
                        <>
                          <Image
                            src={article.imageUrl}
                            alt="Thumbnail Preview"
                            width={240}
                            height={200}
                            className="w-auto h-36 object-cover rounded-md"
                          />
                          <Input
                            id="thumbnail"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleUploadImage(e)}
                          />
                        </>
                      ) : (                 
                        <>
                          <ImagePlus className="h-10 w-10 text-slate-400 mb-2" />
                          <span className="text-slate-500 text-xs underline">
                            Click to select files
                          </span>
                          <span className="text-slate-400 text-xs">
                            Support file type: jpg or png
                          </span>
                          <Input
                            id="thumbnail"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleUploadImage(e)}
                          />
                        </>                  
                      )}
                    </Label>
                  </>              
                )}
              {errors.imageUrl && (
                <span className="text-red-500 text-sm">
                  {errors.imageUrl.message}
                </span>
              )}
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="title" >Title</Label>
              {isLoading ? (
                <div className="h-10 w-full bg-slate-200 rounded-md animate-pulse"/>
              ) : (
                <Input 
                  id="title"
                  type="text"
                  placeholder="title"
                  defaultValue={article?.title}
                  {...register("title")}
                  className="w-full px-3 py-2"
                />
              )}
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" >Category</Label>
                {isLoading ? (
                  <div className="h-10 w-40 bg-slate-200 rounded-md animate-pulse"/>
                ) : (
                  <Select
                    value={watch("categoryId") || article?.categoryId}
                    onValueChange={(value) => {
                      setValue("categoryId", value);
                    }}
                  >
                    <SelectTrigger className="px-3 py-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.data
                      .filter((cat: any) => cat.id !== undefined && cat.id !== null && cat.id !== '')
                      .map((cat: any) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.categoryId && (
                  <span className="text-red-500 text-sm">
                    {errors.categoryId.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                {isLoading ? (
                  <div className="h-80 w-full bg-slate-200 rounded-md animate-pulse"/>
                ) : (
                  <Textarea 
                    placeholder="Write something..."
                    defaultValue={article?.content}
                    {...register("content")}
                    className="w-full h-80 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-600"
                  />
                )}
              {errors.content && (
                <span className="text-red-500 text-sm">
                  {errors.content.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end mt-6">
            <Button 
              type="submit" 
              variant="default"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400 transition cursor-pointer"
            >
              {loading ? (
                <svg className="inline w-7 h-7 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              ):(
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}