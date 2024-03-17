"use client";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { removeItem } from "@/redux/features/cartSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const RemoveFromCartButton = ({
  item,
  params,
}: {
  item: ItemWithPicThumbFav;
  params: { id: string };
}) => {
  const dispatch = useDispatch<AppDispatch>();

  function handleRemoveFromCart() {
    if (item) {
      dispatch(removeItem(params.id));
      toast.success(`Removed ${item.title} from cart!`);
    }
  }

  return <Button onClick={handleRemoveFromCart}>REMOVE FROM CART</Button>;
};

export default RemoveFromCartButton;
