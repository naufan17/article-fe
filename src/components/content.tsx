'use client'

import { CardArticle } from "@/components/card-article";
import { ContentPagination } from "@/components/content-pagination";

interface ContentProps {
  data: {
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
    },
    user: {
      id: string;
      username: string;
    }
  }[];
  total: number
  page: number
  limit: number
  setPage: (page: number) => void
}

export function Content({ data, total, page, limit, setPage }: ContentProps) {
  return (
    <div className="flex flex-wrap items-center justify-center mx-auto py-8 px-4 md:py-12 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start gap-4 md:gap-6 w-full">
        {data.map((article) => (
          <CardArticle
            key={article.id}
            id={article.id}
            title={article.title}
            content={article.content}
            imageUrl={article.imageUrl}
            date={article.createdAt}
            category={[article.category.name]}
          />
        ))}
     </div>
     <ContentPagination total={total} page={page} limit={limit} setPage={setPage} />
    </div>
  );
}