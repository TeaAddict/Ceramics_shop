import { writeFile } from "fs/promises";
import path, { join } from "path";
import fs from "fs";
import { ParsedItem } from "@/lib/types";

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
  Array.from(data).map((item) => {
    const key = item[0] as keyof ParsedItem;
    const val = item[1];
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
    } else if (typeof parsed[key] === "string") {
      (parsed[key] as string) = val.toString();
    } else if (typeof parsed[key] === "number") {
      (parsed[key] as number) = Number(val);
    }
  });
  return parsed;
}

export function writeFiles(files: File[], location: string) {
  files.map(async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const projPath = process.cwd();
    const path = join(projPath, location, file.name);
    await writeFile(path, buffer);
  });
}

export function readFile(filePath: string) {
  const path = join(process.cwd(), "public", "uploads", "ceramics7.jpg");
  try {
    const fileData = fs.readFileSync(path);
    return fileData;
  } catch (error) {
    console.error(error);
  }
}

export function deleteFile(fileName: string) {
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
  }
}

export function readDir() {
  const directoryPath = path.join(process.cwd(), "public", "uploads");
  try {
    const directoryContents = fs.readdirSync(directoryPath);
    return directoryContents;
  } catch (error) {
    console.error(error);
  }
}
