'use client'

import { useState } from "react";
import { useArticle } from "@/hooks/api/use-article";
import { useCategory } from "@/hooks/api/use-category";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Content } from "@/components/content";
import { ContentSkeleton } from "@/components/content-skeleton";

export default function UserArticlePage() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const { data: articles, isLoading } = useArticle(page, limit, title, category);
  const { data: categories } = useCategory(1, 100);
  
  return (
    <>
      <Hero
        data={categories?.data ?? []}
        category={category}
        setCategory={setCategory}
        title={title}
        setTitle={setTitle}
        setPage={setPage}
      />
      {isLoading ? (
        <ContentSkeleton />
      ) : articles?.data && articles.data.length === 0 ? (
        <div className="text-center py-8">
          No articles found.
        </div>
      ) : (
        <Content data={articles?.data ?? []} total={articles.total} page={articles.page} limit={articles.limit} setPage={setPage} />
      )}
      <Footer />
    </>
  );
}