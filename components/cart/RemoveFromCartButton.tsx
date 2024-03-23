"use client";
import { ItemWithPicThumb } from "@/prisma/prismaTypes";
import { removeItem } from "@/redux/features/cartSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

const RemoveFromCartButton = ({
  item,
  params,
}: {
  item: ItemWithPicThumb;
  params: { id: string };
}) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "cart");
  const dispatch = useDispatch<AppDispatch>();

  function handleRemoveFromCart() {
    if (item) {
      dispatch(removeItem(params.id));
      toast.success(`Removed ${item.title} from cart!`);
    }
  }

  return (
    <Button onClick={handleRemoveFromCart}>
      {t("itemCartInterface.removeFromCart")}
    </Button>
  );
};

export default RemoveFromCartButton;
