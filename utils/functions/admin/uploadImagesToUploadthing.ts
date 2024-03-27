"use server";
import { utapi } from "@/utils/uploadthing";
import { updatePicUrl } from "./updatePicUrl";

export async function uploadImagesToUploadthing(imageList: File[]) {
  try {
    const response = await utapi.uploadFiles(imageList);
    const urlPicListToUpdate = response.map((val) => {
      return {
        name: val.data?.name ?? "",
        key: val.data?.key ?? "",
        url: val.data?.url ?? "",
      };
    });
    await updatePicUrl(urlPicListToUpdate);
  } catch (error: any) {
    console.log(`Problem uploading images: ${error.message}`);
    return { error };
  }
}
