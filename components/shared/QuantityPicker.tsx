"use client";

import { MouseEventHandler } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityPicker = ({
  currentQuantity,
  increaseFunc,
  decreaseFunc,
}: {
  currentQuantity: number;
  increaseFunc: MouseEventHandler<HTMLButtonElement>;
  decreaseFunc: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="inline-block">
      <div className="grid grid-cols-3 items-center justify-between border-2 rounded-md">
        <button
          onClick={decreaseFunc}
          className="text-2xl p-2 hover:bg-accent transition-all duration-200"
        >
          <FiMinus />
        </button>
        <p className="text-md text-center  p-2">{currentQuantity}</p>

        <button
          onClick={increaseFunc}
          className="text-2xl p-2 hover:bg-accent transition-all duration-200"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
