"use client";
import React, { useState } from "react";
import QuantityPicker from "../shared/QuantityPicker";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItem, removeItem } from "@/redux/features/cartSlice";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { formatToEuroCurrency } from "@/utils/helper";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";

const ItemCartInterface = ({
  item,
  params,
}: {
  item: ItemWithPicThumbFav;
  params: { id: string };
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  const cartItem = cart.find((item) => item.id === params.id);

  function handleIncrease() {
    if (quantity < item!.stock) setQuantity((quantity: number) => quantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) setQuantity((quantity: number) => quantity - 1);
  }
  function handleRemoveFromCart() {
    if (item) dispatch(removeItem(params.id));
  }

  if (cartItem)
    return (
      <div className="space-y-5 flex md:flex-col justify-around md:justify-normal">
        <p className="text-2xl uppercase font-semibold">
          EUR {formatToEuroCurrency(item.price)}
        </p>
        <RemoveFromCartButton item={item} params={params} />
      </div>
    );

  return (
    <div className="space-y-5 flex md:flex-col justify-around md:justify-normal">
      <div className="space-y-5">
        <p className="text-2xl uppercase font-semibold">
          EUR {formatToEuroCurrency(item.price)}
        </p>
        {item.stock > 1 && (
          <div>
            <QuantityPicker
              currentQuantity={quantity}
              decreaseFunc={handleDecrease}
              increaseFunc={handleIncrease}
            />
            <p>in stock: {item?.stock}</p>
          </div>
        )}
      </div>
      <AddToCartButton item={item} quantity={quantity} />
    </div>
  );
};

export default ItemCartInterface;
