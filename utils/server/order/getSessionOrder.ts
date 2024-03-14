"use server";

import prisma from "@/lib/prisma";
import { getOrder } from "./getOrder";
import { TransactionFull } from "@/prisma/prismaTypes";

interface SessionOrderResult {
  data?: TransactionFull;
  error?: string;
}

export async function getSessionOrder(
  sessionId: string
): Promise<SessionOrderResult> {
  try {
    const expiresAtDate = await prisma.transaction.findFirst({
      where: { sessionId: sessionId },
      select: { order: { select: { expiresAt: true } } },
    });
    if (!expiresAtDate) {
      console.log("Order not found for sessionId:", sessionId);
      return { error: "Order not found" };
    }

    const currentDateValue = new Date().getTime();
    const expiresAtValue = expiresAtDate.order.expiresAt.getTime();
    if (expiresAtValue < currentDateValue) {
      console.log("Session is expired");
      return {
        error:
          "Session expired, check email for information about your purchase",
      };
    }

    const order = await getOrder(sessionId);
    if (!order) {
      console.log("Order not found for sessionid:", sessionId);
      return { error: "Order not found" };
    }
    return { data: order };
  } catch (error: any) {
    console.error(`Problem getting order data: ${error.message}`);
    throw new Error(`Problem getting order data: ${error.message}`);
  }
}
