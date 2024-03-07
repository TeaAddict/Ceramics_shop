"use server";

import prisma from "@/lib/prisma";
import { GeneralSettings } from "@prisma/client";

export async function updateGeneralSettings(data: GeneralSettings) {
  await prisma.generalSettings.upsert({
    create: data,
    update: data,
    where: { id: 1 },
  });
}
