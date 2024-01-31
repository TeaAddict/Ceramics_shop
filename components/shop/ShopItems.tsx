import { PAGE_SIZE, TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import PaginationCn from "../shared/PaginationCn";
import Merchandise from "../cards/Merchandise";
import { useSearchParams } from "next/navigation";
import MerchandiseCard from "../cards/Merchandise";
import { ProductSchema } from "@/lib/types";

const ShopItems = ({
  data,
  color = "default",
}: {
  data: ProductSchema[];
  color?: "default" | "inverted";
}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const lastPage = Math.ceil(data.length / PAGE_SIZE);

  const currentPageStartItem = (currentPage - 1) * PAGE_SIZE;
  const currentPageEndItem = (currentPage - 1) * PAGE_SIZE + PAGE_SIZE;

  const currentItems = data.slice(currentPageStartItem, currentPageEndItem);

  return (
    <div
      className={`min-h-52 w-full space-y-10 rounded-md p-5  ${
        color === "default" ? "bg-accent" : "bg-background"
      }`}
    >
      <ul className="grid grid-cols-5 justify-center">
        {currentItems.map((item) => {
          return (
            <li className="m-3" key={item.title}>
              <MerchandiseCard
                href={`/shop/${item.id}`}
                cardType="shop"
                description={item.description}
                thumbnail={item.thumbnail}
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
