import { NAV_BAR_LINKS } from "@/constants";
import { TFunction } from "i18next";

export function translateNavbar(t: TFunction<"head", undefined>) {
  return NAV_BAR_LINKS.map((val) => {
    return { ...val, label: t(val.label) };
  });
}
