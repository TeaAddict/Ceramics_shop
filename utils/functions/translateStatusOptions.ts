import { DeliveryStatus } from "@prisma/client";
import { TFunction } from "i18next";

export function translateStatusOptions(t: TFunction<"admin", undefined>) {
  const translatedOptions = [
    { name: t("shipping"), value: DeliveryStatus.SHIPPING },
    { name: t("shipped"), value: DeliveryStatus.SHIPPED },
    { name: t("arrived"), value: DeliveryStatus.ARRIVED },
    { name: t("collected"), value: DeliveryStatus.COLLECTED },
  ];
  return translatedOptions;
}
