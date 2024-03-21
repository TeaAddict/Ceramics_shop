import { TFunction } from "i18next";

export function translatePaymentOptions(
  t: TFunction<"admin", undefined>
): { name: string; value: string }[] {
  const translatedOptions = [
    {
      name: t("select3.enablePayments"),
      value: "true",
    },
    {
      name: t("select3.disablePayments"),
      value: "false",
    },
  ];
  return translatedOptions;
}
