'use client'

import { CardArticle } from "./card-article";

interface ContentProps {
  data: {
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    imageUrl: string;
    createdAt: string;
    category:{
      id: string;
      name: string;
    }
  }[];
}

export function Content({ data }: ContentProps) {
  return (
    <div className="flex flex-wrap items-center justify-center mx-auto py-8 px-4 md:py-12 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-4 md:gap-8 w-full">
        {data.map((article) => (
          <CardArticle
            key={article.id}
            title={article.title}
            description={article.content}
            imageUrl={article.imageUrl}
            date={article.createdAt}
            category={["React", "JavaScript", "CSS"]}
          />
        ))}
     </div>
    </div>
  );
}