"use server";
import prisma from "@/lib/prisma";

export async function getItems() {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.log(`Problem getting items: ${error}`);
    throw new Error(`Problem getting items: ${error}`);
  }
}
