import prisma from "@/lib/prisma";
import { ParsedItem } from "@/lib/types";
import { Prisma } from "@prisma/client";

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
      if (error.meta.target === "Item_title_key")
        backendErrors = {
          ...backendErrors,
          title: "Title already exists",
        };
      if (error.meta.target === "Picture_name_key")
        backendErrors = {
          ...backendErrors,
          pictures: "Image with this name already exists",
        };
      return backendErrors;
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
    return backendErrors;
  } catch (e: any) {
    console.log(`Problem creating item: ${e}`);
    let pictures = "";
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002")
        pictures = "Picture name is already in use, rename or change picture";

      return { ...backendErrors, pictures: pictures };
    }
    return backendErrors;
  }
}
