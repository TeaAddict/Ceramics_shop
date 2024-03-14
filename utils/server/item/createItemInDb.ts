import prisma from "@/lib/prisma";
import { ParsedItem } from "@/lib/types";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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
    const item = await prisma.item.create({
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
    const thumbnailInDb = await prisma.picture.findFirst({
      where: { name: parsed.thumbnailPicture },
    });

    if (thumbnailInDb) {
      await prisma.item.update({
        where: { id: item.id },
        data: { thumbnailId: thumbnailInDb.id },
      });
    } else {
      throw new Error("Did not found thumbnail image");
      // console.error("Did not found thumbnail image");
    }
  } catch (e: any) {
    console.log(`Problem creating item: ${e.message}`);
    let pictures = "";
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002")
        pictures = "Picture name is already in use, rename or change picture";

      return NextResponse.json({
        errors: { ...backendErrors, pictures: pictures },
      });
    }
  }
}
