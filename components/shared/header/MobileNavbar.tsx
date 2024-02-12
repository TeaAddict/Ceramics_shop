import { NAV_BAR_LINKS } from "@/constants";
import Link from "next/link";
import React from "react";

const MobileNavbar = ({
  isActive,
  setIsActive,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav>
      <div
        className={`bg-primary fixed z-[9] right-0 top-0 h-full w-[50%] transition-all duration-300 flex flex-col justify-center items-center ${
          isActive ? "" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-8 p-5 text-white text-3xl">
          {NAV_BAR_LINKS.map((nav) => (
            <li key={nav.label}>
              <Link
                href={nav.route}
                className="flex gap-3"
                onClick={() => setIsActive((isActive) => !isActive)}
              >
                <nav.icon />
                <p>{nav.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={
          isActive
            ? "backdrop-blur-sm bg-black/30 fixed z-[5] left-0 top-0 w-full h-full transition-all duration-500"
            : "fixed z-[0] left-0 top-0 w-full h-full transition-all duration-1000 pointer-events-none"
        }
        onClick={() => setIsActive((isActive) => !isActive)}
      />
    </nav>
  );
};

export default MobileNavbar;
