import prisma from "@/lib/prisma";

export async function adminCheck(name: string) {
  const user = await prisma.user.findFirst({ where: { name: name } });
  if (user && user.role === "ADMIN") {
    return true;
  } else {
    return false;
  }
}
