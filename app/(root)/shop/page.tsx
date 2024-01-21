"use client";

import { SelectCn } from "@/components/homepage/SelectCn";
import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import { countProperties } from "@/utils/countProperties";
import { processArray } from "@/utils/testFunc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filter = searchParams.get("category");
  const page = searchParams.get("page");
  const filteredData = TEST_MERCHANDISE2.filter(
    (item) => item.category === filter
  );

  const categoriesCounts = countProperties(TEST_MERCHANDISE2, "category");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!filter) params.set("category", categoriesCounts[0].label);
    if (!page) params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, filter, page, categoriesCounts, searchParams]);

  function handleChangeParam(key: string) {
    const params = new URLSearchParams(searchParams);

    params.set("category", key);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex flex-col padding-container">
      {/* <h1 className="text-2xl font-bold pb-5">Shop</h1> */}

      <div className="flex justify-end mb-5">
        <SelectCn />
      </div>

      <div className="flex">
        <div className="space-y-5 w-52">
          <h3 className="font-semibold">Categories</h3>
          <VerticalMenu
            menuList={categoriesCounts}
            onClick={handleChangeParam}
          />
        </div>
        <ShopItems data={filteredData} />
      </div>
    </section>
  );
};

export default ShopPage;
