'use client'

import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/store/store";
import { useCategory } from "@/lib/api/use-category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { ContentPagination } from "@/components/content-pagination";
import { TableCategory } from "@/components/table-category";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "@/lib/api/use-create-category";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const page: number = useSelector((state: RootState) => state.page.currentPage['categories']);
  const [limit] = useState<number>(15);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data: categories, isLoading } = useCategory(page, limit, search);
  const createCategory = useCreateCategory();
  const [createCategorForm, setCreateCategorForm] = useState<{
    name: string
  }>({ 
    name: "" 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCategorForm({
      ...createCategorForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCategory.mutate({
      name: createCategorForm.name
    }, {
      onSuccess: () => {
        toast.success("Category created successfully", {
          style: {
            color: 'green'
          }
        });
      },
      onError: () => {
        toast.error("Failed to create category", {
          style: {
            color: 'red'
          }
        });
      }
    });
  }

  return (
    <>
      <div className="bg-white mx-4 sm:mx-8 my-4 sm:my-8 border rounded-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-sm sm:text-base font-semibold">
            {isLoading ? (
              "Loading..."
            ) : (
              categories?.data && categories.data.length === 0 ? "No categories found" : `Total categories: ${categories.totalData}`
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 p-4">
          <Input 
            placeholder="Search category" 
            type="text"
            name="Find category"
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white text-black w-sm text-sm placeholder:text-sm" 
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 cursor-pointer">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    Add New Category
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 mt-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      type="text"
                      name="name"
                      placeholder="Category name"
                      onChange={handleInputChange}
                      className="text-sm"
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
        </div>
        {isLoading ? (
          <Skeleton className="h-64" />
        ) : categories?.data && categories.data.length === 0 ? (
          <div className="flex items-center justify-center p-4">
            No categories found.
          </div>
        ) : (
          <>
            <TableCategory data={categories?.data ?? []}/>
            <div className="my-4">
              <ContentPagination total={categories.totalData} page={categories.currentPage} limit={limit} pageType="categories" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
