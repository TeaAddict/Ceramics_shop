"use server";
import prisma from "@/lib/prisma";
import { ItemWithPicThumb } from "@/prisma/prismaTypes";

export async function getItem(id: string): Promise<ItemWithPicThumb | null> {
  try {
    const data = await prisma.item.findFirst({
      where: { id: id },
      include: { pictures: true, thumbnail: true },
    });
    if (!data) throw new Error("Problem getting data");
    return data;
  } catch (error: any) {
    console.error(`Problem getting item data: ${error.message}`);
    throw new Error(`Problem getting item: ${error}`);
  }
}
