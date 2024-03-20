import { useTranslation } from "@/app/i18n";
import { parseDate } from "@/utils/functions/parseDate";
import { getOldestItemDate } from "@/utils/server/getOldestItemDate";
import { getContacts } from "@/utils/server/settings/getContacts";
import React from "react";

const PrivacyPolicyPage = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const { t } = await useTranslation(lng, "privacy");
  const { id, email, phone, physicalLocation } = (await getContacts()) ?? {
    physicalLocation: "",
    email: "",
    phone: "",
  };
  const date = await getOldestItemDate().then((val) => {
    if (val) return parseDate(val);
  });
  const fixedDate = date?.replaceAll("/", ":");
  const url = process.env["SERVER_URL"]?.split("//");

  return (
    <div className="padding-container flex-col">
      <div className="mx-auto w-[40vw] flex flex-col gap-5 pb-10">
        <h1>{t("h1")}</h1>
        <p>{t("p", { url: url?.[1] })}</p>

        <div>
          <h2>{t("p1.h2")}</h2>
          <p>{t("p1.p")}</p>
        </div>
        <div>
          <h2>{t("p2.h2")}</h2>
          <p>{t("p2.p")}</p>
        </div>
        <div>
          <h2>{t("p3.h2")}</h2>
          <p>{t("p3.p")}</p>
        </div>
        <div>
          <h2>{t("p4.h2")}</h2>
          <p>{t("p4.p")}</p>
        </div>
        <div>
          <h2>{t("p5.h2")}</h2>
          <p>{t("p5.p", { email: email })}</p>
        </div>
        <div>
          <h2>{t("p6.h2")}</h2>
          <p>{t("p6.p")}</p>
        </div>
        <div>
          <h2>{t("p7.h2")}</h2>
          <p>{t("p7.p")}</p>
        </div>
        <div>
          <h2>{t("p8.h2")}</h2>
          <p>
            {t("p8.p", {
              email: email,
              phone: phone,
              physicalLocation: physicalLocation,
              date: fixedDate,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
