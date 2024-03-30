import React from "react";
import { ModalWindow } from "../shared/ModalWindow";
import DeleteItemButton from "./DeleteItemButton";
import { Button } from "../ui/button";
import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";

const DeleteItemModal = ({ id }: { id: string }) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "admin");
  return (
    <ModalWindow
      buttonLabel={t("delete")}
      title={t("confirm")}
      variant={"destructive"}
    >
      <p className="text-center mb-3">{t("areSure")}</p>
      <div className="flex justify-center gap-10">
        <DeleteItemButton id={id} />
        <Button>{t("cancel")}</Button>
      </div>
    </ModalWindow>
  );
};

export default DeleteItemModal;
