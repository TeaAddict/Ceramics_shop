import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ParsedItem } from "@/lib/types";
import { parsePictureData } from "@/utils/myFunctions";
import { writeFile } from "fs/promises";
import { join } from "path";
import { Prisma } from "@prisma/client";
import { deleteFile, parseFormData, writeFiles } from "../myFunctions";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log(data);
  const pic = data.getAll("picture0");
  console.log(pic);

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const id = request.url.split("item/")[1];
  const data: FormData = await request.formData();

  // formData is messy so we parse it into usable object
  const parsed = parseFormData(data);
  const pictureData = parsePictureData(parsed);

  // check which images need uploading which deleting
  const oldPictures = await prisma.picture.findMany({ where: { itemId: id } });
  const oldPictureNames = oldPictures.map((pic) => pic.name);
  const newPictureNames = pictureData.map((pic) => pic.name);
  const picturesNeedDeleting = oldPictureNames.filter(
    (str) => !newPictureNames.includes(str)
  );
  const picturesNeedUploading = newPictureNames.filter(
    (str) => !oldPictureNames.includes(str)
  );

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
        pictures: { deleteMany: {}, createMany: { data: pictureData } },
      },
    });

    const thumbnailInDb = await prisma.picture.findFirst({
      where: { name: parsed.thumbnailPicture },
    });
    await prisma.item.update({
      where: { id: item.id },
      data: { thumbnailId: thumbnailInDb!.id },
    });
  } catch (e: any) {
    let customError: { customError: string } = { customError: "" };
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        customError = {
          customError:
            "Picture name is already in use, rename or change picture",
        };
      }
      return NextResponse.json({ errors: customError });
    }
  }

  // Delete old images and save new ones in servers local storage
  // delete then upload images
  picturesNeedDeleting.forEach((picture) => deleteFile(picture));
  const filesToSave = parsed.pictures
    .filter((picture) => {
      if (picturesNeedUploading.includes(picture.picture.name)) return picture;
    })
    .map((el) => el.picture);
  if (filesToSave !== undefined) writeFiles(filesToSave, "/public/uploads");

  return NextResponse.json({ success: true });
}
