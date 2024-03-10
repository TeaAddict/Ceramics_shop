"use server";

import React from "react";
import { getOrder } from "@/utils/server/order/getOrder";
import MyCartTable from "../cart/MyCartTable";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = async ({ params }: { params: { sessionId: string } }) => {
  // const session = await stripe.checkout.sessions.retrieve(params.session_id);

  // console.log(session, "SESSION");
  console.log(params.sessionId);
  const res = await getOrder(params.sessionId);
  console.log(res);

  return (
    <div className="flex flex-col gap-7 bg-red-800">
      <div>
        <p>Order id:</p>
        {/* <p>{session.id}</p> */}
        <p>Order date:</p>
        <p>[order date]</p>
      </div>
      <div>
        <h3>Shipping information</h3>
        <p>Shipping Address:</p>
        <p>[state]</p>
        <p>[country]</p>
        <p>[street]</p>
        <p>[zip code]</p>
      </div>
      <div>
        <h3>Product</h3>
        <div>{/* <MyCartTable data={} /> */}</div>
      </div>
      <div>
        <h3>Billing details</h3>
        <div className="flex justify-between">
          <div>
            <p>Billing Address</p>
            <p>[state]</p>
            <p>[country]</p>
            <p>[street]</p>
            <p>[zip code]</p>
            <p>[email]</p>
          </div>

          <div>
            <p>Billing method</p>
            <p>[credit card]</p>
            <p>Amount</p>
            <p>[$amount]</p>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Order;
