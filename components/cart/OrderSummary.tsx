import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import { stripeAction } from "@/utils/server/stripe/stripeAction";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const OrderSummary = ({
  orderTotal,
  lng,
}: {
  orderTotal: string;
  lng: string;
}) => {
  const { t } = useTranslation(lng, "cart");
  const router = useRouter();
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();

  async function onSubmit() {
    console.log(cart, "CART");
    const paymentLink = await stripeAction(cart);
    console.log(paymentLink, "paymentlink");
    router.replace(paymentLink);
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between font-semibold gap-5">
          <p className="">{t("orderTotal")}</p>
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
            {t("clearCart")}
          </Button>
          <Button onClick={onSubmit} size={"lg"}>
            {t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
