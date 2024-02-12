"use client";

import { NAV_BAR_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import HamburgerSvg from "./HamburgerSvg";
import CartBadge from "./CartBadge";
import MobileNavbar from "./MobileNavbar";
import Hamburger from "./Hamburger";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  return (
    <section className="sticky top-0 z-10 px-6 lg:px-20 3xl:px-24 flex items-center justify-between bg-white/90">
      <Image
        src={"/assets/sk_logo.png"}
        alt="logo"
        width={100}
        height={100}
        style={{ width: "auto", height: "auto" }}
      />

      <div className="hidden md:flex">
        <ul className="flex gap-7 text-2xl">
          {NAV_BAR_LINKS.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                style={{
                  pointerEvents:
                    !isActive || pathname.includes("/shop/") ? "auto" : "none",
                }}
                className={`text-black flex ${
                  !isActive
                    ? "hover:border-b-[1px] border-black"
                    : "border-b-2 border-black"
                }`}
              >
                {React.createElement(link.icon)}
                {link.label}
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:block">
          <CartBadge />
        </div>
        <div className="hidden md:block">
          <Button>Login</Button>
        </div>
        <div className="md:hidden">
          <Hamburger
            isActive={isMobileMenuActive}
            setIsActive={setIsMobileMenuActive}
          />
          <MobileNavbar
            isActive={isMobileMenuActive}
            setIsActive={setIsMobileMenuActive}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
