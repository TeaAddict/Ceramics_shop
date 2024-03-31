"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import LabelButton from "../shared/LabelButton";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";

export function MobileFilterByModal({
  categories,
  filterBy,
}: {
  categories: { label: string; value: number }[];
  filterBy: string;
}) {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const [open, setOpen] = useState(false);
  const { setLastParams } = useUpdateSearchParams();

  function handleClick(value: string) {
    setLastParams([{ name: "category", value: value }]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <FaFilter className="text-primary" size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("categories")}</DialogTitle>
        </DialogHeader>
        <ScrollArea type="always">
          <ScrollAreaViewport className="max-h-[70vh] mr-3">
            <div className="flex flex-col gap-3 divide-y-2">
              {categories.map((el) => (
                <LabelButton
                  isActive={filterBy === el.label}
                  onClick={() => handleClick(el.label)}
                  key={el.label}
                >
                  <div className="flex gap-5 items-center">
                    <p>{capitalizeFirstLetter(el.label)}</p>
                    <div className="flex items-center justify-center border-2 rounded-full w-10 h-10">
                      <p className="">{el.value}</p>
                    </div>
                  </div>
                </LabelButton>
              ))}
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb className="flex bg-black relative border-2 rounded-md" />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
