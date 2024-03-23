import prisma from "@/lib/prisma";
import { OrdersType } from "@/prisma/prismaTypes";

export async function getOrders(): Promise<OrdersType[]> {
  try {
    const res = await prisma.order.findMany({
      include: {
        transaction: {
          include: {
            customerDetails: { include: { address: true } },
            soldItems: { include: { item: { include: { thumbnail: true } } } },
          },
        },
      },
    });

    return res;
  } catch (error) {
    console.log(`Problem getting orders: ${error}`);
    throw new Error(`Problem getting orders: ${error}`);
  }
}
