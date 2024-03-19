"use client";
import { useAppSelector } from "@/redux/store";
import { formatToEuroCurrency } from "@/utils/helper";
import Link from "next/link";
import { Button } from "../ui/button";
import BackButton from "../shared/BackButton";
import MyCartTable from "./MyCartTable";
import OrderSummary from "./OrderSummary";
import { useTranslation } from "@/app/i18n/client";
import CustomReturnMessage from "../shared/CustomReturnMessage";

const ClientCart = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "cart");
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const orderTotal = useAppSelector((state) => state.cartReducer.orderTotal);
  const formatedOrderTotal = formatToEuroCurrency(orderTotal);

  if (cart.length === 0)
    return (
      <CustomReturnMessage text={t("emptyCart")} backButton={false}>
        <Link href="/shop">
          <Button>{t("emptyCartBtn")}</Button>
        </Link>
      </CustomReturnMessage>
    );

  return (
    <section className="padding-container flex-col gap-10 my-10">
      <BackButton />
      <MyCartTable data={cart} />

      <OrderSummary orderTotal={formatedOrderTotal} lng={lng} />
    </section>
  );
};

export default ClientCart;
