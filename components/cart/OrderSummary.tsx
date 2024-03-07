import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import { stripeAction } from "@/utils/server/stripe/stripeAction";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

const OrderSummary = ({ orderTotal }: { orderTotal: string }) => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();

  async function onSubmit() {
    console.log("submitted form");
    const paymentLink = await stripeAction(cart);
    router.replace(paymentLink);
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
          <Button onClick={onSubmit} size={"lg"}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
