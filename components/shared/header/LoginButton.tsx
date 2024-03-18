"use client";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { LANGUAGES } from "./LanguageButton";

const LoginButton = () => {
  const lng = useCurrentLanguage(LANGUAGES);
  const { t } = useTranslation(lng, "head");
  return (
    <div>
      <Button onClick={() => signIn()}>{t("login")}</Button>
    </div>
  );
};

export default LoginButton;
