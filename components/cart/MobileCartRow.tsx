import React, { MouseEventHandler } from "react";
import QuantityPicker from "../shared/QuantityPicker";
import Image from "next/image";
import { capitalizeFirstLetter, formatToEuroCurrency } from "@/utils/helper";

const MobileCartRow = ({
  id,
  title,
  price,
  thumbnailImage,
  quantity,
  handleIncrease,
  handleDecrease,
}: {
  id: string;
  title: string;
  price: number;
  thumbnailImage: string;
  quantity: number;
  handleIncrease: Function;
  handleDecrease: Function;
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex items-center">
        <QuantityPicker
          currentQuantity={quantity}
          orientation="vertical"
          increaseFunc={handleIncrease}
          decreaseFunc={handleDecrease}
          id={id}
        />
      </div>
      <div className="relative aspect-square w-28">
        <Image
          alt=""
          src={`/uploads/${thumbnailImage}`}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p>{capitalizeFirstLetter(title)}</p>
        <p>{formatToEuroCurrency(price)}</p>
      </div>
    </div>
  );
};

export default MobileCartRow;
