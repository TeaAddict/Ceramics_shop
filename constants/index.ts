import { useTranslation } from "@/app/i18n";
import { DeliveryStatus } from "@prisma/client";
import { BiShoppingBag } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";
import { LuPhone } from "react-icons/lu";

export const PAGE_SIZE = 8;

export const SHIPPING_STATUS = [
  { name: "SHIPPING", value: DeliveryStatus.SHIPPING },
  { name: "SHIPPED", value: DeliveryStatus.SHIPPED },
  { name: "ARRIVED", value: DeliveryStatus.ARRIVED },
  { name: "COLLECTED", value: DeliveryStatus.COLLECTED },
  // { name: "SHIPPING", value: "shipping" },
  // { name: "SHIPPED", value: "shipped" },
  // { name: "ARRIVED", value: "arrived" },
  // { name: "COLLECTED", value: "collected" },
];

export const NAV_BAR_LINKS = [
  {
    label: "home",
    route: "/",
    icon: BiHomeAlt2,
  },
  {
    label: "shop",
    route: "/shop",
    icon: BiShoppingBag,
  },
  {
    label: "about",
    route: "/about",
    icon: GrGroup,
  },
  {
    label: "contacts",
    route: "/contacts",
    icon: LuPhone,
  },
];

// export const FOOTER_QUICK_LINKS = [
//   {
//     label: "Home",
//     href: "/",
//   },
//   {
//     label: "Shop",
//     href: "/shop",
//   },
//   {
//     label: "About us",
//     href: "/about",
//   },
//   {
//     label: "Contact us",
//     href: "/contacts",
//   },
//   {
//     label: "Privacy policy",
//     href: "/privacyPolicy",
//   },
// ];
export const FOOTER_QUICK_LINKS = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "shop",
    href: "/shop",
  },
  {
    label: "aboutUs",
    href: "/about",
  },
  {
    label: "contactUs",
    href: "/contacts",
  },
  {
    label: "privacyPolicy",
    href: "/privacyPolicy",
  },
];

export const ADMIN_MENU = [
  // {
  //   label: "dashboard",
  // },
  {
    label: "orders",
  },
  {
    label: "shopboard",
  },
  // {
  //   label: "account",
  // },
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

export const ORDER_TABLE_HEAD = [
  "id",
  "status",
  "first name",
  "last name",
  "email",
  "phone",
  "created",
];
export const ORDER_TABLE_HEAD2 = [
  {
    label: "id",
    value: "id",
  },
  {
    label: "status",
    value: "status",
  },
  {
    label: "first name",
    value: "firstName",
  },
  {
    label: "last name",
    value: "lastName",
  },
  {
    label: "email",
    value: "email",
  },
  {
    label: "phone",
    value: "phone",
  },
  {
    label: "created",
    value: "created",
  },
];
