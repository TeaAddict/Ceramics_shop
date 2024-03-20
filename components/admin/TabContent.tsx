import React from "react";
import Dashboard from "./Dashboard";
import Shopboard from "./Shopboard";
import Account from "../shared/Account";
import ServerSettings from "./settings/ServerSettings";
import OrdersServer from "./orders/OrdersServer";
import { SearchParams } from "@/app/[lng]/(root)/admin/page";
import { useTranslation } from "@/app/i18n";

// TODO: open page coresponding to tab through index admin list?
const TabContent = async ({
  searchParams,
  lng,
}: {
  searchParams: SearchParams;
  lng: string;
}) => {
  const { tab } = searchParams;
  const { t } = await useTranslation(lng, "admin");

  return (
    <div className="overflow-x-auto w-full">
      {tab === t("orders") && <OrdersServer lng={lng} />}
      {tab === t("shopboard") && (
        <Shopboard searchParams={searchParams} lng={lng} />
      )}
      {tab === t("settings") && <ServerSettings />}
      {/* {tab === "dashboard" && <Dashboard />} */}
      {/* {tab === "account" && <Account />} */}
    </div>
  );
};

export default TabContent;
