"use server";

import prisma from "@/lib/prisma";

export async function getGeneralSettings() {
  return await prisma.generalSettings.findFirst({ where: { id: 1 } });
}
