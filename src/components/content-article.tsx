import { formatDate } from "@/lib/formatdate";
import Image from "next/image";

interface ContentArticleProps {
  article: {    
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      userId: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      id: string;
      username: string;
      role: 'Admin' | 'User';
      createdAt: string;
      updatedAt: string;
    };
  }
}

export function ContentArticle({ article }: ContentArticleProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto gap-4 py-8 px-4 md:py-12 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <span className="text-sm font-medium text-slate-600">
        {formatDate(article.createdAt)} ・ Created by {article.user.username}
      </span>
      <h1 className="text-2xl sm:text-3xl font-semibold">
        {article.title}
      </h1>
      <div className="my-4">
        <Image 
          src={article.imageUrl} 
          alt={article.title} 
          width={800} 
          height={600}
          className="w-full h-[480px] object-cover rounded-lg"
        />
      </div>
      <div className="text-sm sm:text-base font-normal whitespace-pre-line">
        {article.content}
      </div>
    </div>
  )
}