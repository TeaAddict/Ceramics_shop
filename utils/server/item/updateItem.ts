import prisma from "@/lib/prisma";
import { ParsedItem } from "@/lib/types";
import { Prisma } from "@prisma/client";

type pictureData = {
  name: string;
  width: number;
  height: number;
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

        pictures: {
          deleteMany: {},
          createMany: { data },
        },
      },
    });

    await prisma.item.update({
      data: { thumbnail: { connect: { name: parsed.thumbnailPicture } } },
      where: { id: item.id },
    });
  } catch (e: any) {
    let pictures: { pictures: string } = { pictures: "" };
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      if (e.code === "P2002") {
        pictures = {
          pictures: "Picture name is already in use, rename or change picture",
        };
      }
      //   return NextResponse.json({ errors: pictures });
      return { errors: pictures };
    }
  }
}
