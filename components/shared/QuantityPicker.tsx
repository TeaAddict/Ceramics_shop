"use client";

import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityPicker = ({
  currentQuantity,
  increaseFunc,
  decreaseFunc,
  orientation = "horizontal",
  id,
}: {
  currentQuantity?: number;
  increaseFunc: Function;
  decreaseFunc: Function;
  orientation?: "horizontal" | "vertical";
  id?: string;
}) => {
  return (
    <div className="flex">
      <div
        className={`grid ${
          orientation === "horizontal" ? "grid-cols-3" : "grid-rows-3"
        } items-center justify-between border-2 rounded-md`}
      >
        <button
          onClick={() => decreaseFunc(id)}
          className={`${
            orientation === "vertical" && "order-3"
          } text-2xl p-2 hover:bg-accent transition-all duration-200`}
        >
          <FiMinus />
        </button>

        <p
          className={`${
            orientation === "vertical" && "order-2"
          } text-md text-center  p-2`}
        >
          {currentQuantity ?? 0}
        </p>

        <button
          onClick={() => increaseFunc(id)}
          className={`${
            orientation === "vertical" && "order-1"
          } text-2xl p-2 hover:bg-accent transition-all duration-200`}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
