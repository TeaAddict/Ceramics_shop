import { TItemSchema, itemSchema } from "@/lib/types";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ValueOf } from "next/dist/shared/lib/constants";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const data: FormData = await request.formData();

  let parsed: TItemSchema = {
    title: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    thumbnailPicture: "",
    pictures: undefined,
  };

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
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      console.log(issue);
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ success: false });
  }

  // const newItem = prisma.item.create({
  //   data: {
  //     title: parsed.title,
  //     price: parsed.price,
  //     stock: parsed.stock,
  //     category: parsed.category,
  //     description: parsed.description,
  //     thumbnailPicture: parsed.thumbnailPicture,
  //     pictures: parsed.pictures,
  //   },
  // });

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
