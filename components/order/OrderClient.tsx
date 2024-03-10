"use server";
import Link from "next/link";
import { GoCheckCircle } from "react-icons/go";
import { Button } from "../ui/button";
import Order from "./Order";
import { ModalWindow } from "../shared/ModalWindow";

const OrderClient = async ({ params }: { params: { sessionId: string } }) => {
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
      <div className="flex gap-5">
        <ModalWindow
          buttonLabel="VIEW ORDER"
          variant={"secondary"}
          title="Order details"
        >
          <Order params={params} />
        </ModalWindow>
        <Link href={"/shop"}>
          <Button className="uppercase">Continue shoping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderClient;
