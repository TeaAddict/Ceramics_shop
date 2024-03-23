import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parsePictureData } from "@/utils/myFunctions";
import {
  parseFormData,
  updatePictures,
} from "../../../../../utils/functions/admin/myFunctions";
import { deleteImages } from "@/utils/functions/item/deleteImages";
import { updateItem } from "@/utils/server/item/updateItem";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data: FormData = await request.formData();

  // formData is messy so we parse it into usable object
  const parsed = parseFormData(data);
  const pictureData = parsePictureData(parsed);

  // update item and image data in db
  updateItem(id, parsed, pictureData);

  // delete old pictures and update new in local server
  updatePictures(id, pictureData, parsed);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
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
