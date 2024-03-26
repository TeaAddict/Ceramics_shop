import prisma from "@/lib/prisma";
import { ParsedItem } from "@/lib/types";
import { Prisma } from "@prisma/client";
import { createErrorList } from "./createErrorList";

type PictureData = {
  name: string;
  width: number;
  height: number;
}[];

export async function createItemInDb(
  parsed: ParsedItem,
  pictureData: PictureData,
  backendErrors: {}
) {
  try {
    let item;
    try {
      item = await prisma.item.create({
        data: {
          title: parsed.title,
          price: parsed.price,
          stock: parsed.stock,
          category: parsed.category,
          description: parsed.description,
          pictures: {
            createMany: {
              data: pictureData,
            },
          },
        },
      });
    } catch (error: any) {
      console.error(`Error with title of picture: ${error}`);
      const errors = createErrorList(error, backendErrors);
      backendErrors = { ...errors, ...backendErrors };
      return { backendErrors };
    }

    const thumbnailInDb = await prisma.picture.findFirst({
      where: { name: parsed.thumbnailPicture },
    });
    if (thumbnailInDb && item) {
      await prisma.item.update({
        where: { id: item.id },
        data: { thumbnailId: thumbnailInDb.id },
      });
    } else {
      backendErrors = {
        ...backendErrors,
        pictures: "Did not found thumbnail image",
      };
    }
    return { id: item.id, backendErrors };
  } catch (e: any) {
    console.log(`Problem creating item: ${e}`);
    let pictures = "";
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002")
        pictures = "Picture name is already in use, rename or change picture";

      return { ...backendErrors, pictures: pictures };
    }
    return { backendErrors };
  }
}
