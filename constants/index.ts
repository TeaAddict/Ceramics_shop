import { BiShoppingBag } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export const PAGE_SIZE = 10;

export const NAV_BAR_LINKS = [
  {
    label: "Home",
    route: "/",
    icon: BiHomeAlt2,
  },
  {
    label: "Shop",
    route: "/shop",
    icon: BiShoppingBag,
  },
  {
    label: "Admin",
    route: "/admin",
    icon: FaRegUser,
  },
];

export const ADMIN_MENU = [
  {
    label: "Dashboard",
    value: 0,
  },
  {
    label: "Shopboard",
    value: 0,
  },
  {
    label: "Account",
    value: 0,
  },
];
