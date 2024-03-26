"use server";
import prisma from "@/lib/prisma";

export async function updatePicUrl(
  picUrls: { name: string; key: string; url: string }[]
) {
  try {
    await Promise.all(
      picUrls.map(async (pic) => {
        await prisma.picture.update({
          where: { name: pic.name },
          data: { url: pic.url, key: pic.key },
        });
      })
    );
  } catch (error: any) {
    console.log(`Problem adding url to image: ${error.message}`);
    throw new Error(`Problem adding url to image: ${error}`);
  }
}
