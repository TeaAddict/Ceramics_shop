import { TableOrder } from "@/components/admin/orders/OrdersTable";
import { OrdersType } from "@/prisma/prismaTypes";

export function transformToTableOrder(data: OrdersType[]): TableOrder[] {
  const res = data.map((order) => {
    return {
      id: order.id,
      firstName: order.transaction?.customerDetails.firstname || "",
      lastName: order.transaction?.customerDetails.lastname || "",
      email: order.transaction?.customerDetails.email || "",
      phone: order.transaction?.customerDetails.phone || "",
      status: order.status,
      createdAt: order.createdAt,
      expiresAt: order.expiresAt,
      soldItems: order.transaction?.soldItems || [],
      amountTotal: order.transaction?.amountTotal || 0,
    };
  });

  return res;
}
