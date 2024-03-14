"use server";

import prisma from "@/lib/prisma";

export async function getContacts() {
  try {
    return await prisma.contacts.findFirst({ where: { id: 1 } });
  } catch (error: any) {
    console.error(
      `Problem retrieving contacts from database: ${error.message}`
    );
    return null;
  }
}
