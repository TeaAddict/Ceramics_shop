"use client";

import React from "react";
import VerticalMenu from "../shared/VerticalMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ADMIN_MENU } from "@/constants";

const AdminVerticalMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") ?? ADMIN_MENU[0].label;

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div>
      <VerticalMenu
        activeValue={currentTab}
        menuList={ADMIN_MENU}
        onClick={handleChange}
      />
    </div>
  );
};

export default AdminVerticalMenu;
