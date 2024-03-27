import prisma from "@/lib/prisma";
import { deleteImageInStorage } from "./deleteImageInStorage";

// TODO: delete cause we dont use local storage
export async function deleteImages(id: string) {
  try {
    const item = await prisma.item.findFirst({
      where: { id: id },
      include: { pictures: true },
    });

    item?.pictures.map((val) => {
      deleteImageInStorage(val.name);
    });
  } catch (error) {
    console.log(`Problem deleting images: ${error}`);
    throw new Error(`Problem deleting images: ${error}`);
  }
}
