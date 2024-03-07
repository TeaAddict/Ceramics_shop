import React from "react";
import Dashboard from "./Dashboard";
import Shopboard from "./Shopboard";
import Account from "../shared/Account";
import { SearchParams } from "@/app/(root)/admin/page";
import { capitalizeFirstLetter } from "@/utils/helper";
import ServerSettings from "./settings/ServerSettings";

const TabContent = ({ searchParams }: { searchParams: SearchParams }) => {
  const { tab } = searchParams;
  const compName = capitalizeFirstLetter(tab || "");
  return (
    <div>
      {tab === "dashboard" && <Dashboard />}
      {tab === "shopboard" && <Shopboard searchParams={searchParams} />}
      {tab === "account" && <Account />}
      {tab === "settings" && <ServerSettings />}
    </div>
  );
};

export default TabContent;
