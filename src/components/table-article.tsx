import Image from "next/image";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils/formatdate";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteArticle } from "@/lib/api/use-delete-article";
import { toast } from "sonner";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

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
  const deleteArticle = useDeleteArticle();

  const handleDelete = (id: string) => {
    deleteArticle.mutate(id, {
      onSuccess: () => {
        toast.success("Article deleted successfully", {
          style: {
            color: 'green'
          }
        });
      },
      onError: () => {
        toast.error("Failed to delete article", {
          style: {
            color: 'red'
          }
        });
      }
    });
  }

  return (
    <Table>
      <TableHeader className="bg-secondary border-t">
        <TableRow>
          <TableHead className="font-semibold text-center text-xs sm:text-sm">Thumbnail</TableHead>
          <TableHead className="font-semibold text-center text-xs sm:text-sm">Title</TableHead>
          <TableHead className="font-semibold text-center text-xs sm:text-sm">Category</TableHead>
          <TableHead className="font-semibold text-center text-xs sm:text-sm">Created At</TableHead>
          <TableHead className="font-semibold text-center text-xs sm:text-sm">Action</TableHead>
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
            <TableCell className="text-xs sm:text-sm">
              {article.title.length > 50 ? article.title.slice(0, 50) + "..." : article.title}
            </TableCell>
            <TableCell className="text-xs sm:text-sm">{article.category.name}</TableCell>
            <TableCell className="text-xs sm:text-sm">{formatDate(article.createdAt)}</TableCell>
            <TableCell>
              <Link href={`/articles/${article.id}`} className="text-blue-500">
                <Button variant="ghost" className="cursor-pointer">
                  <Eye className="h-4 w-4 text-slate-600" />
                </Button>
              </Link>
              <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-500">
                <Button variant="ghost" className="cursor-pointer">
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your article.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      className="cursor-pointer bg-red-600 hover:bg-red-400" 
                      onClick={() => handleDelete(article.id)}
                    >
                      Continue
                      </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}