import React from "react";
import QuantityPicker from "../shared/QuantityPicker";
import Image from "next/image";
import { capitalizeFirstLetter, formatToEuroCurrency } from "@/utils/helper";
import { Button } from "../ui/button";
import { removeItem } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  return (
    <div className="flex items-center">
      <div className="flex gap-2 items-center justify-evenly w-full">
        <div className="flex items-center">
          <div className="flex flex-col gap-3">
            <div>
              <p>{capitalizeFirstLetter(title)}</p>
              <p>{formatToEuroCurrency(price)}</p>
            </div>
            <QuantityPicker
              currentQuantity={quantity}
              orientation="horizontal"
              increaseFunc={handleIncrease}
              decreaseFunc={handleDecrease}
              id={id}
            />
          </div>
        </div>
        <div className="relative aspect-square w-28">
          <Image
            alt="cart_image"
            src={`/uploads/${thumbnailImage}`}
            fill
            sizes="(max-width: 500px) 100px"
            className="object-cover"
          />
        </div>

        <Button
          variant={"outline"}
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default MobileCartRow;
