import React from "react";
import ShopWindow from "../shop/ShopWindow";
import MobileFooter from "../shop/MobileFooter";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import {
  getCategories,
  getUniqueCategories,
} from "@/utils/server/item/getCategories";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { countProperties } from "@/utils/countProperties";

const Shopboard = async ({
  searchParams,
  lng,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
  lng: string;
}) => {
  const categories = await getCategories();
  const categoriesCounts = countProperties(categories, "category");
  const settings = await getGeneralSettings();

  if (!settings)
    return (
      <CustomReturnMessage
        text="Please set up settings first"
        backButton={false}
      />
    );
  return (
    <div className="flex-col">
      <ShopWindow
        searchParams={searchParams}
        color="inverted"
        isAdmin={true}
        settings={settings}
        lng={lng}
      />
      <div className="sm:hidden">
        <MobileFooter
          categories={categoriesCounts}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default Shopboard;
