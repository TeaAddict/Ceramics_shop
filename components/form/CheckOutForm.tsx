import React, { RefObject } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const CheckOutForm = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "", email: "", phone: "" },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
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
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Last name</p>
          <Input
            {...register("lastName")}
            id="lastName"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Email</p>
          <Input {...register("email")} id="email" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p>Phone</p>
          <Input {...register("phone")} id="phone" className="col-span-3" />
        </div>
      </div>
    </form>
  );
};

export default CheckOutForm;
