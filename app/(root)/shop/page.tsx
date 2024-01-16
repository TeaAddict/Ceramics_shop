"use client";

import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { TEST_MERCHANDISE } from "@/constants";
import { countProperties } from "@/utils/countProperties";
import { useSearchParams } from "next/navigation";

const ShopPage = () => {
  const searchParams = useSearchParams();

  const filter = searchParams.get("category");

  const filteredData = TEST_MERCHANDISE.filter(
    (item) => item.category === filter
  );

  const categoriesCounts = countProperties(TEST_MERCHANDISE, "category");

  return (
    <section className="flex flex-col padding-container">
      {/* <h1 className="text-2xl font-bold pb-5">Shop</h1> */}

      <div className="flex">
        <div className="space-y-5 w-52">
          <h3 className="font-semibold">Categories</h3>
          <VerticalMenu menuList={categoriesCounts} />
        </div>
        <ShopItems data={filteredData} />
      </div>
    </section>
  );
};

export default ShopPage;
