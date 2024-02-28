"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export async function isFavourited(itemId: string) {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    const res = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      include: { favouriteItems: { where: { itemId: itemId } } },
    });
    return res?.favouriteItems.find((el) => el.itemId === itemId);
  }
}

export async function addFavourite(itemId: string) {
  const session = await getServerSession(authOptions);
  const favExists = await isFavourited(itemId);

  if (session?.user?.email) {
    if (!favExists)
      await prisma.favourites.create({
        data: {
          item: { connect: { id: itemId } },
          user: { connect: { email: session.user.email } },
        },
      });
  }
}

export async function removeFavourite(itemId: string) {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
    if (user) {
      const favourite = await prisma.favourites.findFirst({
        where: { itemId: { equals: itemId }, userId: { equals: user.id } },
      });
      if (favourite)
        await prisma.favourites.delete({ where: { id: favourite.id } });
    }
  }
}
