import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { translateNavbar } from "@/utils/functions/translate/translateNavbar";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const MobileNavbar = ({
  isMobileMenuActive,
  setIsMobileMenuActive,
  session,
}: {
  session: Session | null;
  isMobileMenuActive?: boolean;
  setIsMobileMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "head");
  const translatedNavbar = translateNavbar(t);
  const pathname = usePathname();
  const router = useRouter();

  function onAccountClick() {
    if (!session) {
      signIn();
    } else {
      router.replace(`/${lng}/admin`);
    }
    setIsMobileMenuActive((isMobileMenuActive) => !isMobileMenuActive);
  }
  return (
    <nav>
      <div
        className={`bg-primary fixed z-[9] right-0 top-0 h-full w-[70%] transition-all duration-300  ${
          isMobileMenuActive ? "" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between items-center">
          <ul className=" flex flex-col gap-8 text-white/70 text-3xl h-full justify-center">
            {translatedNavbar.map((nav) => {
              console.log(nav, "nav");
              const isActive =
                pathname === `/${lng}${nav.route === "/" ? "" : nav.route}`;
              return (
                <li key={nav.label}>
                  <Link
                    href={`/${lng}/${nav.route}`}
                    className={`flex gap-3 ${isActive && "text-white"}`}
                    onClick={() =>
                      setIsMobileMenuActive(
                        (isMobileMenuActive) => !isMobileMenuActive
                      )
                    }
                  >
                    <nav.icon />
                    <p>{capitalizeFirstLetter(nav.label)}</p>
                  </Link>
                </li>
              );
            })}
            <li key={"admin"}>
              <button
                className={`flex gap-3 ${
                  pathname === `/${lng}/admin` && "text-white"
                }`}
                onClick={onAccountClick}
              >
                <FaRegUser />
                {session ? <p>Admin</p> : <p>{t("login")}</p>}
              </button>
            </li>
          </ul>
          {session && (
            <div className="flex items-end pb-7">
              <button
                className="flex items-center gap-2 text-2xl"
                onClick={() => signOut}
              >
                <IoLogOutOutline />
                <p>{t("logout")}</p>
              </button>
            </div>
          )}
        </div>
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
