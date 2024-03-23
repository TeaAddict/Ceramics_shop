import prisma from "@/lib/prisma";
import { PaymentData } from "@/utils/types/stripe";

export async function updateCustomer(
  paymentData: PaymentData,
  customerId: string
) {
  try {
    await prisma.customer.update({
      data: {
        phone: paymentData.customerDetails?.phone,
        address: {
          update: paymentData.customerDetails?.address ?? "",
        },
        transactions: {
          create: {
            paymentStatus: paymentData.paymentStatus,
            status: paymentData.status,
            currency: paymentData.currency,
            amountSubtotal: paymentData.amountSubtotal,
            amountTotal: paymentData.amountTotal,
            sessionId: paymentData.sessionId,
            soldItems: { createMany: { data: paymentData.soldItems } },
            order: {
              create: {
                status: "SHIPPING",
                expiresAt: new Date(new Date().getTime() + 30 * 60 * 1000),
              },
            },
          },
        },
      },
      where: { id: customerId },
    });
  } catch (error) {
    console.log(
      `Problem updating customer: ${paymentData.customerDetails?.email}`,
      error
    );
    throw new Error(`Problem updating customer: ${error}`);
  }
}
