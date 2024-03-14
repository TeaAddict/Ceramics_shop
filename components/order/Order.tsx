"use server";

import { TransactionFull } from "@/prisma/prismaTypes";
import { parseDate } from "@/utils/functions/parseDate";
import ProductTable, { Product } from "./ProductTable";
import { formatCentsToEuroCurrency } from "@/utils/helper";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = async ({
  params,
  data,
}: {
  params: { sessionId: string };
  data: TransactionFull;
}) => {
  const createdAtClean = parseDate(data.createdAt);
  const address = data.customerDetails.address;

  const cartItem: Product[] = data.soldItems.map((item) => {
    return {
      id: item.itemId,
      title: item.name,
      picture: item.item.thumbnail?.name!,
      quantity: item.quantity || 0,
      unitPrice: item.unitAmount,
      totalPrice: item.amountTotal,
    };
  });
  return (
    <div className="flex flex-col gap-7">
      <div>
        <p>Order id:</p>
        <p>{data.orderId}</p>
        <p>Order date:</p>
        <p>{createdAtClean}</p>
      </div>
      <div>
        <h3>Shipping information</h3>
        <div className="grid grid-cols-2">
          <p>Country:</p>
          <p>{address.country}</p>
          <p>State:</p>
          <p>{address.state}</p>
          <p>City:</p>
          <p>{address.city}</p>
          <p>Address:</p>
          <div>
            <p>{address.line1}</p>
            <p>{address.line2}</p>
          </div>
          <p>Postal code:</p>
          <p>{address.postal_code}</p>
        </div>
      </div>
      <div>
        <h3>Product</h3>
        <div>
          <ProductTable data={cartItem} />
        </div>
      </div>
      <div>
        <h3>Billing details</h3>
        <div className="grid grid-cols-2">
          <p>Amount:</p>
          <p>{formatCentsToEuroCurrency(data.amountTotal || 0)}</p>
          <p>Country:</p>
          <p>{address.country}</p>
          <p>State:</p>
          <p>{address.state}</p>
          <p>City:</p>
          <p>{address.city}</p>
          <p>Address:</p>
          <div>
            <p>{address.line1}</p>
            <p>{address.line2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
