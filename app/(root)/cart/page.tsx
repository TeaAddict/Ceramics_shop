"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";
import MyCartTable from "@/components/cart/MyCartTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatToEuroCurrency } from "@/utils/helper";
import BackButton from "@/components/shared/BackButton";
import OrderSummary from "@/components/cart/OrderSummary";
import CheckOutForm from "@/components/form/CheckOutForm";

const CartPage = () => {
  const [progress, setProgress] = useState(1);
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
      <BackButton />
      {progress === 1 && <MyCartTable data={cart} />}
      {progress === 2 && <CheckOutForm />}
      <OrderSummary
        orderTotal={orderTotal}
        progress={progress}
        setProgress={setProgress}
      />
    </section>
  );
};

export default CartPage;
