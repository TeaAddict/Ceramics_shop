"use client";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { removeItem } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const RemoveFromCartButton = ({
  item,
  params,
}: {
  item: ItemWithPicThumbFav;
  params: { id: string };
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  const cartItem = cart.find((item) => item.id === params.id);

  function handleRemoveFromCart() {
    if (item) dispatch(removeItem(params.id));
  }

  return <Button onClick={handleRemoveFromCart}>REMOVE FROM CART</Button>;
};

export default RemoveFromCartButton;
