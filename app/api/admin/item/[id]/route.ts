import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parsePictureData } from "@/utils/myFunctions";
import { Prisma } from "@prisma/client";
import { parseFormData, updatePictures } from "../myFunctions";
import { deleteImages } from "@/utils/functions/item/deleteImages";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const pic = data.getAll("picture0");

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data: FormData = await request.formData();

  // formData is messy so we parse it into usable object
  const parsed = parseFormData(data);
  const pictureData = parsePictureData(parsed);

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
          createMany: { data: pictureData },
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
      return NextResponse.json({ errors: pictures });
    }
  }

  // delete old pictures and update new
  updatePictures(id, pictureData, parsed);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    deleteImages(params.id);
    await prisma.picture.deleteMany({ where: { itemId: params.id } });
    await prisma.item.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Problem deleting item" },
      { status: 500 }
    );
  }
}
