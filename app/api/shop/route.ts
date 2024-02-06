import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.item.findMany({
    include: { pictures: true, thumbnail: true },
  });
  return NextResponse.json(items);
}
