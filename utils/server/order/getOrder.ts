"use server";

import prisma from "@/lib/prisma";

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
    console.error("Problem getting order details", error.message);
  }
}
