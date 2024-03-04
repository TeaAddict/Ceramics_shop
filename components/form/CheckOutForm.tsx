import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Session } from "next-auth";
import { Cart, TOrderSchema, orderSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { stripeAction } from "@/utils/server/stripeAction";
import { useRouter } from "next/navigation";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const CheckOutForm = ({
  session,
  cart,
  orderTotal,
}: {
  session: Session | null;
  cart: Cart;
  orderTotal: string;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      firstName: session?.user?.name ?? "",
      lastName: "qweqwe",
      email: session?.user?.email ?? "",
      phone: "4213123123123",
      address: "qweqweqwe",
      cart: cart,
      orderTotal: orderTotal,
    },
  });

  async function onSubmit(data: TOrderSchema) {
    console.log("submitted form");
    const paymentLink = await stripeAction(data);
    router.replace(paymentLink);
  }

  return (
    <form
      id="check-out-form"
      className="flex justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-6 pt-4 w-96">
        <div className="grid grid-cols-4 items-center gap-4">
          <p>First name</p>
          <Input
            {...register("firstName")}
            id="firstName"
            className="col-span-3"
          />
          {errors.firstName && (
            <p className="text-destructive col-span-4">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Last name</p>
          <Input
            {...register("lastName")}
            id="lastName"
            className="col-span-3"
          />
          {errors.lastName && (
            <p className="text-destructive col-span-4">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Email</p>
          <Input {...register("email")} id="email" className="col-span-3" />
          {errors.email && (
            <p className="text-destructive col-span-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Phone</p>
          <Input {...register("phone")} id="phone" className="col-span-3" />
          {errors.phone && (
            <p className="text-destructive col-span-4">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Address</p>
          <Input {...register("address")} id="address" className="col-span-3" />
          {errors.address && (
            <p className="text-destructive col-span-4">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default CheckOutForm;
