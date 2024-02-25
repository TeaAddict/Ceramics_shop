"use client";
import { useAppSelector } from "@/redux/store";
import { formatToEuroCurrency } from "@/utils/helper";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import BackButton from "../shared/BackButton";
import MyCartTable from "./MyCartTable";
import CheckOutForm from "../form/CheckOutForm";
import OrderSummary from "./OrderSummary";

const ClientCart = ({ session }: { session: Session | null }) => {
  const [progress, setProgress] = useState(1);
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const orderTotal = useAppSelector((state) => state.cartReducer.orderTotal);
  const formatedOrderTotal = formatToEuroCurrency(orderTotal);

  if (cart.length === 0)
    return (
      <section className="padding-container flex flex-1 flex-col justify-center items-center gap-10">
        <p className="text-2xl">
          Your cart is currently empty. Begin shopping now!
        </p>
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
      {progress === 2 && (
        <CheckOutForm
          session={session}
          cart={cart}
          orderTotal={formatedOrderTotal}
        />
      )}
      <OrderSummary
        orderTotal={formatedOrderTotal}
        progress={progress}
        setProgress={setProgress}
      />
    </section>
  );
};

export default ClientCart;
