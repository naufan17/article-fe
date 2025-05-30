import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CardArticleProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string[];
}

export function CardArticle({ 
  id,
  title, 
  content, 
  imageUrl, 
  date, 
  category 
}: CardArticleProps) {
  return (
    <Link href={`/articles/${id}`}>
      <Card className="border-none shadow-none hover:shadow-sm hover:shadow-blue-200 transition-shadow duration-300 ease-in-out cursor-pointer">
        <CardContent className="flex flex-col items-start overflow-auto">
          <Image 
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
            className="w-full h-56 object-cover rounded-lg mb-2"
          />
          <time dateTime={date} className="text-xs sm:text-sm font-normal text-slate-600 mt-1">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
          <CardTitle className="text-base sm:text-lg font-semibold text-slate-900 mt-2">
            {title}
            <div
              className="text-sm sm:text-base font-normal text-slate-600 mt-1 line-clamp-3"
              dangerouslySetInnerHTML={{
              __html: (() => {
                const match = content.match(/^(.+?[.!?])(\s|$)/);
                const text = match && match[1].length <= 100
                ? match[1]
                : content.slice(0, 100) + (content.length > 100 ? "..." : "");
                return text;
              })(),
              }}
            />
          </CardTitle>
          <div className="flex flex-wrap mt-2">
            {category.map((cat, index) => (
              <Badge key={index} className="text-xs sm:text-sm font-normal bg-blue-200 text-blue-900 px-2.5 py-0.75 rounded-full mr-2">
                {cat}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}