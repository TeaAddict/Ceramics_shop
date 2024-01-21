"use client";
import { useAppSelector } from "@/redux/store";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityPicker = ({
  id,
  price,
  maxQuantity,
}: {
  id: string;
  price: number;
  maxQuantity: number;
}) => {
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const item = cart.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(item!.quantity);

  function handleIncrease() {
    if (quantity < maxQuantity) setQuantity((quantity) => quantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
  }

  return (
    <div className="inline-block w-32">
      <div className="grid grid-cols-3 gap-5 items-center justify-around border-2 rounded-md p-2">
        <button onClick={handleDecrease} className="text-2xl">
          <FiMinus />
          {/* - */}
        </button>
        <p className="text-lg text-center w-full">{quantity}</p>
        <button onClick={handleIncrease} className="text-2xl">
          <FiPlus />
          {/* + */}
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
