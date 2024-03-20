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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

export function MobileFilterByModal({
  categories,
  filterBy,
}: {
  categories: string[];
  filterBy: string;
}) {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", value.toString());
    router.replace(`${pathname}?${params.toString()}`);
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
        <div className="flex flex-col gap-3 divide-y-2">
          {categories.map((el) => (
            <LabelButton
              isActive={filterBy === el}
              onClick={() => handleClick(el)}
              key={el}
            >
              {el}
            </LabelButton>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
