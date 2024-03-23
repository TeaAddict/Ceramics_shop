import prisma from "@/lib/prisma";

export async function getOldestItemDate() {
  try {
    const res = await prisma.item.findFirst({ orderBy: { createdAt: "asc" } });
    return res?.createdAt;
  } catch (error) {
    console.error(`Problem getting oldest item date: ${error}`);
    throw new Error(`Problem getting oldest item date: ${error}`);
  }
}
