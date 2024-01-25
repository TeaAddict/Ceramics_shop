import { TItemSchema, itemSchema } from "@/lib/types";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ValueOf } from "next/dist/shared/lib/constants";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const data: FormData = await request.formData();

  let parsed: TItemSchema = {
    title: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    thumbnailPicture: "",
    pictures: new FileList(),
  };
  // let parsed: TItemSchema = {
  //   title: "",
  //   price: 0,
  //   stock: 0,
  //   category: "",
  //   description: "",
  //   thumbnailPicture: "",
  //   pictures: undefined,
  // };

  // Parsing BACK from formData to object similar to before hook form submit data(TItemSchema)
  Array.from(data).map((item) => {
    const key = item[0] as keyof TItemSchema;
    const value = item[1];
    if (key === "pictures") {
      parsed.pictures = (parsed.pictures || []).concat(item[1]);
    } else if (typeof parsed[key] === "string") {
      (parsed[key] as string) = value.toString();
    } else if (typeof parsed[key] === "number") {
      (parsed[key] as number) = Number(value);
    }
  });

  // Check if server got correct data type else return errors
  const result = itemSchema.safeParse(parsed);
  let backendErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      console.log(issue);
      backendErrors = { ...backendErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ success: false });
  }

  console.log(
    "================================================================================================="
  );
  console.log(
    "================================================================================================="
  );
  console.log(
    "================================================================================================="
  );
  console.log(parsed);

  const pictures = parsed.pictures.reduce(
    (acc: { name: string }[], picture: File) => {
      acc.push({
        name: picture.name,
      });
    },
    []
  );
  console.log(pictures, "PICTURES");

  // const item = await prisma.item.create({
  //   data: {
  //     title: parsed.title,
  //     price: parsed.price,
  //     stock: parsed.stock,
  //     category: parsed.category,
  //     description: parsed.description,
  //     thumbnailPicture: parsed.thumbnailPicture,
  //     pictures: {
  //       createMany: {
  //         data: {
  //           name: parsed.pictures[0],
  //         },
  //       },
  //     },
  //   },
  // });

  // let item: {
  //   id: number;
  //   title: string;
  //   price: number;
  //   stock: number;
  //   category: string;
  //   description: string | null;
  //   thumbnailPicture: string;
  // } = {
  //   id: 0,
  //   title: "",
  //   price: 0,
  //   stock: 0,
  //   category: "",
  //   description: null,
  //   thumbnailPicture: "",
  // };
  // try {
  //   item = await prisma.item.create({
  //     data: {
  //       title: parsed.title,
  //       price: parsed.price,
  //       stock: parsed.stock,
  //       category: parsed.category,
  //       description: parsed.description,
  //       thumbnailPicture: parsed.thumbnailPicture,
  //     },
  //   });
  //   console.log(item, "NEW ITEM");
  // } catch (error) {
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     // The .code property can be accessed in a type-safe manner
  //     if (error.code === "P2002") {
  //       console.log("Title already exists");
  //     }
  //     return NextResponse.json({ success: false });
  //   }
  // }

  // try {
  //   parsed.pictures.map(async (picture: File) => {
  //     const newPicture = await prisma.picture.create({
  //       data: {
  //         name: picture.name,

  //         item: {
  //           connect: {
  //             id: item.id,
  //           },
  //         },
  //       },
  //     });
  //     console.log(newPicture, "NEW PICTURE");
  //   });
  // } catch (error) {
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     // The .code property can be accessed in a type-safe manner
  //     if (error.code === "P2002") {
  //       console.log("One of picture names already exists");
  //     }
  //     return NextResponse.json({ success: false });
  //   }
  // }

  return NextResponse.json(
    Object.keys(backendErrors).length > 0
      ? { errors: backendErrors }
      : { success: true }
  );
}
