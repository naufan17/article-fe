'use client'

import { use } from "react";
import { useArticle } from "@/hooks/api/use-article";
import { useArticleId } from "@/hooks/api/use-article-id";
import { ContentArticle } from "@/components/content-article";
import { ContentArticleSkeleton } from "@/components/content-article-skeleton";
import { ContentOtherArticle } from "@/components/content-other-article";
import { ContentSkeleton } from "@/components/content-skeleton";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

interface ArticleByIdPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ArticleByIdPage({ params }: ArticleByIdPageProps) {
  const { id } = use(params);
  const { data: article, isLoading } = useArticleId(id);
  const { data: articles, isLoading: isLoadingArticles } = useArticle(1, 3, undefined, undefined);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <ContentArticleSkeleton />
      ) : (
        <ContentArticle article={article} />
      )}
      {isLoadingArticles ? (
        <ContentSkeleton />
      ) : (
        <ContentOtherArticle data={articles.data} />
      )}
      <Footer />
    </>
  );
}