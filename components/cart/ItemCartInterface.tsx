"use client";
import React, { useState } from "react";
import QuantityPicker from "../shared/QuantityPicker";
import { useAppSelector } from "@/redux/store";
import { ItemWithPicThumb } from "@/prisma/prismaTypes";
import { formatToEuroCurrency } from "@/utils/helper";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

const ItemCartInterface = ({
  item,
  params,
}: {
  item: ItemWithPicThumb;
  params: { id: string };
}) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "cart");
  const [quantity, setQuantity] = useState(1);
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  const cartItem = cart.find((item) => item.id === params.id);

  function handleIncrease() {
    if (quantity < item!.stock) setQuantity((quantity: number) => quantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) setQuantity((quantity: number) => quantity - 1);
  }

  if (cartItem)
    return (
      <div className="flex md:flex-col justify-around md:justify-normal items-start gap-5">
        <p className="text-2xl uppercase font-semibold">
          EUR {formatToEuroCurrency(item.price)}
        </p>
        <RemoveFromCartButton item={item} params={params} />
      </div>
    );

  return (
    <div className="flex gap-5 md:flex-col justify-around md:justify-normal items-start">
      <div className="flex flex-col gap-5">
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
            <p>
              {t("itemCartInterface.inStock")} {item?.stock}
            </p>
          </div>
        )}
      </div>
      <AddToCartButton item={item} quantity={quantity} />
    </div>
  );
};

export default ItemCartInterface;
