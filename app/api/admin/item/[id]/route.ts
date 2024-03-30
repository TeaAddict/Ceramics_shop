import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parsePictureData } from "@/utils/myFunctions";
import {
  parseFormData,
  whatToSaveDeleteLeave,
} from "@/utils/functions/admin/myFunctions";
import { updateItem } from "@/utils/server/item/updateItem";
import { isPicUrl } from "@/utils/server/item/isPicUrl";
import { uploadImagesToUploadthing } from "@/utils/functions/admin/uploadImagesToUploadthing";
import { utapi } from "@/utils/uploadthing";
import { getPicKeys } from "@/utils/functions/item/getPicKeys";

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

    // delete old pictures and upload new in uploadthing
    let picturesToSaveMain: File[] = [];
    let picturesToDeleteMain: string[] = [];
    let picturesToLeaveMain: string[] = [];
    if (!isUrl) {
      const { picturesToSave, picturesToDeleteKeys, picturesToLeave } =
        await whatToSaveDeleteLeave(id, pictureData, parsed);
      picturesToSaveMain = picturesToSave;
      picturesToDeleteMain = picturesToDeleteKeys;
      picturesToLeaveMain = picturesToLeave;
    }

    // update item and image data in db
    const picListToUpdate = pictureData
      .map((picObj) => {
        if (!picturesToLeaveMain.some((picName) => picName === picObj.name))
          return picObj;
      })
      .filter((val) => typeof val !== "undefined");

    const errors = await updateItem(
      id,
      parsed,
      picListToUpdate,
      picturesToDeleteMain
    );

    if (!isUrl && !errors) {
      await uploadImagesToUploadthing(picturesToSaveMain);
      await utapi.deleteFiles(picturesToDeleteMain);
    }

    return NextResponse.json(
      Object.keys(errors ?? {}).length ? { errors: errors } : { success: true },
      Object.keys(errors ?? {}).length ? { status: 500 } : { status: 200 }
    );
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
    // delete old files from uploadthing
    const keys = await getPicKeys(params.id);
    utapi.deleteFiles(keys);

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
