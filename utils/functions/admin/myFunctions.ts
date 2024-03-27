import { writeFile } from "fs/promises";
import path, { join } from "path";
import fs from "fs";
import { ParsedItem, PictureData } from "@/lib/types";
import prisma from "@/lib/prisma";

export function parseFormData(data: FormData) {
  // Parse formData to usable data
  let parsed: ParsedItem = {
    title: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    thumbnailPicture: "",
    //@ts-ignore
    pictures: [],
  };
  let addedList: string[] = [];
  data.forEach((val, key) => {
    if (key.startsWith("picture") && !addedList.includes(key)) {
      addedList.push(key);
      const res = data.getAll(key);
      const picObj: {
        dimensions: { width: number; height: number };
        picture: File;
      } = {
        dimensions: JSON.parse(res[0] as string),
        picture: res[1] as File,
      };
      parsed.pictures.push(picObj);
    } else if (typeof parsed[key as keyof ParsedItem] === "string") {
      (parsed[key as keyof ParsedItem] as string) = val.toString();
    } else if (typeof parsed[key as keyof ParsedItem] === "number") {
      (parsed[key as keyof ParsedItem] as number) = Number(val);
    }
  });
  return parsed;
}

export function writeFiles(files: File[], location: string) {
  try {
    files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const projPath = process.cwd();
      const path = join(projPath, location, file.name);
      await writeFile(path, buffer);
    });
  } catch (error) {
    console.error(`Problem writing files: ${error}`);
    throw new Error(`Problem writing files: ${error}`);
  }
}

export function readFile(filePath: string) {
  try {
    const path = join(process.cwd(), "public", "uploads", "ceramics7.jpg");
    const fileData = fs.readFileSync(path);
    return fileData;
  } catch (error) {
    console.error(`Problem reading file: ${error}`);
    throw new Error(`Problem reading file: ${error}`);
  }
}

export function deleteFile(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(`Problem deleting file: ${error}`);
    throw new Error(`Problem deleting file: ${error}`);
  }
}

export function readDir() {
  try {
    const directoryPath = path.join(process.cwd(), "public", "uploads");
    const directoryContents = fs.readdirSync(directoryPath);
    return directoryContents;
  } catch (error) {
    console.error(`Problem reading dir: ${error}`);
    throw new Error(`Problem reading dir: ${error}`);
  }
}

export async function whatToSaveDelete(
  id: string,
  pictureData: PictureData,
  item: ParsedItem
) {
  try {
    // check which images need uploading which deleting
    const oldPictures = await prisma.picture.findMany({
      where: { itemId: id },
    });
    const oldPictureNames = oldPictures.map((pic) => pic.name);
    const newPictureNames = pictureData.map((pic) => pic.name);
    const deletePicNames = oldPictureNames.filter(
      (str) => !newPictureNames.includes(str)
    );
    const picturesNeedUploading = newPictureNames.filter(
      (str) => !oldPictureNames.includes(str)
    );

    const picturesToSave = item.pictures
      .filter((picture) => {
        if (picturesNeedUploading.includes(picture.picture.name))
          return picture;
      })
      .map((el) => el.picture);

    const deleteListWithNull = await Promise.all(
      deletePicNames.map(async (name) => {
        const key = await prisma.picture.findFirst({
          where: { name: name },
          select: { key: true },
        });
        return key?.key;
      })
    );
    const picturesToDelete: string[] = deleteListWithNull.filter(
      (value): value is string => value !== null && value !== undefined
    );

    return { picturesToSave, picturesToDelete };
  } catch (error) {
    console.log(`Problem updating pictures: ${error}`);
    throw new Error(`Problem updating pictures: ${error}`);
  }
}
