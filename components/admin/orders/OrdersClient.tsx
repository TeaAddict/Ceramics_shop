import React from "react";
import OrdersTable from "./OrdersTable";
import { OrdersType } from "@/prisma/prismaTypes";
import { transformToTableOrder } from "@/utils/orderFunctions/transformToTableOrder";

const OrdersClient = ({ ordersList }: { ordersList: OrdersType[] }) => {
  const orderTableData = transformToTableOrder(ordersList);

  return (
    <div>
      <OrdersTable data={orderTableData} />
    </div>
  );
};

export default OrdersClient;
