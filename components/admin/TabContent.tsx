import React from "react";
import Dashboard from "./Dashboard";
import Shopboard from "./Shopboard";
import Account from "../shared/Account";
import { SearchParams } from "@/app/(root)/admin/page";
import { capitalizeFirstLetter } from "@/utils/helper";
import ServerSettings from "./settings/ServerSettings";
import OrdersServer from "./orders/OrdersServer";

// TODO: open page coresponding to tab through index admin list?
const TabContent = ({ searchParams }: { searchParams: SearchParams }) => {
  const { tab } = searchParams;
  const compName = capitalizeFirstLetter(tab || "");
  return (
    <div className="overflow-x-auto w-full">
      {tab === "dashboard" && <Dashboard />}
      {tab === "orders" && <OrdersServer />}
      {tab === "shopboard" && <Shopboard searchParams={searchParams} />}
      {tab === "account" && <Account />}
      {tab === "settings" && <ServerSettings />}
    </div>
  );
};

export default TabContent;
