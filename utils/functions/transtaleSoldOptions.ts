import { TFunction } from "i18next";

export function transtaleSoldOptions(t: TFunction<"admin", undefined>) {
  const translatedOptions = [
    {
      name: t("select2.displaySold"),
      value: "true",
    },
    {
      name: t("select2.hideSold"),
      value: "false",
    },
  ];
  return translatedOptions;
}
