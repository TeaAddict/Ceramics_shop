"use server";
import prisma from "@/lib/prisma";
import { DeliveryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateStatus(id: string, val: DeliveryStatus) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status: val },
    });
    revalidatePath("/admin/");
  } catch (error: any) {
    console.error(`Problem updating order status: ${error.message}`);
    throw new Error(`Problem updating order status: ${error.message}`);
  }
}
