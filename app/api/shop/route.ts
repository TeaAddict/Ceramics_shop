import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: { pictures: true, thumbnail: true },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error(`Problem getting items: ${error}`);
  }
}
