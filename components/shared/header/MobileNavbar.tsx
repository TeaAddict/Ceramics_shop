import { NAV_BAR_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const MobileNavbar = ({
  isMobileMenuActive,
  setIsMobileMenuActive,
}: {
  isMobileMenuActive?: boolean;
  setIsMobileMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  return (
    <nav>
      <div
        className={`bg-primary fixed z-[9] right-0 top-0 h-full w-[60%] transition-all duration-300 flex flex-col justify-center items-center ${
          isMobileMenuActive ? "" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-8 p-5 text-white/70 text-3xl">
          {NAV_BAR_LINKS.map((nav) => {
            const isActive = pathname === nav.route;

            return (
              <li key={nav.label}>
                <Link
                  href={nav.route}
                  className={`flex gap-3 ${isActive && "text-white"}`}
                  onClick={() =>
                    setIsMobileMenuActive(
                      (isMobileMenuActive) => !isMobileMenuActive
                    )
                  }
                >
                  <nav.icon />
                  <p>{nav.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={
          isMobileMenuActive
            ? "backdrop-blur-sm bg-black/30 fixed z-[5] left-0 top-0 w-full h-full transition-all duration-500"
            : "fixed z-[0] left-0 top-0 w-full h-full transition-all duration-1000 pointer-events-none"
        }
        onClick={() => setIsMobileMenuActive((isActive) => !isActive)}
      />
    </nav>
  );
};

export default MobileNavbar;
