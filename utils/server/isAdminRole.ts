import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function isAdminRole(name?: string) {
  try {
    let userName: string | null | undefined = null;
    if (name) {
      userName = name;
    } else {
      const session = await getServerSession(authOptions);
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
  } catch (error) {
    console.log(`Problem checking isAdmin: ${error}`);
    throw new Error(`Problem checking isAdmin: ${error}`);
  }
}
