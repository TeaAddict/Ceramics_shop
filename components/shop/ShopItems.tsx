import { PAGE_SIZE, TEST_MERCHANDISE } from "@/constants";
import PaginationCn from "../shared/PaginationCn";
import Merchandise from "../cards/Merchandise";
import { useSearchParams } from "next/navigation";

const ShopItems = ({ data }: { data: typeof TEST_MERCHANDISE }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const lastPage = Math.ceil(data.length / PAGE_SIZE);

  const currentPageStartItem = (currentPage - 1) * PAGE_SIZE;
  const currentPageEndItem = (currentPage - 1) * PAGE_SIZE + PAGE_SIZE;

  const currentItems = data.slice(currentPageStartItem, currentPageEndItem);

  return (
    <div className="min-h-52 w-full space-y-10 rounded-md p-5 bg-accent">
      <ul className="grid grid-cols-6">
        {currentItems.map((item) => {
          return (
            <Merchandise
              key={item.title}
              currencyType={item.currencyType}
              description={item.description}
              image={item.image}
              price={item.price}
              title={item.title}
            />
          );
        })}
      </ul>
      <PaginationCn currentPage={currentPage} lastPage={lastPage} />
    </div>
  );
};

export default ShopItems;
