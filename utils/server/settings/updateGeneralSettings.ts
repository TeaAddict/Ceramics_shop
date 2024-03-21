"use server";

import prisma from "@/lib/prisma";
import { GeneralSettings } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateGeneralSettings(data: GeneralSettings) {
  try {
    await prisma.generalSettings.upsert({
      create: data,
      update: data,
      where: { id: 1 },
    });
    revalidatePath("/admin");
  } catch (error: any) {
    throw new Error(`Problem updating settings: ${error}`);
  }
}
