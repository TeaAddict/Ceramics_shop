import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const res = await prisma.item.findFirst({
    where: { id: context.params.id },
    include: { pictures: true, thumbnail: true },
  });
  return NextResponse.json(res);
}
