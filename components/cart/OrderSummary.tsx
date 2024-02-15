import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";

const OrderSummary = ({
  orderTotal,
  progress,
  setProgress,
}: {
  orderTotal: string;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();

  function handleNext() {
    if (progress < 2) setProgress(progress + 1);
  }

  function handleBack() {
    if (progress > 1) setProgress(progress - 1);
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between font-semibold gap-5">
          <p className="">ORDER TOTAL</p>
          <p className="">{orderTotal}</p>
        </div>
        <div className="flex gap-10">
          <Button
            onClick={() => {
              dispatch(clearCart());
            }}
            variant={"secondary"}
            size={"lg"}
          >
            Clear cart
          </Button>

          {progress > 1 && (
            <Button size={"lg"} onClick={handleBack}>
              Back
            </Button>
          )}
          {progress < 2 && (
            <Button size={"lg"} onClick={handleNext}>
              Next
            </Button>
          )}
          {progress === 2 && (
            <Button form="check-out-form" size={"lg"}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
