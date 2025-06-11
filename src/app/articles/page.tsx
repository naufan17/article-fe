'use client'

import { useState } from "react";
import { useArticle } from "@/lib/api/use-article";
import { useCategory } from "@/lib/api/use-category";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Content } from "@/components/content";
import { ContentSkeleton } from "@/components/content-skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { usePageStore } from "@/stores/use-page-store";

export default function ArticlePage() {
  const page = usePageStore((state) => state.currentPage['articles']);
  const [limit] = useState<number>(9);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const debounceTitle = useDebounce(title, 500);
  const { data: articles, isLoading } = useArticle(page, limit, debounceTitle, category);
  const { data: categories } = useCategory(1, 100);
  
  return (
    <>
      <Hero
        data={categories?.data ?? []}
        category={category}
        setCategory={setCategory}
        title={title}
        setTitle={setTitle}
      />
      {isLoading ? (
        <ContentSkeleton />
      ) : articles?.data && articles.data.length === 0 ? (
        <div className="text-center py-8">
          No articles found.
        </div>
      ) : (
        <Content data={articles?.data ?? []} total={articles.total} page={articles.page} limit={articles.limit} />
      )}
      <Footer />
    </>
  );
}