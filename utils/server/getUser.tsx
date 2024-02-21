import prisma from "@/lib/prisma";

export async function getUser(name: string) {
  const user = await prisma.user.findFirst({ where: { name: name } });
  return user;
}
