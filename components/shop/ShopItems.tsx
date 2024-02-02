import { PAGE_SIZE, TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import PaginationCn from "../shared/PaginationCn";
import Merchandise from "../cards/Merchandise";
import { usePathname, useSearchParams } from "next/navigation";
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
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  return (
    <div
      className={`w-full sm:space-y-10 rounded-md pb-3 sm:p-5 ${
        color === "default" ? "bg-accent" : "bg-background"
      }`}
    >
      <ul
        className={
          isAdmin
            ? "sm:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex flex-col"
            : "sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 flex flex-col"
        }
      >
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
