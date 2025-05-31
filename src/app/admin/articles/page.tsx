/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
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
import { setPage } from "@/store/slices/page-slice";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector((state: RootState) => state.page.currentPage['articles']);
  const [limit] = useState<number>(10);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const debounceTitle = useDebounce(title, 500);  
  const { data: articles, isLoading } = useArticle(page, limit, debounceTitle, category);
  const { data: categories } = useCategory(1, 100);
  
  return (
    <div className="bg-white mx-4 sm:mx-8 my-4 sm:my-8 border rounded-xl">
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
                  dispatch(setPage({ key: "articles", page: 1 }))
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
        <Skeleton className="h-64" />
      ) : articles?.data && articles.data.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          No articles found.
        </div>
      ) : (
        <>
          <TableArticle data={articles?.data ?? []}/>
          <div className="my-4">
            <ContentPagination total={articles.total} page={articles.page} limit={articles.limit} pageType="articles" />
          </div>
        </>
      )}
    </div>
  );
}
