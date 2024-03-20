import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ItemForm from "./ItemForm/ItemForm";
import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";

export function NewItemModal() {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="default">
          {t("itemModal.addItem")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("itemModal.addNewItem")}</DialogTitle>
        </DialogHeader>
        <ItemForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
