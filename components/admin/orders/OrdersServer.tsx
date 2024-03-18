import React from "react";
import OrdersClient from "./OrdersClient";
import { getOrders } from "@/utils/server/order/getOrders";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";

const OrdersServer = async () => {
  const ordersList = await getOrders();

  if (!ordersList.length)
    return (
      <CustomReturnMessage text="Currently no orders" backButton={false} />
    );
  return (
    <div>
      <OrdersClient ordersList={ordersList} />
    </div>
  );
};

export default OrdersServer;
