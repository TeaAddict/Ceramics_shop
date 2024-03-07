"use server";

import prisma from "@/lib/prisma";
import { Contacts } from "@prisma/client";

export async function updateSettings(data: Contacts) {
  const res = await prisma.contacts.upsert({
    create: { ...data, id: 1 },
    update: data,
    where: { id: 1 },
  });
  return res;
}
