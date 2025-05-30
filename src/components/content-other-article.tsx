import { CardArticle } from "@/components/card-article";

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
}

export function ContentOtherArticle ({ data }: ContentProps) {
  return (
    <div className="flex flex-wrap items-center justify-center mx-auto py-8 px-4 md:py-12 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <div className="flex justify-start w-full">
        <h2 className="text-left text-xl sm:text-2xl font-semibold mb-4">
          Other Article
        </h2>
      </div>
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
    </div>
  );
}