import { BiShoppingBag } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";
import { LuPhone } from "react-icons/lu";

export const PAGE_SIZE = 8;

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
    label: "About",
    route: "/about",
    icon: GrGroup,
  },
  {
    label: "Contacts",
    route: "/contacts",
    icon: LuPhone,
  },
];

export const ADMIN_MENU = [
  {
    label: "dashboard",
  },
  {
    label: "shopboard",
  },
  {
    label: "account",
  },
  {
    label: "settings",
  },
];

export const FEATURE_SOLD = [
  {
    name: "Display sold",
    value: "true",
  },
  {
    name: "Hide sold",
    value: "false",
  },
];

export const SORT_OPTIONS = [
  {
    name: "Price: lowest first",
    value: "price-asc",
  },
  {
    name: "Price: highest first",
    value: "price-desc",
  },
  {
    name: "Date: newest first",
    value: "date-desc",
  },
  {
    name: "Date: oldest first",
    value: "date-asc",
  },
];
