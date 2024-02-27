import React from "react";
import ShopWindow from "../shop/ShopWindow";
import MobileFooter from "../shop/MobileFooter";
import { getCategories } from "@/app/api/_functions/getCategories";

const Shopboard = async ({
  searchParams,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
}) => {
  const categories = await getCategories();
  return (
    <div className="padding-container">
      <ShopWindow searchParams={searchParams} color="inverted" isAdmin={true} />
      <div className="sm:hidden">
        {/* TODO might need to use mobile shop footer if I do not change admin footer */}
        {/* <AdminMobileFooter /> */}
        <MobileFooter categories={categories} searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Shopboard;
