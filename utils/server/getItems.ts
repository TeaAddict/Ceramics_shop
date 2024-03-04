"use server";
import prisma from "@/lib/prisma";

export async function getItems() {
  return await prisma.item.findMany();
}
