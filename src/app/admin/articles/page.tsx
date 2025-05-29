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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserArticlePage() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const { data: articles, isLoading } = useArticle(page, limit, title, category);
  const { data: categories } = useCategory(1, 100);
  
  return (
    <>
      <div className="bg-white mx-8 my-8 border rounded-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-sm sm:text-base font-semibold">
            {isLoading ? (
              "Loading..."
            ) : (
              articles?.data && articles.data.length === 0 ? "No articles found." : `Total articles: ${articles.total}`
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
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
              name="search"
              value={title ?? ""}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white text-black w-sm" 
            />
          </div>
          <Link href="/admin/articles/add">
            <Button className="bg-blue-600 cursor-pointer">
              <Plus className="h-4 w-4" />
              Add Article
            </Button>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"/>
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
    </>
  );
}
