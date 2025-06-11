import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { usePageStore } from "@/stores/use-page-store";

interface ContentPaginationProps {
  total: number;
  page: number;
  limit: number;
  pageType: 'articles' | 'categories'
}

export function ContentPagination({ total, page, limit, pageType }: ContentPaginationProps) {
  const { setPage } = usePageStore();
  
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={page === 1 ? undefined : () => setPage({ key: pageType, page: page - 1 })}
            aria-label={`Go to page ${page - 1}`}
            className={page === 1 ? "opacity-50" : "cursor-pointer"}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {Array.from({ length: Math.ceil(total / limit) }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={() => setPage({ key: pageType, page: pageNumber })}
              aria-label={`Go to page ${pageNumber}`}
              className={pageNumber === page ? "cursor-pointer border" : "cursor-pointer"}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            onClick={page === Math.ceil(total / limit) ? undefined : () => setPage({ key: pageType, page: page + 1 })}
            aria-label={`Go to page ${page + 1}`}
            className={page === Math.ceil(total / limit) ? "opacity-50" : "cursor-pointer"}
            aria-disabled={page === Math.ceil(total / limit)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}