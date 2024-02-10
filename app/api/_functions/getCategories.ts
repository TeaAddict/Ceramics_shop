import prisma from "@/lib/prisma";

export async function getCategories() {
  const categories = await prisma.item.findMany({
    distinct: "category",
    select: { category: true },
  });
  const data = categories.map((el) => el.category);
  return data;
}
