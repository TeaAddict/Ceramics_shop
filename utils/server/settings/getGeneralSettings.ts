"use server";

import prisma from "@/lib/prisma";

export async function getGeneralSettings() {
  try {
    return await prisma.generalSettings.findFirst({ where: { id: 1 } });
  } catch (error) {
    console.log(`Problem getting general settings: ${error}`);
    throw new Error(`Problem getting general settings: ${error}`);
  }
}
