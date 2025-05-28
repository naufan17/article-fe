import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formatdate";
import Image from "next/image";
import Link from "next/link";

interface TableArticleProps {
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

export function TableArticle({ data }: TableArticleProps) {
  return (
    <Table>
      <TableHeader className="bg-secondary border-t">
        <TableRow>
          <TableHead className="font-semibold text-center">Thumbnail</TableHead>
          <TableHead className="font-semibold text-center">Title</TableHead>
          <TableHead className="font-semibold text-center">Category</TableHead>
          <TableHead className="font-semibold text-center">Created At</TableHead>
          <TableHead className="font-semibold text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((article) => (
          <TableRow key={article.id} className="text-center">
            <TableCell className="flex justify-center">
              <Image 
                src={article.imageUrl}
                alt={article.title}
                width={80}
                height={60}
                className="h-24 w-32 object-cover rounded-lg" 
              />
            </TableCell>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.category.name}</TableCell>
            <TableCell>{formatDate(article.createdAt)}</TableCell>
            <TableCell>
              <Link 
                href={`/article/${article.id}`}
                className="text-blue-500 mr-2"
              >
                Preview
              </Link>
              <Link 
                href={`/admin/article/${article.id}/edit`}
                className="text-blue-500 mr-2"
              >
                Edit
              </Link>
              <Link 
                href={`/admin/article/${article.id}/delete`}
                className="text-red-500"
              >
                Delete
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}