import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function isAdminRole(name?: string) {
  let userName: string | null | undefined = null;
  if (name) {
    userName = name;
  } else {
    const session = await getServerSession();
    userName = session?.user?.name;
  }

  if (userName) {
    const user = await prisma.user.findFirst({ where: { name: userName } });
    if (user && user.role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
