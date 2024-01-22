"use client";
import VerticalMenu from "@/components/shared/VerticalMenu";
import { ADMIN_MENU } from "@/constants";
import React, { useState } from "react";
import Dashboard from "@/components/admin/Dashboard";
import Account from "@/components/shared/Account";
import Shopboard from "@/components/admin/Shopboard";

const AdminPage = () => {
  const [tab, setTab] = useState("");

  function handleChangeTab(label: string) {
    setTab(label);
  }

  return (
    <section className="padding-container flex flex-col gap-5">
      {/* <p>{tab}</p> */}

      <div className="flex">
        <div className="pt-20">
          <VerticalMenu menuList={ADMIN_MENU} onClick={handleChangeTab} />
        </div>

        <div className=" w-full rounded-md bg-accent">
          {tab === "Dashboard" && <Dashboard />}
          {tab === "Account" && <Account />}
          {tab === "Shopboard" && <Shopboard />}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
