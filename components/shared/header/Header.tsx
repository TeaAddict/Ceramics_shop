import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavButtons from "./NavButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const Header = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

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
        <NavButtons />
      </div>
      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:block">
          <CartBadge />
        </div>
        <div className="hidden md:block">
          <Button>Login</Button>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </section>
  );
};

export default Header;
