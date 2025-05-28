import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface TableArticleProps {
  articles: {
    data: {
      id: number;
      title: string;
      content: string;
      imageUrl: string;
      createdAt: string;
    }[]
  }
}

export function TableArticle({ articles }: TableArticleProps) {
  return (
    <Table>
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead className="font-semibold">Id</TableHead>
          <TableHead className="font-semibold">Title</TableHead>
          <TableHead className="font-semibold">Content</TableHead>
          <TableHead className="font-semibold">Image</TableHead>
          <TableHead className="font-semibold">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.data.map((article) => (
          <TableRow key={article.id}>
            <TableCell>{article.id}</TableCell>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.content}</TableCell>
            <TableCell>{article.imageUrl}</TableCell>
            <TableCell>{article.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}