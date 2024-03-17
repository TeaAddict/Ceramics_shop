"use server";

import prisma from "@/lib/prisma";
import { Contacts } from "@prisma/client";

export async function updateContactSettings(data: Contacts) {
  try {
    await prisma.contacts.upsert({
      create: { ...data, id: 1 },
      update: data,
      where: { id: 1 },
    });
  } catch (error: any) {
    throw new Error(`Problem updating settings: ${error}`);
  }
}
