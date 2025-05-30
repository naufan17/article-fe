import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ContentArticlePreviewProps {
  title: string;
  content: string;
  imageUrl: string;
}

export function ContentArticlePreview({ title, content, imageUrl }: ContentArticlePreviewProps) {
  return (
    <DialogContent className="min-w-[300px] sm:min-w-[600px] lg:min-w-[1000px] overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
          {title}
        </DialogTitle>
      </DialogHeader>
      <div className="flex justify-center my-4">
        <Image 
          src={imageUrl} 
          alt={title} 
          width={800} 
          height={600}
          className="w-auto h-[200px] sm:h-[280px] lg:h-[400px] object-cover rounded-lg"
        />
      </div>
      <div         
        className="text-sm sm:text-base font-normal prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </DialogContent>
  )
}