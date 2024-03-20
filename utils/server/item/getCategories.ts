import prisma from "@/lib/prisma";

export async function getUniqueCategories() {
  const categories = await prisma.item.findMany({
    distinct: "category",
    select: { category: true },
  });
  const data = categories.map((el) => el.category);
  return data;
}
export async function getCategories() {
  const categories = await prisma.item.findMany({
    select: { category: true },
    where: { stock: { gt: 0 } },
  });
  return categories;
}
