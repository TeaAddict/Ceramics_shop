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
import { ProductSchema } from "@/lib/types";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

export function EditItemModal({ item }: { item: ProductSchema }) {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="default">
          {t("edit")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
        </DialogHeader>
        <ItemForm setOpen={setOpen} item={item} />
      </DialogContent>
    </Dialog>
  );
}
