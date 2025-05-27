import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CardArticleProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string[];
}

export function CardArticle({ 
  title, 
  description, 
  imageUrl, 
  date, 
  category 
}: CardArticleProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col items-start p-4">
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
        </CardTitle>
        <p className="sm:text-sm sm:text-base font-normal text-slate-600 mt-1">
          {description}
        </p>
        <div className="flex flex-wrap mt-2">
          {category.map((cat, index) => (
            <Badge key={index} className="text-xs sm:text-sm font-normal bg-blue-200 text-blue-900 px-3 py-1 rounded-full mr-2">
              {cat}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}