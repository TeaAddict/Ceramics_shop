import React from "react";
import ShopWindow from "../shop/ShopWindow";
import MobileFooter from "../shop/MobileFooter";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import LoadPage from "../shared/loadSpinner/LoadPage";
import { getCategories } from "@/utils/server/item/getCategories";
import CustomReturnMessage from "../shared/CustomReturnMessage";

const Shopboard = async ({
  searchParams,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
}) => {
  const categories = await getCategories();
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
      />
      <div className="sm:hidden">
        <MobileFooter categories={categories} searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Shopboard;
