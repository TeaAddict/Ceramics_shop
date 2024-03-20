import { TFunction } from "i18next";

export function translateAdminMenu(t: TFunction<"admin", undefined>) {
  const translatedOptions = [
    // {
    //   label: "dashboard",
    // },
    {
      label: t("orders"),
    },
    {
      label: t("shopboard"),
    },
    // {
    //   label: "account",
    // },
    {
      label: t("settings"),
    },
  ];

  return translatedOptions;
}
