'use client'

import { ContentArticle } from "@/components/content-article";
import { ContentArticleSkeleton } from "@/components/content-article-skeleton";
import { ContentOtherArticle } from "@/components/content-other-article";
import { ContentSkeleton } from "@/components/content-skeleton";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useArticle } from "@/hooks/api/use-article";
import { useArticleId } from "@/hooks/api/use-article-id";

interface ArticleByIdPageProps {
  params: {
    id: string
  }
}

export default function ArticleByIdPage({ params }: ArticleByIdPageProps) {
  const { id } = params
  const { data: article, isLoading } = useArticleId(id)
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
  )
}