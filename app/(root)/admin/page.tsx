"use client";
import VerticalMenu from "@/components/shared/VerticalMenu";
import { ADMIN_MENU } from "@/constants";
import React, { useState } from "react";
import Dashboard from "@/components/admin/Dashboard";
import Account from "@/components/shared/Account";
import Shopboard from "@/components/admin/Shopboard";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { category: string; sortBy: string };
}) => {
  const [tab, setTab] = useState(ADMIN_MENU[0].label);

  function handleChangeTab(label: string) {
    setTab(label);
  }
  return (
    <>
      <section className="hidden padding-container sm:flex flex-col gap-5">
        <div className="flex">
          <div className="pt-20">
            <VerticalMenu
              activeValue={tab}
              menuList={ADMIN_MENU}
              onClick={handleChangeTab}
            />
          </div>

          <div className=" w-full rounded-md bg-accent">
            {tab === "dashboard" && <Dashboard />}
            {tab === "account" && <Account />}
            {tab === "shopboard" && <Shopboard searchParams={searchParams} />}
          </div>
        </div>
      </section>
      <section className="sm:hidden padding-container">
        <div className="flex flex-col gap-5">
          <div className="pt-20">
            <VerticalMenu
              activeValue={searchParams.category}
              menuList={ADMIN_MENU}
              onClick={handleChangeTab}
            />
          </div>

          <div className=" w-full rounded-md bg-accent">
            {tab === "dashboard" && <Dashboard />}
            {tab === "account" && <Account />}
            {tab === "shopboard" && <Shopboard searchParams={searchParams} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminPage;
