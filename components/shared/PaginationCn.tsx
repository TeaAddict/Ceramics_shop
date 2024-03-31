import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PaginationCn({
  currentPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleNext() {
    if (currentPage === lastPage) return;
    const params = new URLSearchParams(searchParams);

    params.set("page", (currentPage + 1).toString());

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handlePrevious() {
    if (currentPage === 1) return;
    const params = new URLSearchParams(searchParams);

    params.set("page", (currentPage - 1).toString());

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage > 1
                ? "border-2 bg-background cursor-pointer"
                : "cursor-default"
            }
            onClick={handlePrevious}
          />
        </PaginationItem>

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis className="cursor-default hidden xs:flex" />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink className="cursor-default hidden xs:flex">
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            className="hover:bg-background cursor-default hidden xs:flex"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {lastPage > currentPage && (
          <PaginationItem>
            <PaginationLink className="cursor-default hidden xs:flex">
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {lastPage > currentPage + 1 && (
          <PaginationItem>
            <PaginationEllipsis className="cursor-default hidden xs:flex" />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={
              lastPage > currentPage
                ? "border-2 bg-background cursor-pointer"
                : "cursor-default"
            }
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationCn;
