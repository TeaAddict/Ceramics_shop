"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import LabelButton from "../shared/LabelButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/constants";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";
import { translateSortOptions } from "@/utils/functions/translateSortOptions";

export function MobileSortByModal({ sortBy }: { sortBy: string }) {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const translatedOptions = translateSortOptions(t);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    router.replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <FaSortAlphaUpAlt className="text-primary" size={25} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("sortBy")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 divide-y-2">
          {translatedOptions.map((option) => {
            return (
              <LabelButton
                key={option.value}
                onClick={() => handleClick(option.value)}
                isActive={sortBy === option.value}
              >
                {option.name}
              </LabelButton>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
