import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: { pictures: true, thumbnail: true },
    });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error(`Problem getting items: ${error}`);
    return NextResponse.json(
      { error: `Problem getting items: ${error.message}` },
      { status: 500 }
    );
  }
}
