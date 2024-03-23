import prisma from "@/lib/prisma";
import { PaymentData } from "@/utils/types/stripe";

export async function createCustomer(paymentData: PaymentData) {
  try {
    const firstLastName = paymentData.customerDetails?.name?.split(" ");

    await prisma.customer.create({
      data: {
        firstname: firstLastName![0],
        lastname: firstLastName![1],
        email: paymentData.customerDetails?.email!,
        phone: paymentData.customerDetails?.phone,
        address: {
          create: paymentData.customerDetails?.address!,
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
    });
  } catch (error) {
    console.log(
      `Problem creating customer: ${paymentData.customerDetails?.email}`,
      error
    );
    throw new Error(`Problem creating customer: ${error}`);
  }
}
