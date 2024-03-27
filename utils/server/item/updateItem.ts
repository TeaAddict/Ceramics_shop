import prisma from "@/lib/prisma";
import { ParsedItem } from "@/lib/types";
import { Prisma } from "@prisma/client";

type pictureData = {
  name: string | undefined;
  width: number | undefined;
  height: number | undefined;
}[];

export async function updateItem(
  id: string,
  parsed: ParsedItem,
  data: pictureData
) {
  // update data in db
  try {
    const item = await prisma.item.update({
      where: { id: id },
      data: {
        title: parsed.title,
        price: parsed.price,
        stock: parsed.stock,
        category: parsed.category,
        description: parsed.description,

        pictures: data[0].name
          ? {
              deleteMany: {},
              createMany: {
                data: data.map(({ name, width, height }) => ({
                  name: name!,
                  width: width!,
                  height: height!,
                })),
              },
            }
          : {},
      },
    });

    if (data[0].name) {
      await prisma.item.update({
        data: { thumbnail: { connect: { name: parsed.thumbnailPicture } } },
        where: { id: item.id },
      });
    } else {
      const pic = await prisma.picture.findFirst({
        where: { url: parsed.thumbnailPicture },
      });
      if (pic)
        await prisma.item.update({
          data: { thumbnail: { connect: { name: pic.name } } },
          where: { id: item.id },
        });
    }
  } catch (e: any) {
    console.log(`Problem updating item: ${e}`);
    let pictures: { pictures: string } = { pictures: "" };
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      if (e.code === "P2002") {
        pictures = {
          pictures: "Picture name is already in use, rename or change picture",
        };
      }
      return { errors: pictures };
    }
  }
}
