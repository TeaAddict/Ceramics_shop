"use server";
import prisma from "@/lib/prisma";

export async function getItem(id: string) {
  const data = await prisma.item.findFirst({
    where: { id: id },
    include: { favouritedByUsers: true, pictures: true, thumbnail: true },
  });

  return data;
}
