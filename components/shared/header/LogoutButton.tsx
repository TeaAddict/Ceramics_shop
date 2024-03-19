"use client";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { signOut } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shared");

  return (
    <div>
      <Button
        onClick={() => {
          toast.promise(signOut({ callbackUrl: "/" }), {
            loading: t("loggingOut"),
            success: t("logoutSuccess"),
            error: t("logoutError"),
          });
        }}
      >
        {t("logout")}
      </Button>
    </div>
  );
};

export default LogoutButton;
