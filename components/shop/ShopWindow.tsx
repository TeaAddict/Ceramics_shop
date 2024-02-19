"use client";

import { SelectCn } from "@/components/cart/SelectCn";
import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { countProperties } from "@/utils/countProperties";
import { usePathname, useRouter } from "next/navigation";
import { NewItemModal } from "../admin/NewItemModal";
import { useItems } from "@/hooks/useItems";
import { sortOptions } from "@/constants";

type TSort = {
  price: number;
};

const ShopWindow = ({
  searchParams,
  color = "default",
  isAdmin = false,
}: {
  searchParams: { category: string; sortBy: string };
  color?: "default" | "inverted";
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useItems();
  if (!data || (data?.length === 0 && !isAdmin)) return <p>Out of stock</p>;
  else if (!data || (data?.length === 0 && isAdmin))
    return (
      <div className="justify-center flex">
        <NewItemModal />
      </div>
    );

  const categoriesCounts = countProperties(data, "category");

  const category = searchParams["category"] ?? categoriesCounts[0].label;
  const sortBy =
    (searchParams["sortBy"] as
      | "price-asc"
      | "price-desc"
      | "date-desc"
      | "date-asc") ?? "price-asc";

  const sort = sortBy.split("-");

  const filtered = data.filter((item) => item.category === category);

  const sorted = filtered.sort((a, b) => {
    if (sort[0] === "date") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sort[1] === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }
    if (sort[1] === "asc") {
      return a[sort[0] as keyof TSort] - b[sort[0] as keyof TSort];
    } else {
      return b[sort[0] as keyof TSort] - a[sort[0] as keyof TSort];
    }
  });

  function handleChangeParam(key: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", key);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div className="sm:flex justify-end mb-5 hidden">
        <SelectCn
          selectOptions={sortOptions}
          initialSelection={sortBy}
          color={color}
        />
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="space-y-10 w-52 hidden sm:block">
          <h3 className="font-semibold">Categories</h3>
          <VerticalMenu
            menuList={categoriesCounts}
            activeValue={category}
            onClick={handleChangeParam}
            color={color}
          />
          {isAdmin && (
            <div className="justify-center flex">
              <NewItemModal />
            </div>
          )}
        </div>
        <ShopItems data={sorted} color={color} />
      </div>
    </div>
  );
};

export default ShopWindow;
