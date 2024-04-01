import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

export function PaginationCn({
  currentPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
}) {
  const { lastParams, setLastParams } = useUpdateSearchParams([
    { name: "page", value: "1" },
  ]);

  function handleNext() {
    if (currentPage === lastPage) return;
    setLastParams([{ name: "page", value: (currentPage + 1).toString() }]);
  }

  function handlePrevious() {
    if (currentPage === 1) return;
    setLastParams([{ name: "page", value: (currentPage - 1).toString() }]);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage > 1
                ? "border-2 bg-background cursor-pointer"
                : "cursor-default hover:bg-transparent"
            }
            onClick={handlePrevious}
          />
        </PaginationItem>

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis className="cursor-default hover:bg-transparent hidden xs:flex" />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink className="cursor-default hover:bg-transparent hidden xs:flex">
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            className="cursor-default hover:bg-background hidden xs:flex"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {lastPage > currentPage && (
          <PaginationItem>
            <PaginationLink className="cursor-default hover:bg-transparent hidden xs:flex">
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {lastPage > currentPage + 1 && (
          <PaginationItem>
            <PaginationEllipsis className="cursor-default hover:bg-transparent hidden xs:flex" />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={
              lastPage > currentPage
                ? "border-2 bg-background cursor-pointer"
                : "cursor-default hover:bg-transparent"
            }
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationCn;
