"use server";

import prisma from "@/lib/prisma";
import { TransactionFull } from "@/prisma/prismaTypes";

export async function getOrder(id: string) {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { sessionId: id },
      include: {
        customerDetails: { include: { address: true } },
        soldItems: { include: { item: { include: { thumbnail: true } } } },
        order: true,
      },
    });
    return transaction;
  } catch (error: any) {
    throw new Error("Problem getting order details", error.message);
  }
}
