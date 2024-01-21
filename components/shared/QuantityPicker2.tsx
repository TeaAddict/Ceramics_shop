"use client";

import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityPicker = ({
  quantity,
  setQuantity,
  stock,
}: {
  quantity: number;
  setQuantity: Function;
  stock: number;
}) => {
  function handleIncrease() {
    if (quantity < stock) setQuantity((quantity: number) => quantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) setQuantity((quantity: number) => quantity - 1);
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
