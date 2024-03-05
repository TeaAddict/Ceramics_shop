import prisma from "@/lib/prisma";
import { PaymentData } from "@/utils/types/stripe";

export async function updateCustomer(
  paymentData: PaymentData,
  customerId: string
) {
  try {
    await prisma.customer.update({
      data: {
        // name: paymentData.customerDetails?.name!,
        // email: paymentData.customerDetails?.email,
        phone: paymentData.customerDetails?.phone,
        address: {
          update: {
            city: paymentData.customerDetails?.address?.city,
            country: paymentData.customerDetails?.address?.country,
            line1: paymentData.customerDetails?.address?.line1,
            line2: paymentData.customerDetails?.address?.line2,
            postal_code: paymentData.customerDetails?.address?.postal_code,
            state: paymentData.customerDetails?.address?.state,
          },
        },
        transactions: {
          create: {
            paymentStatus: paymentData.paymentStatus,
            status: paymentData.status,
            currency: paymentData.currency,
            amountSubtotal: paymentData.amountSubtotal,
            amountTotal: paymentData.amountTotal,
            soldItems: { createMany: { data: paymentData.soldItems } },
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
  }
}
