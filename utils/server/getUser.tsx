import prisma from "@/lib/prisma";

export async function getUser(name: string) {
  try {
    const user = await prisma.user.findFirst({ where: { name: name } });
    return user;
  } catch (error) {
    console.log(`Problem getting user: ${error}`);
    throw new Error(`Problem getting user: ${error}`);
  }
}
