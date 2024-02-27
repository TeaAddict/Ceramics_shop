"use client";

import { SelectCn } from "@/components/cart/SelectCn";
import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { countProperties } from "@/utils/countProperties";
import { usePathname, useRouter } from "next/navigation";
import { NewItemModal } from "../admin/NewItemModal";
import { useItems } from "@/hooks/useItems";
import { sortOptions } from "@/constants";
import OutOfStockPage from "./OutOfStockPage";
import { useEffect } from "react";
import LoadPage from "../shared/loadSpinner/LoadPage";

type TSort = {
  price: number;
};

const ShopWindow = ({
  searchParams,
  color = "default",
  isAdmin = false,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
  color?: "default" | "inverted";
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");
  const adminPageAuth = isAdmin && isAdminPage;
  const { data, isLoading } = useItems();
  const items = data ?? [];

  const categoriesCounts = countProperties(items, "category");
  const category = searchParams["category"] ?? categoriesCounts[0]?.label;

  const filtered = items.filter((item) => item.category === category);

  const sortBy =
    (searchParams["sortBy"] as
      | "price-asc"
      | "price-desc"
      | "date-desc"
      | "date-asc") ?? "date-desc";
  const sort = sortBy.split("-");
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

  useEffect(() => {
    if (!filtered.length) {
      const params = new URLSearchParams(searchParams);
      params.set("category", categoriesCounts?.[0]?.label);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [categoriesCounts, filtered.length, pathname, router, searchParams]);

  if (isLoading) return <LoadPage />;

  if (!items || (items?.length === 0 && !adminPageAuth && !isLoading))
    return <p className="flex justify-center text-2xl">Out of stock</p>;
  else if (!items || (items?.length === 0 && adminPageAuth))
    return <OutOfStockPage />;

  return (
    <div>
      <div className="sm:flex justify-end mb-5 hidden">
        <SelectCn
          selectOptions={sortOptions}
          initialSelection={sortBy}
          color={color}
        />
      </div>
      {adminPageAuth && (
        <div className="flex justify-center pb-5 sm:hidden">
          <NewItemModal />
        </div>
      )}

      <div className="flex flex-col sm:flex-row">
        <div className="space-y-10 w-52 hidden sm:block">
          <h3 className="font-semibold">Categories</h3>
          <VerticalMenu
            menuList={categoriesCounts}
            activeValue={category}
            onClick={handleChangeParam}
            color={color}
          />
          {adminPageAuth && (
            <div className="justify-center flex">
              <NewItemModal />
            </div>
          )}
        </div>
        <ShopItems data={sorted} color={color} isAdmin={adminPageAuth} />
      </div>
    </div>
  );
};

export default ShopWindow;
