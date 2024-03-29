"use server";
import prisma from "@/lib/prisma";

export async function getItems(id: string[]) {
  try {
    const res = await Promise.all(
      id.map(async (val) => {
        return await prisma.item.findFirst({ where: { id: val } });
      })
    );
    return res;
  } catch (error) {
    console.log(`Problem getting items: ${error}`);
    throw new Error(`Problem getting items: ${error}`);
  }
}
