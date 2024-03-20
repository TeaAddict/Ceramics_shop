import React from "react";
import { getOrders } from "@/utils/server/order/getOrders";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";
import { useTranslation } from "@/app/i18n";
import OrdersTable from "./OrdersTable";
import { transformToTableOrder } from "@/utils/orderFunctions/transformToTableOrder";

const OrdersServer = async ({ lng }: { lng: string }) => {
  const ordersList = await getOrders();
  const orderTableData = transformToTableOrder(ordersList);
  const { t } = await useTranslation(lng, "admin");

  if (!ordersList.length)
    return <CustomReturnMessage text={t("outOfOrders")} backButton={false} />;
  return (
    <div>
      <OrdersTable data={orderTableData} lng={lng} />
    </div>
  );
};

export default OrdersServer;
