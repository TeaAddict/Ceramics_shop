"use client";

import { SelectCn } from "@/components/shared/SelectCn";
import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { countProperties } from "@/utils/countProperties";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewItemModal } from "../admin/NewItemModal";
import { useItems } from "@/hooks/useItems";
import { sortOptions } from "@/constants";
import OutOfStockPage from "./OutOfStockPage";
import { useEffect } from "react";
import LoadPage from "../shared/loadSpinner/LoadPage";
import { sortItems } from "@/utils/item/sortItems";

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
  const forUrlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");
  const adminPageAuth = isAdmin && isAdminPage;
  const { data, isLoading } = useItems();
  const items = data ?? [];

  const categoriesCounts = countProperties(items, "category");
  const category = searchParams["category"] ?? categoriesCounts[0]?.label;

  const filtered = items.filter((item) => item.category === category);

  const sortBy = searchParams["sortBy"] ?? "date-desc";
  const sorted = sortItems(filtered, sortBy);

  function handleChange(value: string) {
    const res = new URLSearchParams(forUrlSearchParams);
    res.set("sortBy", value);
    router.push(`${pathname}?${res.toString()}`);
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
          onChange={handleChange}
          selectLabel="sortBy"
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
            pageParam={true}
            menuList={categoriesCounts}
            color={color}
            paramName="category"
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
