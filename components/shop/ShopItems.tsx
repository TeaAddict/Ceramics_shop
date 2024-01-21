import { PAGE_SIZE, TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import PaginationCn from "../shared/PaginationCn";
import Merchandise from "../cards/Merchandise";
import { useSearchParams } from "next/navigation";
import MerchandiseCard from "../cards/Merchandise";

const ShopItems = ({ data }: { data: typeof TEST_MERCHANDISE2 }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const lastPage = Math.ceil(data.length / PAGE_SIZE);

  const currentPageStartItem = (currentPage - 1) * PAGE_SIZE;
  const currentPageEndItem = (currentPage - 1) * PAGE_SIZE + PAGE_SIZE;

  const currentItems = data.slice(currentPageStartItem, currentPageEndItem);

  return (
    <div className="min-h-52 w-full space-y-10 rounded-md p-5 bg-accent">
      <ul className="grid grid-cols-5 justify-center">
        {currentItems.map((item) => {
          return (
            <li className="m-3" key={item.title}>
              <MerchandiseCard
                href={`/shop/${item.id}`}
                cardType="shop"
                currencyType={item.currencyType}
                description={item.description}
                images={item.images}
                thumbnailImage={item.thumbnailImage}
                price={item.price}
                title={item.title}
              />
            </li>
          );
        })}
      </ul>

      <PaginationCn currentPage={currentPage} lastPage={lastPage} />
    </div>
  );
};

export default ShopItems;
