"use server";
import prisma from "@/lib/prisma";
import { PaymentData } from "@/utils/types/stripe";
import { decrementItemStock } from "./decrementItemStock";
import { updateCustomer } from "./updateCustomer";
import { createCustomer } from "./createCustomer";

export async function updateDb(paymentData: PaymentData) {
  try {
    if (!paymentData.customerDetails?.email)
      throw new Error("Need email to update db.");

    const customer = await prisma.customer.findFirst({
      where: { email: paymentData.customerDetails?.email },
    });

    if (!customer) {
      await createCustomer(paymentData);
    } else {
      await updateCustomer(paymentData, customer.id);
    }

    await decrementItemStock(paymentData.soldItems);
  } catch (error) {
    console.log("Error in database", error);
  }
}
