import { TFunction } from "i18next";

export function sortOptions(t: TFunction<"shop", undefined>) {
  const translatedOptions = [
    {
      name: t("select.priceLF"),
      value: "price-asc",
    },
    {
      name: t("select.priceHF"),
      value: "price-desc",
    },
    {
      name: t("select.dateNF"),
      value: "date-desc",
    },
    {
      name: t("select.dateOF"),
      value: "date-asc",
    },
  ];

  return translatedOptions;
}
