import { productSchemaServer } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { parsePictureData } from "@/utils/myFunctions";
import { parseFormData } from "../../../../utils/functions/admin/myFunctions";
import { createItemInDb } from "@/utils/server/item/createItemInDb";
import { uploadImagesToUploadthing } from "@/utils/functions/admin/uploadImagesToUploadthing";
import { deleteItem } from "@/utils/itemFunctions";

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.formData();

    const parsed = parseFormData(data);

    const schemaResult = productSchemaServer.safeParse(parsed);
    let backendErrors = {};
    if (!schemaResult.success) {
      schemaResult.error.issues.forEach((issue) => {
        console.log(issue);
        backendErrors = { ...backendErrors, [issue.path[0]]: issue.message };
      });
      return NextResponse.json({ errors: backendErrors });
    }

    const pictureData = parsePictureData(parsed);
    const { id, backendErrors: createErrors } = await createItemInDb(
      parsed,
      pictureData,
      backendErrors
    );
    backendErrors = { ...backendErrors, ...createErrors };

    const imagesToUpload = parsed.pictures.map((val) => val.picture);
    if (!Object.keys(backendErrors).length) {
      const result = await uploadImagesToUploadthing(imagesToUpload);
      if (result?.error && id) await deleteItem(id);
    }

    //   uploadImages(imagesToUpload);
    // saveImg(parsed);
    // }

    return NextResponse.json(
      Object.keys(backendErrors).length > 0
        ? { errors: backendErrors }
        : { id, success: true },
      Object.keys(backendErrors).length > 0 ? { status: 500 } : { status: 200 }
    );
  } catch (error: any) {
    console.error(`Problem in db creating item: ${error}`);
    return NextResponse.json({ errors: error }, { status: 500 });
  }
}
