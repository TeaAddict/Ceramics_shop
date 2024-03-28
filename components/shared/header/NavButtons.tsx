"use client";

import { useTranslation } from "@/app/i18n/client";
import { NAV_BAR_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavButtons = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "head");
  const pathname = usePathname();

  return (
    <ul className="flex gap-5 xl:gap-7 text-2xl">
      {NAV_BAR_LINKS.map((link) => {
        const isActive =
          pathname === `/${lng}${link.route === "/" ? "" : link.route}`;
        return (
          <Link
            href={`${link.route}`}
            key={link.label}
            style={{
              pointerEvents:
                !isActive || pathname.includes("/shop/") ? "auto" : "none",
            }}
            className={`text-black gap-1 flex ${
              !isActive
                ? "hover:border-b-[1px] border-black"
                : "border-b-2 border-black"
            }`}
          >
            {React.createElement(link.icon)}
            <div className="hidden lg:block">{t(`${link.label}`)}</div>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavButtons;
