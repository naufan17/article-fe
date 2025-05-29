import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface ContentPaginationProps {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export function ContentPagination({ total, page, limit, setPage }: ContentPaginationProps) {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={page === 1 ? undefined : () => setPage(page - 1)}
            aria-label={`Go to page ${page - 1}`}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {Array.from({ length: Math.ceil(total / limit) }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={() => setPage(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              className={pageNumber === page ? "border" : ""}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            onClick={page === Math.ceil(total / limit) ? undefined : () => setPage(page + 1)}
            aria-label={`Go to page ${page + 1}`}
            className={page === Math.ceil(total / limit) ? "pointer-events-none opacity-50" : ""}
            aria-disabled={page === Math.ceil(total / limit)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}