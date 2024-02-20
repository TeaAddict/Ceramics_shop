import prisma from "@/lib/prisma";
import { User } from "next-auth";

export async function addUserToDb(userData: User) {
  if (userData.name && userData.email) {
    const user = await prisma.user.findFirst({
      where: { name: userData.name },
    });

    if (user) return;

    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        image: userData.image,
      },
    });
  } else {
    return;
  }
}
