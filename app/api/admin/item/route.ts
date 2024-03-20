import { productSchemaServer } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { parsePictureData } from "@/utils/myFunctions";
import { parseFormData } from "./myFunctions";
import { createItemInDb } from "@/utils/server/item/createItemInDb";
import { saveImg } from "@/utils/server/item/saveImg";

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

    createItemInDb(parsed, pictureData, backendErrors);

    saveImg(parsed);

    return NextResponse.json(
      Object.keys(backendErrors).length > 0
        ? { errors: backendErrors }
        : { success: true }
    );
  } catch (error: any) {
    console.error(`Problem in db creating item: ${error.message}`);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
