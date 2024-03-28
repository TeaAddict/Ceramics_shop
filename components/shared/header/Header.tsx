import Image from "next/image";
import React from "react";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavButtons from "./NavButtons";
import { getServerSession } from "next-auth";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import ProfileButton from "@/components/profile/ProfileButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LanguageButton from "./LanguageButton";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import skLogo from "@/public/assets/sk_logo.png";

const Header = async ({ lng }: { lng: string }) => {
  const session = await getServerSession(authOptions);
  const settings = await getGeneralSettings();

  return (
    <section className="sticky top-0 z-10 px-6 py-3 lg:px-20 3xl:px-24 gap-3 xl:gap-0 flex items-center justify-between bg-white/90">
      <div className="flex flex-none">
        <Link href={"/"}>
          <Image
            src={skLogo}
            alt="logo"
            style={{ width: "40px", height: "auto" }}
          />
        </Link>
      </div>
      <div className="hidden md:flex">
        <NavButtons lng={lng} />
      </div>
      <div className="flex items-center gap-3">
        {settings?.paymentOnline && (
          <div>
            <CartBadge />
          </div>
        )}
        {!session ? (
          <div className="hidden md:block">
            <LoginButton />
          </div>
        ) : (
          <div className="hidden md:flex md:gap-5 md:items-center">
            {session?.user?.image && session.user.name && (
              <ProfileButton
                route={`/admin`}
                name={session.user.name}
                image={session.user.image}
              />
            )}
            <LogoutButton />
          </div>
        )}
        <LanguageButton lng={lng} />
        <div className="md:hidden">
          <MobileMenu session={session} />
        </div>
      </div>
    </section>
  );
};

export default Header;
