import { TFunction } from "i18next";

export function translateOrderTableHead(t: TFunction<"admin", undefined>) {
  const translatedHead = [
    { label: t("id"), value: "id" },
    { label: t("status"), value: "status" },
    { label: t("firstName"), value: "firstName" },
    { label: t("lastName"), value: "lastName" },
    { label: t("email"), value: "email" },
    { label: t("phone"), value: "phone" },
    { label: t("city"), value: "city" },
    { label: t("state"), value: "state" },
    { label: t("country"), value: "country" },
    { label: t("postal_code"), value: "postal_code" },
    { label: t("line1"), value: "line1" },
    { label: t("line2"), value: "line2" },
    { label: t("created"), value: "created" },
  ];
  return translatedHead;
}
