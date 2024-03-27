import { utapi } from "@/utils/uploadthing";

export async function deleteFromUT(nameList: string[]) {
  try {
    utapi.deleteFiles(nameList);
  } catch (error: any) {
    console.log(`Problem deleting files: ${error.message}`);
  }
}
