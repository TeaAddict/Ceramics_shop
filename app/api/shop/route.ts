import { ParsedItem, productSchemaServer } from "@/lib/types";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { join } from "path";
import { writeFile } from "fs/promises";
import { parsePictureData } from "./myFunctions";

export async function POST(request: NextRequest) {
  const data: FormData = await request.formData();

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

  // Check if server got correct data type else return errors
  const schemaResult = productSchemaServer.safeParse(parsed);

  let backendErrors = {};
  if (!schemaResult.success) {
    schemaResult.error.issues.forEach((issue) => {
      console.log(issue);
      backendErrors = { ...backendErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ success: false });
  }

  // parse picture data for DB
  const pictureData = parsePictureData(parsed);
  // ADD item/pictures to database
  try {
    const item = await prisma.item.create({
      data: {
        title: parsed.title,
        price: parsed.price,
        stock: parsed.stock,
        category: parsed.category,
        description: parsed.description,
        pictures: {
          createMany: {
            data: pictureData,
          },
        },
      },
    });
    const thumbnailInDb = await prisma.picture.findFirst({
      where: { name: parsed.thumbnailPicture },
    });
    await prisma.item.update({
      where: { id: item.id },
      data: { thumbnailId: thumbnailInDb!.id },
    });
  } catch (e) {
    let customError: { customError: string } = { customError: "" };
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        customError = {
          customError:
            "Picture name is already in use, rename or change picture",
        };
      }
      return NextResponse.json({ errors: customError });
    }
  }

  // Saves images in servers local storage hopefully lol
  parsed.pictures.map(async (element) => {
    const bytes = await element.picture.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const projPath = process.cwd();
    const path = join(projPath, "/public/uploads", element.picture.name);
    await writeFile(path, buffer);
  });
  return NextResponse.json(
    Object.keys(backendErrors).length > 0
      ? { errors: backendErrors }
      : { success: true }
  );
}

export async function GET() {
  const items = await prisma.item.findMany({
    include: { pictures: true, thumbnail: true },
  });
  return NextResponse.json(items);
}
