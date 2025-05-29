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

    uploadImage.mutate({ image: file }, {
      onSuccess: (data: any) => {
        console.log(data.data.imageUrl);
        setValue("imageUrl", data.data.imageUrl, { shouldValidate: true });
        setIsLoadingImage(false);
        setIsSuccessImage(true);
      },
      onError: () => {
        setIsLoadingImage(false);
        setIsErrorImage(true);
      },
    });
  };

  const onSubmit = (data: FormData) => {
    updateArticle.mutate(data, {
      onSuccess: () => {
        router.push("/admin/articles");
        toast.success("Article updated successfully", {
          style: {
            color: 'green'
          }
        });
      },
      onError: () => {
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
          Create an article
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
                      className="flex flex-col items-center justify-center px-3 py-2 w-52 h-40 border border-dashed border-slate-300 rounded-md cursor-pointer hover:border-slate-600 transition"
                    >
                      {isLoadingImage ? (
                        <div className="flex items-center justify-center p-4 sm:p-6">
                          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"/>
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
                            className="mt-2 w-auto h-36 object-cover rounded"
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
                <span className="text-red-500">
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
                <span className="text-red-500">
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
                  <span className="text-red-500">
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
                <span className="text-red-500">
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
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}