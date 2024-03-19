import { useTranslation } from "@/app/i18n";
import React from "react";

const AboutTxt = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "about");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1>{t("title")}</h1>
        <p>{t("p0")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("p1.h2")}</h2>
        <p>{t("p1.p")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("p2.h2")}</h2>
        <p>{t("p2.p")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("p3.h2")}</h2>
        <p>{t("p3.p")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("p4.h2")}</h2>
        <p>{t("p4.p")}</p>
      </div>
    </div>
  );
};

export default AboutTxt;
