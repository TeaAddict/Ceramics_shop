"use client";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { addItem } from "@/redux/features/cartSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const AddToCartButton = ({
  item,
  quantity,
}: {
  item: ItemWithPicThumbFav;
  quantity: number;
}) => {
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

  return <Button onClick={handleAddToCart}>ADD TO CART</Button>;
};

export default AddToCartButton;
