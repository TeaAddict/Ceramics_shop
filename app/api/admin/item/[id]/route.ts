import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log(data);
  const pic = data.getAll("picture0");
  console.log(pic);

  return NextResponse.json({ success: true });
}
