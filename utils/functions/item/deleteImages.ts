import prisma from "@/lib/prisma";
import { deleteImageInStorage } from "./deleteImageInStorage";

export async function deleteImages(id: string) {
  const item = await prisma.item.findFirst({
    where: { id: id },
    include: { pictures: true },
  });

  item?.pictures.map((val) => {
    deleteImageInStorage(val.name);
  });
}
