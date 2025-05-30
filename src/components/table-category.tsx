import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatdate";
import { useDeleteCategory } from "@/hooks/api/use-delete-category";
import { useUpdateCategory } from "@/hooks/api/use-update-category";
import { Edit, Trash2 } from "lucide-react";
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
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TableCategoryProps {
  data: {
    id: string;
    userId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export function TableCategory({ data }: TableCategoryProps) {
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [updateCategorForm, setUpdateCategorForm] = useState<{
    id: string
    name: string
  }>({ 
    id: "",
    name: "" 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCategorForm({
      ...updateCategorForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCategory.mutate(updateCategorForm, {
      onSuccess: () => {
        toast.success("Category updated successfully", {
          style: {
            color: 'green'
          }
        });
      },
      onError: () => {
        toast.error("Failed to update category", {
          style: {
            color: 'red'
          }
        });
      }
    });
  }

  const handleDelete = (id: string) => {
    deleteCategory.mutate(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully", {
          style: {
            color: 'green'
          }
        });
      },
      onError: () => {
        toast.error("Failed to delete category", {
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
          <TableHead className="font-semibold text-center">Category</TableHead>
          <TableHead className="font-semibold text-center">Created At</TableHead>
          <TableHead className="font-semibold text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id} className="text-center">
            <TableCell>{category.name}</TableCell>
            <TableCell>{formatDate(category.createdAt)}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="cursor-pointer"
                    onClick={() => {
                      setUpdateCategorForm({
                        id: category.id,
                        name: category.name
                      });
                    }}
                  >
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>
                        Update Category
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          type="text"
                          name="name"
                          value={updateCategorForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button 
                          type="submit" 
                          className="mt-6 bg-blue-600 cursor-pointer"
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                      This action cannot be undone. This will permanently delete
                      your category.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDelete(category.id)}
                      className="cursor-pointer bg-red-600 hover:bg-red-400"
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