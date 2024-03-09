import React from "react";
import { getOrder } from "@/utils/server/order/getOrder";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = async ({ params }: { params: { session_id: string } }) => {
  const session = await stripe.checkout.sessions.retrieve(params.session_id);

  console.log(session, "SESSION");

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p>Order id:</p>
        <p>{session.id}</p>
        <p>Order date:</p>
        <p>[order date]</p>
      </div>
      <div>
        <h3>Shipping details</h3>
      </div>
      <div>
        <h3>Product</h3>
        <div>{/* <MyCartTable /> */}</div>
      </div>
      <div>
        <h3>Billing details</h3>
        <div className="grid grid-cols-2">
          <p>Billing Address</p>
          <p>[some address]</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Order;
