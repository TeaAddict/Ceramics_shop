import { join } from "path";
import { writeFile } from "fs/promises";
import { ParsedItem } from "@/lib/types";

export function saveImg(parsed: ParsedItem) {
  try {
    // Saves images in servers local storage hopefully lol
    parsed.pictures.map(async (element) => {
      const bytes = await element.picture.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const projPath = process.cwd();
      const path = join(projPath, "/public/uploads", element.picture.name);
      await writeFile(path, buffer);
    });
  } catch (error: any) {
    console.error(`Problem saving images: ${error}`);
    throw new Error(`Problem saving images: ${error}`);
  }
}
