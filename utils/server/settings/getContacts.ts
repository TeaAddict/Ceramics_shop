"use server";

import prisma from "@/lib/prisma";

export async function getContacts() {
  try {
    return await prisma.contacts.findFirst({ where: { id: 1 } });
  } catch (error: any) {
    throw new Error(`Problem retrieving contacts: ${error.message}`);
  }
}
