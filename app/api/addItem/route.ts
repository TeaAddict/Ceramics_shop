import { TItemSchema, itemSchema } from "@/lib/types";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const body: TItemSchema = await request.json();

  const data: FormData = await request.formData();

  let parsed: { [key: string]: string | File[] } = { pictures: [] };
  Array.from(data).map((item: [string, any]) => {
    if (item[0] === "pictures") {
      parsed.pictures = parsed.pictures.concat(item[1]);
    } else {
      parsed[item[0]] = item[1];
    }
  });

  const result = itemSchema.safeParse(parsed);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ success: false });
  }

  // const newItem = await prisma.item.create({
  //   data: {
  //     title: body.title,
  //     price: body.price,
  //     stock: body.stock,
  //     category: body.category,
  //     description: body.description,
  //     // pictures: body.pictures,
  //   },
  // });

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
