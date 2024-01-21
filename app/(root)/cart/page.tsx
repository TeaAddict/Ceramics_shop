"use client";

import React from "react";
import { useAppSelector } from "@/redux/store";
import { TEST_MERCHANDISE2 } from "@/constants";
import { ProgressBar } from "@/components/cart/ProgressBar";
import { CartTable } from "@/components/cart/CartTable";
import MyCartTable from "@/components/cart/MyCartTable";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import Link from "next/link";
import { formatToEuroCurrency } from "@/utils/helper";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const orderTotal = formatToEuroCurrency(
    cart.reduce((acc, item) => item.totalPrice + acc, 0)
  );

  if (cart.length === 0)
    return (
      <section className="padding-container flex flex-col justify-center text-2xl items-center gap-10">
        <p>Your cart is currently empty. Begin shopping now!</p>
        <div>
          <Link href="/shop">
            <Button>Start shopping!</Button>
          </Link>
        </div>
      </section>
    );

  return (
    <section className="padding-container flex flex-col gap-10 my-10">
      {/* <div className="justify-center flex">
        <ProgressBar />
      </div> */}
      <div className="space-y-10">
        {/* <h1 className="text-2xl font-semibold">Cart</h1> */}
        <MyCartTable data={cart} />
      </div>
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
            <Button size={"lg"}>Next</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
