"use client";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { addItem } from "@/redux/features/cartSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

const AddToCartButton = ({
  item,
  quantity,
}: {
  item: ItemWithPicThumbFav;
  quantity: number;
}) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "cart");
  const dispatch = useDispatch<AppDispatch>();

  function handleAddToCart() {
    if (item) {
      dispatch(
        addItem({
          id: item.id,
          quantity: quantity,
          stock: item.stock,
          unitPrice: item.price,
          totalPrice: quantity * item.price,
          picture: item.thumbnail!.name,
          title: item.title,
        })
      );

      toast.success(`Added ${quantity} ${item.title} to cart!`);
    }
  }

  return (
    <Button onClick={handleAddToCart}>
      {t("itemCartInterface.addToCart")}
    </Button>
  );
};

export default AddToCartButton;
