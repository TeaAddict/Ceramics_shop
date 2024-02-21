import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "@/redux/features/cartSlice";
import PcCartTable from "./PcCartTable";
import MobileCartTable from "./MobileCartTable";

export type CartItem = {
  id: string;
  title: string;
  picture: string;
  stock: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const MyCartTable = ({ data }: { data: CartItem[] }) => {
  const dispatch = useDispatch();

  function handleIncrease(id: string) {
    dispatch(increaseQuantity(id));
  }
  function handleDecrease(id: string) {
    dispatch(decreaseQuantity(id));
  }

  return (
    <div>
      <div className="hidden md:block">
        <PcCartTable
          data={data}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      </div>
      <div className="md:hidden">
        <MobileCartTable
          data={data}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      </div>
    </div>
  );
};

export default MyCartTable;
