"use client";

import { SelectCn } from "@/components/homepage/SelectCn";
import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import { countProperties } from "@/utils/countProperties";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { NewItemModal } from "../admin/NewItemModal";

const ShopWindow = ({
  color = "default",
  isAdmin = false,
}: {
  color?: "default" | "inverted";
  isAdmin?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filter = searchParams.get("category");
  const filteredData = TEST_MERCHANDISE2.filter(
    (item) => item.category === filter
  );

  const categoriesCounts = countProperties(TEST_MERCHANDISE2, "category");

  function handleChangeParam(key: string) {
    const params = new URLSearchParams(searchParams);

    params.set("category", key);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoriesCounts[0].label);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-5">
        <SelectCn color={color} />
      </div>

      <div className="flex">
        <div className="space-y-10 w-52">
          <h3 className="font-semibold">Categories</h3>
          <VerticalMenu
            menuList={categoriesCounts}
            onClick={handleChangeParam}
            color={color}
          />
          {isAdmin && (
            <div className="justify-center flex">
              <NewItemModal />
            </div>
          )}
        </div>
        <ShopItems data={filteredData} color={color} />
      </div>
    </div>
  );
};

export default ShopWindow;
