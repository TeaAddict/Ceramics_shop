import React from "react";
import OrdersClient from "./OrdersClient";
import { getOrders } from "@/utils/server/order/getOrders";

const OrdersServer = async () => {
  const ordersList = await getOrders();
  return (
    <div>
      <OrdersClient ordersList={ordersList} />
    </div>
  );
};

export default OrdersServer;
