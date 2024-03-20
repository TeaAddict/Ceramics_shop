import { TFunction } from "i18next";

export function translateOrderTableHead(t: TFunction<"admin", undefined>) {
  const translatedHead = [
    { label: t("id"), value: "id" },
    { label: t("status"), value: "status" },
    { label: t("firstName"), value: "firstName" },
    { label: t("lastName"), value: "lastName" },
    { label: t("email"), value: "email" },
    { label: t("phone"), value: "phone" },
    { label: t("created"), value: "created" },
  ];
  return translatedHead;
}
