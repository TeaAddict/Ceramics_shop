"use client";
import { useAppSelector } from "@/redux/store";
import { formatToEuroCurrency } from "@/utils/helper";
import Link from "next/link";
import { Button } from "../ui/button";
import BackButton from "../shared/BackButton";
import MyCartTable from "./MyCartTable";
import OrderSummary from "./OrderSummary";
import { useWebhookStatus } from "@/hooks/payment/useWebhookStatus";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { Contacts } from "@prisma/client";

const ClientCart = ({ contacts }: { contacts: Contacts }) => {
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const orderTotal = useAppSelector((state) => state.cartReducer.orderTotal);
  const formatedOrderTotal = formatToEuroCurrency(orderTotal);
  const webhookStatus = useWebhookStatus();

  if (webhookStatus)
    return (
      <CustomReturnMessage>
        Our online payment system is temporarily unavailable. For orders, please
        contact us by phone: {contacts.phone} or at {contacts.email} also you
        can visit our physical location {contacts.physicalLocation}. We
        appreciate your understanding and apologize for any inconvenience.
      </CustomReturnMessage>
    );
  if (cart.length === 0)
    return (
      <section className="padding-container flex-col justify-center items-center gap-10">
        <p className="text-2xl font-semibold">
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
    <section className="padding-container flex-col gap-10 my-10">
      <BackButton />
      <MyCartTable data={cart} />

      <OrderSummary orderTotal={formatedOrderTotal} />
    </section>
  );
};

export default ClientCart;
