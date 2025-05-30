/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import Link from "next/link";
import { useArticle } from "@/hooks/api/use-article";
import { useCategory } from "@/hooks/api/use-category";
import { TableArticle } from "@/components/table-article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Plus } from "lucide-react";
import { ContentPagination } from "@/components/content-pagination";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/api/use-debounce";

export default function ArticlePage() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const debounceTitle = useDebounce(title, 500);  
  const { data: articles, isLoading } = useArticle(page, limit, debounceTitle, category);
  const { data: categories } = useCategory(1, 100);
  
  return (
    <div className="bg-white mx-8 my-8 border rounded-xl">
      <div className="flex items-center justify-between p-4 sm:p-6 border-b">
        <div className="text-sm sm:text-base font-semibold">
          {isLoading ? (
            "Loading..."
          ) : (
            articles?.data && articles.data.length === 0 ? "No articles found." : `Total articles: ${articles.total}`
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-slate-800 w-full sm:w-auto"
              >
                Select a category
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                Categories
              </DropdownMenuLabel>
              {categories?.data.map((cat: any) => (
              <DropdownMenuCheckboxItem
                key={cat.id}
                checked={category === cat.id}
                onCheckedChange={(checked) => {
                  setCategory(checked ? cat.id : undefined)
                  setPage(1)
                }}
              >
                {cat.name}
              </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input 
            placeholder="Search articles" 
            type="text"
            name="Find an article"
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white text-black w-full sm:w-sm text-sm placeholder:text-sm" 
          />
        </div>
        <Link href="/admin/articles/create">
          <Button className="bg-blue-600 cursor-pointer">
            <Plus className="h-4 w-4" />
            Add Article
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center p-4 sm:p-6">
          <svg className="inline w-14 h-14 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>          
        </div>
      ) : articles?.data && articles.data.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          No articles found.
        </div>
      ) : (
        <>
          <TableArticle data={articles?.data ?? []}/>
          <div className="my-4">
            <ContentPagination total={articles.total} page={articles.page} limit={articles.limit} setPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
}
