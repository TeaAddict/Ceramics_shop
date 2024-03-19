"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";

const BackButton = () => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shared");
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.back();
        }}
        variant={"secondary"}
        className="gap-1"
      >
        <IoMdArrowBack />
        {t("backBtn")}
      </Button>
    </div>
  );
};

export default BackButton;
