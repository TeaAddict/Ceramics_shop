import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/redux/features/cartSlice";
import QuantityPicker from "../shared/QuantityPicker";
import { formatToEuroCurrency } from "@/utils/helper";

const MyCartTable = ({
  data,
}: {
  data: {
    id: string;
    title: string;
    picture: string;
    stock: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}) => {
  const dispatch = useDispatch();

  function handleIncrease(id: string) {
    dispatch(increaseQuantity(id));
  }
  function handleDecrease(id: string) {
    dispatch(decreaseQuantity(id));
  }

  return (
    <table className="w-full flex flex-col gap-10">
      <thead>
        <tr className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.2fr] justify-start">
          <th className="justify-start flex">PRODUCT</th>
          <th className="justify-start flex">PICTURE</th>
          <th className="justify-start flex">UNIT PRICE</th>
          <th className="justify-start flex">QUANTITY</th>
          <th className="justify-start flex">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.2fr] items-center h-full border-t-2"
            key={index}
          >
            <td className="h-full flex items-center">{row.title}</td>
            <td className="aspect-square h-40 my-2 relative">
              <Image
                alt=""
                src={row.picture}
                className="object-cover"
                fill
                sizes="30vw"
              />
            </td>
            <td>{formatToEuroCurrency(row.unitPrice)}</td>
            <td>
              <QuantityPicker
                decreaseFunc={() => handleDecrease(row.id)}
                increaseFunc={() => handleIncrease(row.id)}
                currentQuantity={row.quantity}
              />
            </td>
            <td>{formatToEuroCurrency(row.totalPrice)}</td>
            <td>
              <Button
                variant={"outline"}
                onClick={() => {
                  dispatch(removeItem(row.id));
                }}
              >
                X
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyCartTable;
