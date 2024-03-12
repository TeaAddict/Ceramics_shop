"use server";
import Link from "next/link";
import { GoCheckCircle } from "react-icons/go";
import { Button } from "../ui/button";
import Order from "./Order";
import { ModalWindow } from "../shared/ModalWindow";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import LoadPage from "../shared/loadSpinner/LoadPage";
import { getSessionOrder } from "@/utils/server/order/getSessionOrder";

const OrderClient = async ({ params }: { params: { sessionId: string } }) => {
  const { data, error } = await getSessionOrder(params.sessionId);

  if (error) {
    return <CustomReturnMessage text={error} />;
  } else {
    if (!data) return <LoadPage />;
  }
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-10">
      <div className="text-primary">
        <GoCheckCircle size={80} />
      </div>
      <div>
        <p className="text-3xl font-semibold">Thank you for your purchase!</p>
        <p className="text-md font-semibold">
          We will be sending you an email with details shortly
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <ModalWindow
          buttonLabel="VIEW ORDER"
          variant={"secondary"}
          title="Order details"
        >
          <Order params={params} data={data} />
        </ModalWindow>
        <Link href={"/shop"}>
          <Button className="uppercase">Continue shoping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderClient;
