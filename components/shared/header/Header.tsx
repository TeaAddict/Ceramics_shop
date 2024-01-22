"use client";

import { NAV_BAR_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import HamburgerSvg from "./HamburgerSvg";
import CartBadge from "./CartBadge";
import { useAppSelector } from "@/redux/store";

const Header = () => {
  const pathname = usePathname();
  const cartItemNum = useAppSelector((state) => state.cartReducer.cartItems);

  return (
    <section className="sticky top-0 z-10 py-1 px-6 lg:px-20 3xl:px-24 flex items-center justify-between bg-white/90">
      <Image
        src={"/assets/sk_logo.png"}
        alt="logo"
        width={100}
        height={100}
        priority={true}
        style={{ width: "auto", height: "auto" }}
      />

      <div className="hidden lg:flex">
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

      <div className="hidden lg:flex lg:items-center">
        <CartBadge value={cartItemNum.length} />
        <Button>Login</Button>
      </div>
      <div className="lg:hidden">
        <HamburgerSvg size={10} />
      </div>
    </section>
  );
};

export default Header;
