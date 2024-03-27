import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parsePictureData } from "@/utils/myFunctions";
import {
  parseFormData,
  whatToSaveDelete,
} from "@/utils/functions/admin/myFunctions";
import { deleteImages } from "@/utils/functions/item/deleteImages";
import { updateItem } from "@/utils/server/item/updateItem";
import { isPicUrl } from "@/utils/server/item/isPicUrl";
import { uploadImagesToUploadthing } from "@/utils/functions/admin/uploadImagesToUploadthing";
import { deleteFromUT } from "@/utils/functions/admin/deleteFromUT";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data: FormData = await request.formData();
    const isUrl = isPicUrl(data);

    // formData is messy so we parse it into usable object
    const parsed = parseFormData(data);
    const pictureData = parsePictureData(parsed);

    // // delete old pictures and upload new in uploadthing
    let picturesToSaveMain: File[] = [];
    let picturesToDeleteMain: string[] = [];
    if (!isUrl) {
      const { picturesToSave, picturesToDelete } = await whatToSaveDelete(
        id,
        pictureData,
        parsed
      );
      picturesToSaveMain = picturesToSave;
      picturesToDeleteMain = picturesToDelete;
    }

    // update item and image data in db
    updateItem(id, parsed, pictureData);

    if (!isUrl) {
      await uploadImagesToUploadthing(picturesToSaveMain);
      await deleteFromUT(picturesToDeleteMain);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Problem updating item: ${error}`);
    return NextResponse.json({ error: error }, { status: 500 });
  }
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
    console.log(`Problem deleting item: ${error}`);
    return NextResponse.json(
      { error: "Problem deleting item" },
      { status: 500 }
    );
  }
}
